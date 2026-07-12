const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// In-memory store for rate limiting (Spam Protection)
const ipSubmissionLimits = new Map();
const SUBMISSION_LIMIT_MS = 60000; // 1 minute limit

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // ── 1. Spam Protection (Rate Limiting) ───────────────────────
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const nowTime = Date.now();
    const lastSubmission = ipSubmissionLimits.get(ip);
    if (lastSubmission && (nowTime - lastSubmission < SUBMISSION_LIMIT_MS)) {
      const waitTimeSec = Math.ceil((SUBMISSION_LIMIT_MS - (nowTime - lastSubmission)) / 1000);
      return res.status(429).json({ 
        success: false, 
        error: `Too many submissions. Please wait ${waitTimeSec} seconds before sending another message.` 
      });
    }

    // ── 2. Validation ───────────────────────────────────────────
    if (!name || !name.trim())       return res.status(400).json({ success: false, error: 'Name is required.' });
    if (!email || !email.trim())     return res.status(400).json({ success: false, error: 'Email is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                     return res.status(400).json({ success: false, error: 'Invalid email address.' });
    if (!message || !message.trim()) return res.status(400).json({ success: false, error: 'Message cannot be empty.' });

    // Update the IP submission timestamp
    ipSubmissionLimits.set(ip, nowTime);

    // ── 3. Sanitation ───────────────────────────────────────────
    const cleanName = sanitizeInput(name);
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = sanitizeInput(message);

    // ── 4. Persist to Database ──────────────────────────────────
    let newContact;
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      newContact = await Contact.create({ 
        name: cleanName, 
        email: cleanEmail, 
        message: cleanMessage 
      });
    } else {
      newContact = {
        _id: 'mem_' + Date.now(),
        name: cleanName, 
        email: cleanEmail, 
        message: cleanMessage,
        createdAt: new Date(), 
        isInMemoryStore: true
      };
      console.log('MongoDB not connected. Contact saved in-memory (fallback):', newContact._id);
    }

    // ── 5. Email Sending via Nodemailer ────────────────────────
    let emailSent = false;
    let emailError = null;

    try {
      const canSend = (
        process.env.EMAIL_USER &&
        process.env.EMAIL_PASS &&
        !process.env.EMAIL_PASS.includes('your_gmail_app_password')
      );

      if (canSend) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

        // Notification Email (Sent to Kayas)
        const notificationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0f1124;border-radius:16px;overflow:hidden;border:1px solid rgba(192,132,252,0.25);box-shadow:0 0 60px rgba(192,132,252,0.15);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a0a2e 0%,#0f1830 100%);padding:36px 40px 28px;border-bottom:1px solid rgba(192,132,252,0.15);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C084FC;">
                      ✦ PORTFOLIO NOTIFICATION ✦
                    </p>
                    <h1 style="margin:0;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                      New Message Received
                    </h1>
                    <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">${now}</p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#C084FC,#F5A623);display:flex;align-items:center;justify-content:center;font-size:22px;line-height:52px;text-align:center;">
                      ✉️
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Sender details -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <p style="margin:0 0 20px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
                Sender Details
              </p>
              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(192,132,252,0.06);border:1px solid rgba(192,132,252,0.2);border-radius:10px;margin-bottom:12px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#C084FC;">Name</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${cleanName}</p>
                  </td>
                </tr>
              </table>
              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(245,166,35,0.06);border:1px solid rgba(245,166,35,0.2);border-radius:10px;margin-bottom:12px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#F5A623;">Email</p>
                    <a href="mailto:${cleanEmail}" style="margin:0;font-size:16px;font-weight:700;color:#F5A623;text-decoration:none;">${cleanEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:8px 40px 32px;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
                Message
              </p>
              <div style="background:rgba(34,211,238,0.05);border:1px solid rgba(34,211,238,0.2);border-radius:10px;padding:20px 18px;">
                <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.85);line-height:1.75;white-space:pre-wrap;">${cleanMessage}</p>
              </div>
            </td>
          </tr>
          <!-- Reply button -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${cleanEmail}?subject=Re: Your message on Kayas's Portfolio"
                 style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#C084FC,#F5A623);color:#000;font-weight:800;font-size:13px;letter-spacing:0.05em;border-radius:8px;text-decoration:none;">
                ↩ Reply to ${cleanName}
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:rgba(0,0,0,0.3);padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
                This notification was automatically sent from your portfolio website at <strong style="color:rgba(255,255,255,0.4);">kayasmishra.dev</strong>.<br/>
                Do not reply to this email directly — use the reply button above to respond to the sender.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        // Visitor Thank-You Email (Auto-Reply)
        const autoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You for Reaching Out</title>
</head>
<body style="margin:0;padding:0;background:#020205;font-family:'Segoe UI',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020205;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#080a1c;border-radius:16px;overflow:hidden;border:1px solid rgba(192,132,252,0.25);box-shadow:0 0 60px rgba(192,132,252,0.15);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#12042b 0%,#080a1c 100%);padding:36px 40px;border-bottom:1px solid rgba(192,132,252,0.15);text-align:center;">
              <div style="font-size:40px;margin-bottom:15px;">✨</div>
              <h1 style="margin:0;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Message Received!</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#C084FC;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">✦ Thank You ✦</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding:40px;line-height:1.8;font-size:15px;color:rgba(255,255,255,0.85);">
              <p style="margin-top:0;font-size:16px;">Hi <strong>${cleanName}</strong>,</p>
              <p>Thank you for reaching out and connecting with me through my portfolio website!</p>
              <p>This email confirms that I have successfully received your message. I am excited to read it and will get back to you within <strong>24 hours</strong>.</p>
              <p>In the meantime, feel free to explore my source code on GitHub or view my professional timeline on LinkedIn.</p>
              
              <div style="margin:30px 0 20px;text-align:center;">
                <a href="https://www.linkedin.com/in/kayas-mishra" style="display:inline-block;padding:10px 20px;background:rgba(52,211,153,0.1);border:1px solid #34D399;color:#34D399;text-decoration:none;border-radius:6px;font-weight:700;margin:0 8px;font-size:13px;transition: background 0.2s;">LinkedIn</a>
                <a href="https://github.com/KayasSecret" style="display:inline-block;padding:10px 20px;background:rgba(192,132,252,0.1);border:1px solid #C084FC;color:#C084FC;text-decoration:none;border-radius:6px;font-weight:700;margin:0 8px;font-size:13px;transition: background 0.2s;">GitHub</a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:rgba(0,0,0,0.3);padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);line-height:1.6;">
                This is an automated response. Please do not reply directly to this email.<br/>
                © ${new Date().getFullYear()} Kayas Mishra. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        // Send notification to owner and auto-reply to visitor concurrently
        await Promise.all([
          transporter.sendMail({
            from: `"Kayas Portfolio" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL || 'kayasmishra29s@gmail.com',
            replyTo: cleanEmail,
            subject: `📬 New message from ${cleanName} — Portfolio`,
            html: notificationHtml,
          }),
          transporter.sendMail({
            from: `"Kayas Mishra" <${process.env.EMAIL_USER}>`,
            to: cleanEmail,
            subject: `✨ Thank you for reaching out! — Kayas Mishra`,
            html: autoReplyHtml,
          })
        ]);

        emailSent = true;
      } else {
        emailError = 'Email credentials not configured or placeholder detected in .env.';
        console.warn('[Contact] Email skipped:', emailError);
      }
    } catch (err) {
      emailError = err.message;
      console.error('[Contact] Nodemailer error:', err.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Message received! Check your inbox for confirmation.',
      data: newContact,
      emailSent,
      emailError,
    });

  } catch (error) {
    next(error);
  }
};

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Path to the purchased Dronznido book PDF
const PDF_PATH = path.join(__dirname, '../../client/src/assets/storypdf/Dronznido.pdf');

/**
 * Sends a beautiful HTML thank-you email to the customer with the Dronznido PDF attached.
 * 
 * @param {string} customerName - The customer's full name.
 * @param {string} recipientEmail - The customer's email address.
 * @param {string} orderId - The verified Razorpay order ID.
 */
exports.sendBookDeliveryEmail = async (customerName, recipientEmail, orderId) => {
  try {
    // 1. Verify that the book PDF exists before attempting to attach it
    if (!fs.existsSync(PDF_PATH)) {
      console.error(`E-Book PDF not found at path: ${PDF_PATH}. Email will be sent without attachment.`);
    }

    // 2. Configure Nodemailer Transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Compose premium dark fantasy themed HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Dronznido</title>
        <style>
          body {
            background-color: #0b061a;
            color: #e2e8f0;
            font-family: 'Georgia', 'Times New Roman', serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0d0722;
            border: 1px solid rgba(139, 92, 246, 0.25);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          }
          .header {
            background: linear-gradient(145deg, #160a35, #080314);
            padding: 2.5rem 2rem;
            text-align: center;
            border-bottom: 1px solid rgba(245, 158, 11, 0.2);
          }
          .header h1 {
            color: #f59e0b;
            font-size: 2.2rem;
            margin: 0;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-shadow: 0 0 15px rgba(245, 158, 11, 0.45);
          }
          .header-subtitle {
            color: #c4b5fd;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            margin-top: 0.5rem;
          }
          .content {
            padding: 2.5rem 2rem;
            line-height: 1.8;
            font-size: 1rem;
            color: #d1d5db;
          }
          .greeting {
            font-size: 1.15rem;
            color: #ffffff;
            margin-bottom: 1.5rem;
          }
          .highlight {
            color: #c4b5fd;
            font-weight: 700;
          }
          .quote-box {
            background: rgba(139, 92, 246, 0.08);
            border-left: 3px solid #f59e0b;
            padding: 1rem 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: #e2e8f0;
          }
          .book-details {
            border: 1px dashed rgba(245, 158, 11, 0.3);
            border-radius: 12px;
            background: rgba(245, 158, 11, 0.04);
            padding: 1.25rem;
            margin: 2rem 0;
          }
          .book-title {
            color: #f59e0b;
            font-weight: 800;
            font-size: 1.05rem;
            margin-bottom: 0.25rem;
          }
          .order-id {
            font-size: 0.78rem;
            color: rgba(255, 255, 255, 0.4);
            font-family: monospace;
          }
          .footer {
            background-color: #070312;
            padding: 1.5rem;
            text-align: center;
            font-size: 0.78rem;
            color: rgba(255, 255, 255, 0.35);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }
          .footer a {
            color: #8b5cf6;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>DRONZNIDO</h1>
            <div class="header-subtitle">The Hidden Kingdom of Wonders</div>
          </div>
          <div class="content">
            <div class="greeting">Hello ${customerName},</div>
            <p>🎉 Congratulations on becoming one of the first explorers of the magical world of <span class="highlight">DRONZNIDO</span>!</p>
            <p>Thank you for purchasing <strong>DRONZNIDO: The Hidden Kingdom of Wonders</strong>. Your adventure officially begins today.</p>
            
            <p>The attached PDF contains your personal copy of the book. We truly hope you enjoy every page of this magical journey.</p>
            
            <div class="quote-box">
              "Some kingdoms are found... Some are hidden... Legends never die."
            </div>
            
            <div class="book-details">
              <div class="book-title">📖 Your E-Book:</div>
              <div>DRONZNIDO: The Hidden Kingdom of Wonders (PDF Format)</div>
              <div class="order-id">Verified Order ID: ${orderId}</div>
            </div>

            <p>✨ Thank you for supporting an independent author. Every purchase helps this universe grow.</p>
            <p>💜 We sincerely appreciate your support. If you enjoy the story, please consider sharing your thoughts with your friends. Your feedback means the world to us.</p>
            
            <p>🚀 More adventures, sequels, and magical stories are coming soon. Stay connected...</p>
            
            <p style="margin-top: 2.5rem; line-height: 1.5;">
              Best Wishes,<br>
              <strong>Kayas Mishra</strong><br>
              <span style="font-size: 0.85rem; color: rgba(255,255,255,0.45);">Author of DRONZNIDO</span>
            </p>
          </div>
          <div class="footer">
            <p>Made with ❤️ for fantasy lovers.</p>
            <p>© DRONZNIDO Universe · All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Set mail options
    const mailOptions = {
      from: `"DRONZNIDO Store" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: '✨ Welcome to the World of DRONZNIDO — Your Adventure Begins!',
      html: htmlContent,
      attachments: fs.existsSync(PDF_PATH) ? [
        {
          filename: 'DRONZNIDO_The_Hidden_Kingdom_of_Wonders.pdf',
          path: PDF_PATH,
        }
      ] : []
    };

    // 5. Send the mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-Book delivered successfully to ${recipientEmail}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    // Graceful error handling: log the error, do not throw it, so payment remains successful
    console.error(`Failed to send e-book delivery email to ${recipientEmail}:`, error);
    return { success: false, error: error.message };
  }
};

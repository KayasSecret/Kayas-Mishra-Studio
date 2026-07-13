import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft, FaBookOpen, FaStar, FaHeart, FaShare, FaShoppingCart,
  FaUsers, FaTimes, FaCreditCard, FaMobile, FaUniversity,
  FaCheckCircle, FaDownload, FaRegBookmark, FaBookmark, FaImages, FaPlay,
} from 'react-icons/fa';
import {
  GiMagicGate, GiOpenBook, GiSpellBook, GiCrystalBall,
} from 'react-icons/gi';
import ReviewList from '../components/reviews/ReviewList';
import CharacterGallery from '../components/characters/CharacterGallery';
import SceneGallery from '../components/characters/SceneGallery';
import VideoGallery from '../components/characters/VideoGallery';
import { createOrder, verifyPayment } from '../services/paymentService';
import dronznidoBook from '../assets/storypdf/Dronznido.pdf';

/* ─────────────────────────────────────────
   SCROLL TO TOP ON MOUNT
───────────────────────────────────────── */
function useScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const bookData = {
  title: 'DRONZNIDO: The Hidden Kingdom of Wonders',
  subtitle: '(Part 1)',
  genre: 'Epic Fantasy · Magic · Adventure · Another World',
  price: 5,
  rating: 4.9,
  reviewCount: 12,
  pages: 102,
  language: 'Hindi',
  description: `Some worlds are hidden for a reason… and some secrets were never meant to be discovered. DRONZNIDO: The Hidden Kingdom of Wonders invites you into an extraordinary realm where every step uncovers a new mystery and every answer raises even bigger questions. As ancient forces begin to awaken, an unforgettable journey unfolds—one that will challenge everything you believe about destiny, courage, and the impossible. Nothing is as it seems, and the greatest truth is still waiting to be revealed. Open the first page… and you'll never stop wondering what comes next.`,
  author: 'Kayas Mishra',
};



/* ─────────────────────────────────────────
   PARTICLES BACKGROUND
───────────────────────────────────────── */
function MagicalBackground() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 8,
    color: i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#F59E0B' : '#22D3EE',
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Deep space base */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, #0a0415 0%, #020108 50%, #000305 100%)' }} />

      {/* Aurora 1 — purple */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], opacity: [0.15, 0.35, 0.2, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '70vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Aurora 2 — gold */}
      <motion.div
        animate={{ x: [0, -100, 60, 0], y: [0, 80, -30, 0], opacity: [0.1, 0.28, 0.12, 0.1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute', top: '20%', right: '-10%',
          width: '60vw', height: '50vh',
          background: 'radial-gradient(ellipse, rgba(245,166,35,0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Aurora 3 — teal */}
      <motion.div
        animate={{ x: [0, 60, -80, 0], y: [0, -40, 70, 0], opacity: [0.08, 0.2, 0.1, 0.08] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        style={{
          position: 'absolute', bottom: '0%', left: '30%',
          width: '55vw', height: '45vh',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Fog overlay */}
      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35vh',
          background: 'linear-gradient(to top, rgba(139,92,246,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Star field */}
      {Array.from({ length: 120 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{ opacity: [0.2, Math.random() * 0.8 + 0.2, 0.2] }}
          transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 5 }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            borderRadius: '50%',
            backgroundColor: '#fff',
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -120, 0], x: [0, Math.sin(p.id) * 30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   3D BOOK COVER
───────────────────────────────────────── */
function Book3D({ onBuyClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ perspective: '1000px', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          rotateY: hovered ? -25 : -10,
          rotateX: hovered ? 5 : 0,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '240px', height: '340px' }}
      >
        {/* Book Front Face */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 30%, #0f1f4a 60%, #1a0533 100%)',
          borderRadius: '4px 12px 12px 4px',
          border: '1px solid rgba(139,92,246,0.5)',
          boxShadow: hovered
            ? '0 30px 80px rgba(139,92,246,0.5), 0 0 40px rgba(245,166,35,0.3), inset 0 0 30px rgba(139,92,246,0.1)'
            : '0 20px 50px rgba(0,0,0,0.7), 0 0 20px rgba(139,92,246,0.2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px 20px', overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
        }}>
          {/* Cover decorative lines */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px', border: '1px solid rgba(245,166,35,0.25)', borderRadius: '8px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '18px', left: '18px', right: '18px', bottom: '18px', border: '1px solid rgba(245,166,35,0.1)', borderRadius: '6px', pointerEvents: 'none' }} />

          {/* Corner ornaments */}
          {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos) => (
            <div key={pos} style={{
              position: 'absolute',
              top: pos.includes('top') ? '14px' : 'auto',
              bottom: pos.includes('bottom') ? '14px' : 'auto',
              left: pos.includes('Left') ? '14px' : 'auto',
              right: pos.includes('Right') ? '14px' : 'auto',
              width: '16px', height: '16px',
              borderTop: pos.includes('top') ? '2px solid #F59E0B' : 'none',
              borderBottom: pos.includes('bottom') ? '2px solid #F59E0B' : 'none',
              borderLeft: pos.includes('Left') ? '2px solid #F59E0B' : 'none',
              borderRight: pos.includes('Right') ? '2px solid #F59E0B' : 'none',
            }} />
          ))}

          {/* Animated glow orb */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '90px', height: '90px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(245,166,35,0.3) 50%, transparent 70%)',
              filter: 'blur(8px)',
              marginBottom: '12px',
            }}
          />

          {/* Book icon */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '52px', color: '#F59E0B', marginTop: '-70px', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 12px rgba(245,166,35,0.8))' }}
          >
            <GiSpellBook />
          </motion.div>

          <div style={{ color: '#F59E0B', fontSize: '1.20rem', fontWeight: '800', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '10px', opacity: 0.9 }}>
            Dronznido
          </div>

          <div style={{ width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)', margin: '10px 0', opacity: 0.6 }} />

          <div style={{ color: '#E2E8F0', fontSize: '0.8rem', fontWeight: '900', textAlign: 'center', fontFamily: 'Georgia, serif', lineHeight: 1.6, textShadow: '0 0 10px rgba(139,92,246,0.5)' }}>
            The Hidden Kingdom<br />Of Wonders
          </div>

          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', marginTop: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
           Writer - Kayas Mishra
          </div>

          {/* Bottom genre tag */}
          <div style={{
            marginTop: '12px', padding: '3px 10px',
            background: 'rgba(139,92,246,0.3)', borderRadius: '99px',
            border: '1px solid rgba(139,92,246,0.4)',
            color: '#C4B5FD', fontSize: '0.58rem', fontWeight: '700', letterSpacing: '0.1em',
          }}>
            PART I
          </div>
        </div>

        {/* Book Spine */}
        <div style={{
          position: 'absolute', top: 0, left: '-22px', bottom: 0, width: '22px',
          background: 'linear-gradient(to right, #0d0220, #1a0533)',
          borderRadius: '4px 0 0 4px',
          transform: 'rotateY(90deg)',
          transformOrigin: 'right center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.5)',
        }}>
          <span style={{ writingMode: 'vertical-rl', color: '#F59E0B', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', opacity: 0.8 }}>
            DRONZNIDO: The Hidden Kingdom of Wonders
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAYMENT MODAL
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   PAYMENT MODAL
───────────────────────────────────────── */
function PaymentModal({ onClose }) {
  const [step, setStep] = useState('method'); // 'method' | 'processing' | 'success' | 'error'
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedOrderId, setVerifiedOrderId] = useState('');

  const inputStyle = (hasErr) => ({
    width: '100%', padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasErr ? '#EF4444' : 'rgba(139,92,246,0.3)'}`,
    borderRadius: '10px', color: '#E2E8F0', fontSize: '0.9rem',
    outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box',
    marginBottom: '0.75rem',
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a 10-digit phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async () => {
    if (!validate()) return;
    setStep('processing');
    setErrorMessage('');

    try {
      // 1. Load Razorpay script dynamically
      const scriptLoaded = await new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.');
      }

      // 2. Call backend to create Razorpay Order
      const orderData = await createOrder({
        amount: 29,
        bookName: "Dronznido: The Hidden Kingdom of Wonders",
        customerName: form.name,
        email: form.email,
        phone: form.phone
      });

      // 3. Configure Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DRONZNIDO Store",
        description: "Dronznido: The Hidden Kingdom of Wonders E-Book",
        order_id: orderData.order_id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: "#8B5CF6"
        },
        handler: async function (response) {
          try {
            setStep('processing');
            // 4. Verify payment on backend
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verification.success) {
              setVerifiedOrderId(response.razorpay_order_id);
              setStep('success');
            } else {
              throw new Error('Signature verification failed.');
            }
          } catch (err) {
            setErrorMessage(err.message || 'Payment verification failed.');
            setStep('error');
          }
        },
        modal: {
          ondismiss: function () {
            setStep('method'); // Reset to form if closed
          }
        }
      };

      // 4. Open checkout
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setErrorMessage(response.error.description || 'Payment transaction failed.');
        setStep('error');
      });
      
      rzp.open();

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during payment setup.');
      setStep('error');
    }
  };

  const glass = {
    background: 'rgba(15, 10, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: '20px',
    padding: '2rem',
    position: 'relative',
    maxWidth: '460px',
    width: '90vw',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={glass}
      >
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.2rem' }}>
          <FaTimes />
        </button>

        {/* Processing */}
        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '3rem', color: '#8B5CF6', marginBottom: '1.5rem', display: 'inline-block' }}
            >
              <GiCrystalBall />
            </motion.div>
            <div style={{ color: '#E2E8F0', fontSize: '1.1rem', fontWeight: '600' }}>Processing order...</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Securely linking with Razorpay 🔮</div>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              ✨
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <FaCheckCircle style={{ color: '#10B981', fontSize: '2.5rem', marginBottom: '1rem' }} />
              <div style={{ color: '#E2E8F0', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem' }}>🎉 Payment Successful!</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>
                Your order has been confirmed.
              </div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                📩 A confirmation email has been sent to your registered email address.<br />
                Please check your Inbox. If you don't see it, check your Spam folder.<br />
                <span style={{ color: '#F59E0B', fontWeight: '600' }}>Your magical adventure begins now.</span>
              </div>
              <div style={{ padding: '0.85rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <div style={{ color: '#34D399', fontSize: '0.78rem', fontWeight: '700', wordBreak: 'break-all' }}>Order ID: {verifiedOrderId}</div>
              </div>
              <a
                href={dronznidoBook}
                download="DRONZNIDO_The_Hidden_Kingdom_of_Wonders.pdf"
                onClick={onClose}
                style={{
                  textDecoration: 'none',
                  width: '100%', padding: '0.85rem',
                  background: 'linear-gradient(135deg, #8B5CF6, #F59E0B)',
                  border: 'none', borderRadius: '12px', color: '#fff',
                  fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  boxSizing: 'border-box'
                }}
              >
                <FaDownload /> Download Your Book
              </a>
            </motion.div>
          </div>
        )}

        {/* Error / Failure */}
        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
            <div style={{ color: '#EF4444', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>Payment Failed</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {errorMessage || 'There was an error processing your transaction. Please try again.'}
            </p>
            <button
              onClick={() => setStep('method')}
              style={{
                width: '100%', padding: '0.85rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px', color: '#fff',
                fontWeight: '750', fontSize: '0.95rem', cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Contact Form */}
        {step === 'method' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#F59E0B', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Secure Checkout</div>
              <div style={{ color: '#E2E8F0', fontSize: '1.25rem', fontWeight: '800' }}>Dronznido E-Book</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#10B981', fontSize: '1.4rem', fontWeight: '900' }}>₹29</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'line-through' }}>₹199</span>
                <span style={{ background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '2px 8px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: '700' }}>85% OFF</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1.25rem' }}>
              <div>
                <input 
                  style={inputStyle(errors.name)} 
                  placeholder="Full Name" 
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                />
                {errors.name && <div style={{ color: '#EF4444', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{errors.name}</div>}
              </div>

              <div>
                <input 
                  style={inputStyle(errors.email)} 
                  placeholder="Email Address" 
                  type="email" 
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} 
                />
                {errors.email && <div style={{ color: '#EF4444', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{errors.email}</div>}
              </div>

              <div>
                <input 
                  style={inputStyle(errors.phone)} 
                  placeholder="Phone Number" 
                  type="tel" 
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} 
                />
                {errors.phone && <div style={{ color: '#EF4444', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{errors.phone}</div>}
              </div>
            </div>

            <button
              onClick={handlePay}
              style={{
                width: '100%', padding: '0.9rem',
                background: 'linear-gradient(135deg, #7C3AED, #F59E0B)',
                border: 'none', borderRadius: '12px', color: '#fff',
                fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.4)'; }}
            >
              <FaShoppingCart /> Pay ₹29 Securely
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
              🔒 256-bit SSL Encrypted · Razorpay Ready
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN FANTASY STORE PAGE
───────────────────────────────────────── */
export default function FantasyStore() {
  useScrollToTop();
  const [activeTab, setActiveTab] = useState('about');
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [sampleOpen, setSampleOpen] = useState(false);

  const tabs = [
    { key: 'about', label: 'Story', icon: <FaBookOpen /> },
    { key: 'characters', label: 'Characters', icon: <FaUsers /> },
    { key: 'reviews', label: 'Reviews', icon: <FaStar /> },
    { key: 'gallery', label: 'Scene Gallery', icon: <FaImages /> },
    { key: 'videos', label: 'Videos', icon: <FaPlay /> },
  ];

  const glassPanel = {
    background: 'rgba(15,8,35,0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139,92,246,0.2)',
    borderRadius: '20px',
    position: 'relative',
    zIndex: 2,
  };

  const btnPrimary = {
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
    border: 'none', borderRadius: '12px', color: '#fff',
    fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'all 0.25s ease',
    boxShadow: '0 6px 20px rgba(124,58,237,0.4)',
    whiteSpace: 'nowrap',
  };

  const btnGold = {
    ...btnPrimary,
    background: 'linear-gradient(135deg, #D97706, #F59E0B)',
    boxShadow: '0 6px 20px rgba(217,119,6,0.4)',
  };

  const btnGlass = {
    padding: '0.8rem 1.5rem',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#E2E8F0',
    fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: '"Inter", system-ui, sans-serif', color: '#E2E8F0', overflowX: 'hidden' }}>
      <MagicalBackground />

      {/* ── Header / Back Navigation ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(10,4,21,0.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(139,92,246,0.2)',
          padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#C4B5FD', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#F59E0B'}
          onMouseLeave={e => e.currentTarget.style.color = '#C4B5FD'}
        >
          <FaArrowLeft /> Back to Portfolio
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B' }}>
          <GiSpellBook style={{ fontSize: '1.2rem' }} />
          <span style={{ fontWeight: '800', fontSize: '0.95rem', letterSpacing: '0.05em' }}>DRONZNIDO</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {[
            { icon: <FaStar />, label: bookData.rating },
            { icon: '👤', label: `${bookData.reviewCount.toLocaleString()} readers` },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              <span style={{ color: '#F59E0B' }}>{s.icon}</span> {s.label}
            </div>
          ))}
        </div>
      </motion.header>

      {/* ── Main Content ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* ── Hero Section ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }} className="fantasy-hero-grid">
          {/* 3D Book */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Book3D onBuyClick={() => setPaymentOpen(true)} />
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <div style={{ color: '#F59E0B', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GiMagicGate /> Epic Fantasy · Magic · Adventure · Another World
            </div>

            <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', lineHeight: 1.1, margin: '0 0 0.5rem', background: 'linear-gradient(135deg, #E2E8F0 0%, #C4B5FD 50%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dronznido<br />
            </h1>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: '1rem', fontStyle: 'italic' }}>
              The Hidden Kingdom of Wonders
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <FaStar key={s} style={{ color: s <= Math.floor(bookData.rating) ? '#F59E0B' : 'rgba(255,255,255,0.2)', fontSize: '1.1rem' }} />
              ))}
              <span style={{ color: '#F59E0B', fontWeight: '800', fontSize: '0.9rem' }}>{bookData.rating}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>({bookData.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '540px' }}>
              {bookData.description}
            </p>

            {/* Book meta */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Pages', value: bookData.pages },
                { label: 'Language', value: bookData.language },
                { label: 'Format', value: 'PDF' },
                { label: 'Author', value: bookData.author },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ color: '#E2E8F0', fontSize: '0.9rem', fontWeight: '700', marginTop: '2px' }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#10B981', fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>₹29</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', textDecoration: 'line-through' }}>₹199</span>
                  <span style={{ background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '2px 8px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: '800' }}>85% OFF · Limited</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                style={btnGold}
                onClick={() => setPaymentOpen(true)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(217,119,6,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(217,119,6,0.4)'; }}
              >
                <FaShoppingCart /> Buy Now — ₹29
              </button>
              <button
                style={{ ...btnGlass, color: wishlisted ? '#F59E0B' : '#E2E8F0', borderColor: wishlisted ? 'rgba(245,166,35,0.4)' : 'rgba(255,255,255,0.15)' }}
                onClick={() => setWishlisted(w => !w)}
              >
                {wishlisted ? <FaBookmark style={{ color: '#F59E0B' }} /> : <FaRegBookmark />}
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button style={btnGlass}
                onClick={() => navigator.share ? navigator.share({ title: bookData.title, url: window.location.href }) : alert('Share link copied!')}
              >
                <FaShare /> Share
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs Navigation ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ ...glassPanel, padding: '0.5rem', marginBottom: '2rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}
        >
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                flex: '1 1 auto', padding: '0.75rem 1.25rem',
                background: activeTab === t.key ? 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(99,102,241,0.4))' : 'transparent',
                border: activeTab === t.key ? '1px solid rgba(139,92,246,0.5)' : '1px solid transparent',
                borderRadius: '12px', color: activeTab === t.key ? '#C4B5FD' : 'rgba(255,255,255,0.5)',
                fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* ABOUT */}
            {activeTab === 'about' && (
              <div style={{ ...glassPanel, padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '1.5rem', fontFamily: 'Georgia, serif', color: '#C4B5FD' }}>About the Story</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="about-grid">
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, fontSize: '0.95rem' }}>
                      What if the greatest truth of the universe has been hidden for ages... waiting for someone to uncover it?

                      Far beyond imagination lies a world where magic is reality, courage is tested at every step, and every choice can change destiny forever. As ancient secrets awaken and an unseen darkness begins to move, a journey starts that is far bigger than anyone could have imagined.

                      DRONZNIDO: The Hidden Kingdom of Wonders is an epic fantasy adventure filled with breathtaking worlds, unforgettable characters, powerful mysteries, and moments that will keep you turning pages late into the night. Every chapter reveals new questions, every path hides another surprise, and nothing is ever as simple as it seems.

                      Some stories entertain you.
                      Some stay with you forever.
                      DRONZNIDO is the one you'll never want to put down.

                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, fontSize: '0.95rem', marginTop: '1rem' }}>
                      Armed with a grimoire that rewrites reality and a sword that bleeds starlight, he must forge alliances with ancient enemies, unravel the conspiracy behind the original fracture, and confront the true architect of the Eternal Void — before it devours the last star.
                    </p>
                  </div>
                  <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div
                        style={{
                          color: '#F59E0B',
                          fontWeight: '800',
                          fontSize: '0.8rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          marginBottom: '0.75rem'
                        }}
                      >
                        Themes
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {[
                          'Hidden Kingdoms',
                          'Ancient Prophecies',
                          'Legendary Heroes',
                          'Gods vs Darkness',
                          'Magic Beyond Imagination',
                          'Dragons & Mythical Creatures',
                          'Epic Kingdom Wars',
                          'Cursed Worlds',
                          'Lost Magical Civilizations',
                          'Brotherhood & Destiny',
                          'Divine Powers',
                          'Sacrifice for Hope',
                          'Forbidden Secrets',
                          'Ancient Relics',
                          'The Rise of Legends',
                          'Good vs Evil',
                          'Mystical Adventures',
                          'Unbreakable Courage',
                          'Fantasy Beyond Reality',
                          'The Fate of an Entire World'
                        ].map(theme => (
                          <span
                            key={theme}
                            style={{
                              padding: '4px 12px',
                              background: 'rgba(139,92,246,0.15)',
                              border: '1px solid rgba(139,92,246,0.3)',
                              borderRadius: '99px',
                              fontSize: '0.78rem',
                              color: '#C4B5FD',
                              fontWeight: '600'
                            }}
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          color: '#F59E0B',
                          fontWeight: '800',
                          fontSize: '0.8rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          marginBottom: '0.75rem'
                        }}
                      >
                        Comparable Works
                      </div>

                      <div
                        style={{
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.9rem',
                          lineHeight: 1.8
                        }}
                      >
                        If you love <em>Avatar</em>, <em>Avatar: The Last Airbender</em>,
                        <em> Harry Potter</em>, <em>The Lord of the Rings</em>,
                        <em> The Hobbit</em>, <em>Game of Thrones</em>,
                        <em> How to Train Your Dragon</em>, <em>The Chronicles of Narnia</em>,
                        <em> The Witcher</em>, and <em>Arcane</em>, you'll feel right at home in
                        <strong> DRONZNIDO: The Hidden Kingdom of Wonders</strong>—an epic fantasy
                        adventure filled with magic, legendary heroes, ancient prophecies, dragons,
                        breathtaking worlds, and unforgettable battles.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CHARACTERS — AAA Character Gallery */}
            {activeTab === 'characters' && (
              <div style={{ ...glassPanel, padding: '1.5rem', position: 'relative' }}>
                <CharacterGallery />
              </div>
            )}

            {/* REVIEWS — dynamic MongoDB system */}
            {activeTab === 'reviews' && (
              <div style={{ ...glassPanel, padding: '2.5rem' }}>
                <ReviewList />
              </div>
            )}

            {/* SCENE GALLERY — Visual Showcase */}
            {activeTab === 'gallery' && (
              <div style={{ ...glassPanel, padding: '2.5rem', position: 'relative' }}>
                <SceneGallery />
              </div>
            )}

            {/* VIDEOS — Cinematic Showcase */}
            {activeTab === 'videos' && (
              <div style={{ ...glassPanel, padding: '2.5rem', position: 'relative' }}>
                <VideoGallery />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── More from this Universe ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ ...glassPanel, padding: '2.5rem', marginTop: '3rem' }}
        >
          <h2 style={{ fontSize: '1.3rem', fontWeight: '900', marginBottom: '1.5rem', fontFamily: 'Georgia, serif', color: '#C4B5FD' }}>More from this Universe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Dronznido Part - II', subtitle: 'Journey to the Soyapet Chronicles', status: 'upcoming' },
              { title: "Dronznido Part - III", subtitle: 'The Final Reckoning', status: 'upcoming' }
            ].map((b, i) => (
              <div key={i} style={{
                padding: '1.5rem', background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '14px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem',
              }}>
                <div style={{ fontSize: '2.5rem', opacity: 0.35 }}><GiOpenBook /></div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: '0.9rem', fontFamily: 'Georgia, serif' }}>{b.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{b.subtitle}</div>
                <div style={{ padding: '4px 12px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '99px', color: '#A78BFA', fontSize: '0.72rem', fontWeight: '700' }}>
                  Coming Soon
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Final CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', padding: '4rem 2rem', marginTop: '3rem' }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '3rem', marginBottom: '1rem' }}
          >
            <GiSpellBook style={{ color: '#F59E0B', filter: 'drop-shadow(0 0 20px rgba(245,166,35,0.6))' }} />
          </motion.div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '900', marginBottom: '1rem', background: 'linear-gradient(135deg, #E2E8F0, #C4B5FD, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Begin Your Journey
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            For just ₹29, enter a world that will haunt your dreams and ignite your imagination.
          </p>
          <button
            style={{ ...btnGold, fontSize: '1.05rem', padding: '1rem 2.5rem', margin: '0 auto' }}
            onClick={() => setPaymentOpen(true)}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 18px 45px rgba(217,119,6,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(217,119,6,0.4)'; }}
          >
            <FaShoppingCart /> Get The Shattered Realm — ₹29
          </button>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(139,92,246,0.15)', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
          © 2025 Kayas Mishra · The Shattered Realm ·{' '}
          <Link to="/" style={{ color: 'rgba(139,92,246,0.7)', textDecoration: 'none' }}>Back to Portfolio</Link>
        </div>
      </div>

      {/* ── Payment Modal ── */}
      <AnimatePresence>
        {paymentOpen && <PaymentModal onClose={() => setPaymentOpen(false)} />}
      </AnimatePresence>

      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .fantasy-hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 2rem !important;
          }
          .fantasy-hero-grid > div:first-child {
            display: flex !important;
            justify-content: center !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.4); border-radius: 3px; }
      `}</style>
    </div>
  );
}

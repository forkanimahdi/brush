import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Contact form wired to EmailJS. Expects template variables: from_name, from_email, message.
 * Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY in .env.
 */
export function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current || !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setErrorMessage('Email is not configured. Add EmailJS keys to .env.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      formRef.current?.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.text || err.message || 'Something went wrong.');
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-tertiary/90">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="from_name"
          required
          placeholder="Your name"
          className="w-full rounded-sm border border-tertiary/20 bg-primary/40 px-4 py-3 text-tertiary placeholder-tertiary/50 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          disabled={status === 'sending'}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-tertiary/90">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="from_email"
          required
          placeholder="your@email.com"
          className="w-full rounded-sm border border-tertiary/20 bg-primary/40 px-4 py-3 text-tertiary placeholder-tertiary/50 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          disabled={status === 'sending'}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-tertiary/90">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Your message or commission inquiry…"
          className="w-full resize-y rounded-sm border border-tertiary/20 bg-primary/40 px-4 py-3 text-tertiary placeholder-tertiary/50 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          disabled={status === 'sending'}
        />
      </div>

      {status === 'success' && (
        <p className="text-sm text-secondary" role="status">
          Thank you. Your message has been sent.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-sm border-2 border-tertiary/30 bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wide text-tertiary transition hover:border-secondary hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

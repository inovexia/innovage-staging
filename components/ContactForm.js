'use client';

import { useState } from 'react';
import { services, site } from '@/lib/data';
import Icon from './Icon';

// Submissions go to Netlify Forms (form "contact", registered in public/__forms.html).
// They appear under Forms in the Netlify dashboard; email notifications are set up there.
export default function ContactForm() {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const toggle = (t) => setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('form-name', 'contact');
    data.set('interests', selected.join(', ') || '-');
    setStatus('sending');
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      setSelected([]);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form glass" name="contact" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      {/* honeypot: hidden from people, bots fill it in and Netlify discards the submission */}
      <p className="hp-field" aria-hidden="true">
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset>
        <legend>I&apos;m interested in…</legend>
        <div className="chips">
          {services.map((s) => (
            <button
              type="button"
              key={s.slug}
              className={`chip ${selected.includes(s.title) ? 'on' : ''}`}
              aria-pressed={selected.includes(s.title)}
              onClick={() => toggle(s.title)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="field-row">
        <label className="field">
          <input name="name" required placeholder=" " autoComplete="name" />
          <span>Your name *</span>
        </label>
        <label className="field">
          <input name="email" type="email" required placeholder=" " autoComplete="email" />
          <span>Email address *</span>
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <input name="company" placeholder=" " autoComplete="organization" />
          <span>Company</span>
        </label>
        <label className="field">
          <select name="budget" defaultValue="Not sure yet">
            <option>Not sure yet</option>
            <option>Under $10k</option>
            <option>$10k – $25k</option>
            <option>$25k – $50k</option>
            <option>$50k+</option>
          </select>
          <span className="always">Budget</span>
        </label>
      </div>
      <label className="field">
        <textarea name="message" rows={5} required placeholder=" " />
        <span>Tell us about your project *</span>
      </label>
      <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'sending'} data-magnetic>
        {status === 'sending' ? 'Sending…' : 'Send Message'} <Icon name="arrow" size={18} />
      </button>
      <p className="form-note" role="status" aria-live="polite">
        {status === 'sent' && 'Thanks! Your message has been sent — we’ll get back to you within one business day.'}
        {status === 'error' && (
          <>
            Sorry, something went wrong. Please try again or email us at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </>
        )}
      </p>
    </form>
  );
}

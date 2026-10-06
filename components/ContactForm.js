'use client';

import { useState } from 'react';
import { services, site } from '@/lib/data';
import Icon from './Icon';

// No backend yet: the form composes an email in the visitor's mail client.
// Swap handleSubmit for an API route / form service when one is available.
export default function ContactForm() {
  const [selected, setSelected] = useState([]);
  const [sent, setSent] = useState(false);

  const toggle = (t) => setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Company: ${f.get('company') || '-'}`,
      `Budget: ${f.get('budget')}`,
      `Interested in: ${selected.join(', ') || '-'}`,
      '',
      f.get('message'),
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Project enquiry — ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="contact-form glass" onSubmit={handleSubmit}>
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
      <button className="btn btn-primary btn-lg" type="submit" data-magnetic>
        Send Message <Icon name="arrow" size={18} />
      </button>
      {sent && <p className="form-note" role="status">Your email app should open with the message ready to send. Thanks!</p>}
    </form>
  );
}

"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !body) return;

    setSending(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, body }),
    });

    if (res.ok) {
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setBody("");
    }
    setSending(false);
  };

  if (sent) {
    return (
      <div className="bg-gray-900 border border-green-500/30 rounded-xl p-8 max-w-lg">
        <p className="text-green-400 font-medium">Message sent successfully!</p>
        <p className="text-gray-400 text-sm mt-1">I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-blue-400 hover:text-blue-300 mt-3 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-name" className="text-sm text-gray-400">Name</label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-email" className="text-sm text-gray-400">Email</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-subject" className="text-sm text-gray-400">Subject (optional)</label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="What's this about?"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-body" className="text-sm text-gray-400">Message</label>
        <textarea
          id="contact-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-y"
          placeholder="Your message..."
          required
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

"use client";

import { useRef, useState } from "react";
import { SERVICE_INTEREST_OPTIONS } from "@/lib/site-content";

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  interest: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  interest: "",
  message: "",
};

// Mirrors Home.onFormSubmit() from the Angular version: there is no backend/API here,
// so submitting just swaps the button's label/colors for 3 seconds as a lightweight
// acknowledgement, then reverts. Wired through a real onSubmit handler (rather than a
// bare button click) so a real API call can be dropped in later without touching markup
// -- see the TODO below.
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: when a backend is available, replace this block with the real request, e.g.:
    //   await fetch("/api/quote-requests", { method: "POST", body: JSON.stringify(form) });
    // and gate the success state on the response instead of a fixed timeout.
    void form;

    setSubmitted(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <form className="contact-form-wrap" onSubmit={handleSubmit}>
      <h3 className="form-title">Request a Quote</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="company">Company / Project</label>
        <input
          id="company"
          type="text"
          placeholder="Company or project name"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="interest">Service Interest</label>
        <select id="interest" value={form.interest} onChange={handleChange}>
          {SERVICE_INTEREST_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Tell us about your requirement..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="form-submit"
        style={
          submitted
            ? { background: "#1c8c78", color: "#fff" }
            : undefined
        }
      >
        {submitted ? "Request Sent" : "Send Request"}
      </button>
    </form>
  );
}

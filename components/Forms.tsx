"use client";

import { useState, type FormEvent } from "react";
import { readAttribution } from "./ClientBits";

type Status = "idle" | "sending" | "done" | "error";

async function post(url: string, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, attribution: readAttribution(), page: window.location.href }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Request failed");
}

const field =
  "w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 focus:border-purple focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-charcoal";

export function ApplicationForm({ calendarUrl }: { calendarUrl?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await post("/api/apply", e.currentTarget);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-purple/20 bg-white p-8">
        <h3 className="text-2xl">Application received.</h3>
        {calendarUrl ? (
          <>
            <p className="mt-3 text-muted">Pick a time below. We will use the call to see if this is the right fit.</p>
            <iframe src={calendarUrl} title="Book your call" className="mt-6 h-[720px] w-full rounded-xl border-0" />
          </>
        ) : (
          <p className="mt-3 text-muted">Thank you. Our team will review it and reach out within one business day.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-charcoal/10 bg-white p-6 md:grid-cols-2 md:p-8">
      <div>
        <label className={label} htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" required autoComplete="given-name" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" required autoComplete="family-name" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="company">Business name</label>
        <input id="company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="revenue">Annual revenue</label>
        <select id="revenue" name="revenue" required className={field} defaultValue="">
          <option value="" disabled>Select one</option>
          <option>Under $250K</option>
          <option>$250K to $1M</option>
          <option>$1M to $5M</option>
          <option>$5M+</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="bottleneck">Where does your business depend on you most right now?</label>
        <textarea id="bottleneck" name="bottleneck" required rows={3} className={field} />
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="freedom">What would more time and margin give back to your faith and family?</label>
        <textarea id="freedom" name="freedom" rows={3} className={field} />
      </div>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-muted">We respect your inbox and never sell your information.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-purple px-7 py-3 text-sm font-semibold text-white hover:bg-purple-deep disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Submit application"}
        </button>
      </div>
      {status === "error" && <p className="text-sm text-red-700 md:col-span-2" role="alert">{error}</p>}
    </form>
  );
}

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await post("/api/subscribe", e.currentTarget);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className={dark ? "text-white" : "text-charcoal"}>You are in. Watch your inbox.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="nl-email" className="sr-only">Email</label>
      <input id="nl-email" name="email" type="email" required placeholder="Your email" autoComplete="email" className={field} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="shrink-0 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white hover:bg-purple-deep disabled:opacity-60"
      >
        {status === "sending" ? "Joining..." : "Subscribe"}
      </button>
      {status === "error" && <p className="text-sm text-red-400" role="alert">Please try again.</p>}
    </form>
  );
}

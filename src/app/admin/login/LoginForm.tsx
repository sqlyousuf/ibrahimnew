"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    try {
      await adminApi.login(String(form.get("username")), String(form.get("password")));
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-sm p-6 sm:p-8">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-gold-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-gold-500"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </div>
    </form>
  );
}

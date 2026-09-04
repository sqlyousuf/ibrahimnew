import type { Metadata } from "next";
import LoginForm from "@/app/admin/login/LoginForm";

// Deliberately not linked from anywhere on the public site, and excluded
// from search indexing — this is a private, unlisted URL shared only with
// the team.
export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-5 py-16">
      <div className="w-full">
        <p className="mb-6 text-center font-display text-lg font-semibold text-navy-900">
          Masjid Ibrahim — This Week Admin
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

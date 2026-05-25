"use client";

import { useState } from "react";
import { ButtonSubmit } from "@/components/ui/Button";
import { SITE } from "@/lib/data/site";

export function NewsletterForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const subject = encodeURIComponent("Suscripción — El Cielo del Limarí");
    const body = encodeURIComponent(
      `Hola, deseo suscribirme al newsletter El Cielo del Limarí.\n\nCorreo: ${email}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <p className="rounded-full border border-copper/30 bg-copper/10 px-4 py-3 text-sm text-sand/80">
        Revisa tu correo para confirmar la suscripción.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="email"
        required
        type="email"
        placeholder="Tu correo"
        className="rounded-full border border-white/12 bg-white/6 px-4 py-3 font-sans text-sm text-sand outline-none transition placeholder:text-sand/40 focus:border-copper/50 focus:ring-2 focus:ring-copper/20"
      />
      <ButtonSubmit type="submit">Suscribirme</ButtonSubmit>
    </form>
  );
}

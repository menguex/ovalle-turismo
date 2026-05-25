"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { ButtonSubmit } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { SITE } from "@/lib/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const message = String(fd.get("message") ?? "");

    const subject = encodeURIComponent(`Consulta turismo — ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\n${message}`
    );

    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <PagePanel className="p-8 text-center lg:p-10">
        <IconBadge icon={Mail} size="md" variant="brand" className="mx-auto mb-5" />
        <h2 className="font-display text-2xl text-fg">¡Mensaje listo!</h2>
        <p className="mt-3 text-muted-fg">
          Se abrió tu cliente de correo con el mensaje. Si no aparece, escríbenos a{" "}
          <a href={`mailto:${SITE.email}`} className="text-brand-orange hover:underline">
            {SITE.email}
          </a>
        </p>
      </PagePanel>
    );
  }

  return (
    <PagePanel className="p-8 lg:p-10">
      <div className="mb-6 flex items-center gap-3">
        <IconBadge icon={Mail} size="sm" variant="brand" />
        <h2 className="font-display text-xl font-semibold text-fg">Escríbenos</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <input
          name="name"
          required
          type="text"
          placeholder="Nombre"
          className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-fg outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Correo electrónico"
          className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-fg outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Teléfono"
          className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-fg outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos sobre tu viaje..."
          className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-fg outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
        />
        <ButtonSubmit type="submit">Enviar mensaje</ButtonSubmit>
      </form>
    </PagePanel>
  );
}

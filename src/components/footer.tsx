import Link from "next/link";
import Image from "next/image";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { navItems, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t hairline bg-ink text-pearl">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-[8px] bg-white px-4 py-3">
            <Image
              src="/legacy/logo-shine-girls-root.jpg"
              alt={site.shortName}
              width={72}
              height={72}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-pearl/70">
            Uma plataforma feminina para moda, modelos, autoestima e publicidade com curadoria.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blush">Mapa</p>
          <div className="mt-4 grid gap-2 text-sm text-pearl/72">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/atualizacoes-do-site" className="transition hover:text-white">
              Atualizações do Site
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blush">Contato</p>
          <div className="mt-4 grid gap-3 text-sm text-pearl/72">
            <a className="flex items-center gap-2 transition hover:text-white" href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" aria-hidden />
              {site.email}
            </a>
            <a className="flex items-center gap-2 transition hover:text-white" href={site.instagram}>
              <AtSign className="h-4 w-4" aria-hidden />
              Instagram
            </a>
            <a className="flex items-center gap-2 transition hover:text-white" href={`https://wa.me/5534988977879`}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-pearl/52">
        © {new Date().getFullYear()} Shine Girls. Nova plataforma independente do legado WordPress.
      </div>
    </footer>
  );
}

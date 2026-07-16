import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/content/site";
import { TrackedLink } from "@/components/tracked-link";

export function MobileNavigation() {
  return (
    <details className="group relative md:hidden">
      <summary className="focus-ring grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border hairline bg-white text-ink [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Abrir ou fechar menu</span>
        <Menu className="h-5 w-5 group-open:hidden" aria-hidden />
        <X className="hidden h-5 w-5 group-open:block" aria-hidden />
      </summary>

      <div className="absolute right-0 top-[calc(100%+8px)] w-[min(340px,calc(100vw-32px))] rounded-[8px] border hairline bg-pearl p-4 shadow-soft">
        <nav className="grid gap-1" aria-label="Navegação móvel">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-[8px] px-4 py-3 text-sm font-semibold text-charcoal transition hover:bg-white hover:text-wine">
              {item.label}
            </Link>
          ))}
          <TrackedLink
            href="/modelos/cadastro"
            eventName="clicou_criar_cadastro"
            eventData={{ origem: "menu_mobile" }}
            className="focus-ring mt-3 inline-flex items-center justify-center rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white transition hover:bg-wine"
          >
            Entrar para o casting
          </TrackedLink>
        </nav>
      </div>
    </details>
  );
}

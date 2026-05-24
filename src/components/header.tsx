import Link from "next/link";
import Image from "next/image";
import { navItems, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-pearl/88 backdrop-blur-xl">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center rounded-[8px]" aria-label="Shine Girls Home">
          <Image
            src="/legacy/logo-shine-girls-root.jpg"
            alt={site.shortName}
            width={56}
            height={56}
            priority
            className="h-12 w-12 rounded-full object-cover ring-1 ring-rose/20"
          />
          <span className="ml-3 hidden font-display text-2xl font-semibold tracking-normal text-ink sm:inline">
            Shine Girls
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal/76 md:flex" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-full transition hover:text-wine">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contato"
          className="focus-ring rounded-full bg-rose px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-wine"
        >
          Parcerias
        </Link>
      </div>
    </header>
  );
}

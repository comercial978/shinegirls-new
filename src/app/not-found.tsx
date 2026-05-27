import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="bg-pearl py-24">
      <div className="container-shell max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose">404</p>
        <h1 className="mt-4 font-display text-5xl text-ink">Página não encontrada</h1>
        <p className="mt-5 text-charcoal/70">Este conteúdo não faz parte da nova curadoria Shine Girls.</p>
        <div className="mt-8">
          <ButtonLink href="/">Voltar para Home</ButtonLink>
        </div>
      </div>
    </section>
  );
}

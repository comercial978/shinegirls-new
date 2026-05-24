type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl leading-[1.02] text-ink md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-charcoal/70 md:text-lg">{text}</p> : null}
    </div>
  );
}

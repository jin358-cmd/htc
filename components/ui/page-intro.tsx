export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs tracking-[0.22em] text-moss">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
      {description ? <p className="mt-4 text-base leading-relaxed text-ink-soft">{description}</p> : null}
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="text-xs tracking-[0.22em] text-moss">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 leading-relaxed text-ink-soft">{description}</p> : null}
    </div>
  );
}

import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[320px] items-end overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-geometric-fade" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 lg:px-8">
        <p className="section-eyebrow text-gold-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-cream-100/85">{description}</p>
        )}
      </div>
    </section>
  );
}

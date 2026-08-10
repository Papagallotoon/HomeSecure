import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  href: string;
  matchReason: string;
  /** Toujours fourni depuis SITE.resultCopy.productCtaLabel. */
  ctaLabel: string;
}

/** Fiche "dossier" : visuel à gauche, spécifications à droite. */
export function ProductCard({ product, href, matchReason, ctaLabel }: ProductCardProps) {
  const gallery = product.images?.slice(0, 4) ?? [];

  return (
    <div className="grid border border-brand-600/20 bg-brand-100/70 lg:grid-cols-[400px_1fr]">
      <div className="flex flex-col border-white/[0.08] bg-brand-50 lg:border-r">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-contain p-6"
          loading="lazy"
        />

        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-px border-t border-white/[0.08] bg-white/[0.08]">
            {gallery.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="aspect-square w-full bg-brand-50 object-contain p-2"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="font-mono text-[11px] uppercase tracking-ops text-brand-600">
          {product.category.replace(/-/g, " ")}
        </div>
        <h3 className="mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none text-brand-950">
          {product.name}
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-700">
          {product.shortDescription}
        </p>

        <ul className="mt-5 flex flex-col gap-3">
          {product.advantages.slice(0, 3).map((adv, i) => (
            <li key={adv} className="flex gap-3 text-[15px] leading-relaxed text-brand-800">
              <span aria-hidden className="pt-0.5 font-mono text-[11px] text-brand-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {adv}
            </li>
          ))}
        </ul>

        <p className="mt-5 border-l-2 border-brand-600 bg-brand-600/[0.07] px-4.5 py-3.5 text-[15px] leading-relaxed text-brand-800">
          {matchReason}
        </p>

        <a
          href={href}
          className="clip-bevel mt-6 inline-flex items-center justify-center bg-brand-600 px-8 py-4 font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50 transition hover:bg-brand-600/85"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

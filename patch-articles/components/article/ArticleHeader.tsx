import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type ArticleMeta } from "@/content/articles";

const KIND_LABEL: Record<ArticleMeta["kind"], string> = {
  comparison: "Comparison",
  guide: "Guide",
  duel: "Head to head",
  checklist: "Checklist",
};

// Entête d'article : fil d'Ariane, titre, chapeau, bande de chiffres clés, puis
// la prise en pleine largeur. Les chiffres clés donnent l'échelle du test avant
// que le lecteur n'entre dans le corps.
export function ArticleHeader({ article }: { article: ArticleMeta }) {
  const category = CATEGORIES[article.category];

  return (
    <header>
      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
        <Link href={`/${article.category}`} style={{ color: category.color }}>
          {category.label}
        </Link>
        <span className="text-brand-400">/</span>
        <span>{KIND_LABEL[article.kind]}</span>
        <span className="text-brand-400">/</span>
        <span>{article.updated}</span>
      </div>

      <h1 className="mt-4 max-w-[24ch] font-condensed text-[clamp(34px,6vw,60px)] font-extrabold uppercase leading-[0.95] text-brand-950 [text-wrap:balance]">
        {article.title}
      </h1>

      <p className="mt-5 max-w-[58ch] font-serif text-[clamp(19px,2.2vw,22px)] leading-[1.55] text-brand-700">
        {article.standfirst}
      </p>

      <div className="mt-7 grid grid-cols-1 gap-px border-y border-brand-300 py-px sm:grid-cols-3">
        {article.facts.map((fact) => (
          <div key={fact.label} className="bg-brand-100/70 px-4 py-4">
            <div className="font-condensed text-[30px] font-extrabold uppercase leading-none text-brand-950">
              {fact.value}
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
              {fact.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
        <span>{article.readingTime}</span>
        <span>No. {article.number}</span>
        {article.kind === "comparison" && <span>Affiliate links · we buy at retail</span>}
      </div>

      {article.image && (
        <div className="relative mt-7 aspect-[16/9] w-full border border-brand-200">
          <Image
            src={article.image}
            alt={article.imageAlt ?? ""}
            fill
            priority
            sizes="(min-width: 1024px) 760px, 100vw"
            className={`object-cover ${article.imageDark ? "editorial-shot-dark" : "editorial-shot"}`}
          />
        </div>
      )}
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_ORDER, articleHref, byCategory } from "@/content/articles";
import { ArticleRow } from "@/components/article/ArticleRow";

// Hub de catégorie. Une mise en avant illustrée, puis la liste de la catégorie.
// Les quatre slugs sont statiques : pas de collision avec /quiz, /assessment ou
// /library, que Next résout avant le segment dynamique.

export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = CATEGORIES[params.category];
  if (!category) return {};
  return {
    title: `${category.label} — Home-Secure`,
    description: category.blurb,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES[params.category];
  if (!category) notFound();

  const articles = byCategory(params.category);
  const [lead, ...rest] = articles;

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-[clamp(28px,5vw,52px)] sm:px-7">
      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
        <Link href="/" className="text-brand-500 hover:text-brand-600">
          Home
        </Link>
        <span className="text-brand-400">/</span>
        <span style={{ color: category.color }}>{category.label}</span>
      </div>

      <h1 className="mt-4 font-condensed text-[clamp(38px,7vw,72px)] font-extrabold uppercase leading-[0.92] text-brand-950">
        {category.label}
      </h1>
      <p className="mt-4 max-w-[54ch] font-serif text-[clamp(19px,2.2vw,22px)] leading-[1.55] text-brand-700">
        {category.blurb}
      </p>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-brand-300 py-3.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
        <span>
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </span>
        {CATEGORY_ORDER.filter((key) => key !== params.category).map((key) => (
          <Link key={key} href={`/${key}`} className="text-brand-500 hover:text-brand-600">
            {CATEGORIES[key]!.label} →
          </Link>
        ))}
      </div>

      {lead && (
        <article className="mt-9 grid grid-cols-1 items-start gap-[clamp(20px,3vw,36px)] lg:grid-cols-[1.1fr_1fr]">
          {lead.image && (
            <Link href={articleHref(lead)} className="relative block aspect-[16/10] w-full border border-brand-200">
              <Image
                src={lead.image}
                alt={lead.imageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 620px, 100vw"
                className={`object-cover ${lead.imageDark ? "editorial-shot-dark" : "editorial-shot"}`}
              />
            </Link>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-ops">
              <span className="bg-brand-600 px-2 py-1 text-white">{lead.kicker}</span>
              <span className="text-brand-500">{lead.meta}</span>
            </div>
            <h2 className="mt-3.5 font-condensed text-[clamp(28px,4.4vw,40px)] font-extrabold uppercase leading-[0.98] text-brand-950 [text-wrap:balance]">
              <Link href={articleHref(lead)} className="text-inherit hover:text-brand-600">
                {lead.title}
              </Link>
            </h2>
            <p className="mt-3.5 max-w-[56ch] font-serif text-[18px] leading-[1.62] text-brand-700">
              {lead.excerpt}
            </p>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="mt-11">
          <div className="flex items-baseline justify-between gap-4 border-b border-brand-300 pb-3.5">
            <h2 className="m-0 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950">
              More in {category.label}
            </h2>
          </div>
          <div className="flex flex-col">
            {rest.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}

      <div className="clip-bevel mt-12 flex flex-wrap items-center justify-between gap-5 border border-brand-600/30 bg-brand-600/[0.08] px-[22px] py-6">
        <div className="min-w-0 flex-1 basis-[280px]">
          <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
            Free assessment
          </div>
          <h3 className="mt-2.5 font-condensed text-[25px] font-extrabold uppercase leading-[1.04] text-brand-950">
            Is {category.label.toLowerCase()} your weakest layer?
          </h3>
          <p className="mt-2 max-w-[52ch] font-serif text-[16px] leading-[1.55] text-brand-800">
            Seven questions, a 0–100 index, and the three fixes that move it most per dollar.
          </p>
        </div>
        <Link
          href="/assessment"
          className="clip-bevel flex min-h-[48px] items-center bg-brand-600 px-6 py-3.5 font-condensed text-[17px] font-extrabold uppercase tracking-[0.06em] text-white hover:bg-brand-600/85"
        >
          Score my home
        </Link>
      </div>
    </div>
  );
}

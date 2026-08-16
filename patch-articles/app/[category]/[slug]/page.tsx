import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ARTICLES,
  CATEGORIES,
  articleHref,
  getArticle,
  relatedArticles,
} from "@/content/articles";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleRow } from "@/components/article/ArticleRow";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ category: a.category, slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — Home-Secure`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const article = getArticle(params.slug);
  if (!article || article.category !== params.category) notFound();

  const related = relatedArticles(article);

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-[clamp(28px,5vw,52px)] sm:px-7">
      <div className="flex flex-wrap items-start gap-[clamp(28px,4vw,52px)]">
        <article className="min-w-0 flex-1 basis-[560px]">
          <ArticleHeader article={article} />
          <ArticleBody blocks={article.blocks} />

          <div className="mt-12 border-t border-brand-300 pt-5 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-brand-500">
            Home-Secure buys every product it tests at retail. Links marked “Check price” earn us a
            commission, which does not change the ranking — the test data above does.
          </div>
        </article>

        <aside className="flex min-w-0 shrink grow-0 basis-[300px] flex-col gap-5">
          <div className="border border-brand-600/30 bg-brand-600/[0.08] px-[22px] py-6">
            <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
              Free assessment
            </div>
            <h3 className="mt-2.5 font-condensed text-[24px] font-extrabold uppercase leading-[1.02] text-brand-950">
              Score your home in 60 seconds
            </h3>
            <p className="mt-2 font-serif text-[15px] leading-[1.55] text-brand-700">
              Seven questions, one 0–100 index, and the exact gaps to close first.
            </p>
            <Link
              href="/assessment"
              className="clip-bevel mt-4 flex min-h-[48px] items-center justify-center bg-brand-600 px-5 py-3.5 font-condensed text-[17px] font-extrabold uppercase tracking-[0.06em] text-white hover:bg-brand-600/85"
            >
              Run the assessment
            </Link>
          </div>

          <div className="border border-brand-200 bg-brand-100 px-[22px] py-6">
            <div className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
              In this category
            </div>
            <Link
              href={`/${article.category}`}
              className="mt-3 block font-condensed text-[22px] font-bold uppercase leading-[1.06] text-brand-900 hover:text-brand-600"
            >
              All {CATEGORIES[article.category].label.toLowerCase()} articles →
            </Link>
            <p className="mt-2 font-serif text-[15px] leading-[1.5] text-brand-700">
              {CATEGORIES[article.category].blurb}
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <div className="flex items-baseline justify-between gap-4 border-b border-brand-300 pb-3.5">
            <h2 className="m-0 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950">
              Read next
            </h2>
            <Link
              href={articleHref(related[0])}
              className="font-mono text-[10px] uppercase tracking-ops text-brand-600"
            >
              Most relevant →
            </Link>
          </div>
          <div className="flex flex-col">
            {related.map((item) => (
              <ArticleRow key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

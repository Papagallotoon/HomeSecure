import Link from "next/link";
import { SITE } from "@/config/active";
import { TrackOnMount } from "@/components/layout/TrackOnMount";
import { headingClass } from "@/lib/heading";
import { resolveVideoEmbed } from "@/lib/video";

export default function LandingPage() {
  const video = SITE.hero.videoUrl ? resolveVideoEmbed(SITE.hero.videoUrl) : null;
  const isBackgroundVideo = video?.kind === "file";

  return (
    <div className="relative">
      <TrackOnMount event="landing_view" />

      {/* Zone camouflage : couvre le haut de page, s'éteint vers le bas.
          Une vidéo de fond la remplace quand la niche en fournit une. */}
      {!isBackgroundVideo && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden">
          <div className="camo-zone" />
          <div className="camo-veil" />
        </div>
      )}

      {isBackgroundVideo ? (
        <BackgroundVideoHero videoSrc={video.src} />
      ) : (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-24">
          <div className="flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-ops text-brand-600">
            <span aria-hidden className="block h-px w-7 bg-brand-600" />
            Field assessment / 72-hour window
          </div>

          <h1
            className={`${headingClass(SITE)} mt-6 max-w-4xl text-6xl leading-[0.88] text-brand-900 sm:text-7xl lg:text-[104px]`}
            style={{ textWrap: "balance" }}
          >
            {SITE.hero.title}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-700 sm:text-xl">
            {SITE.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <Link
              href="/quiz"
              className="clip-bevel inline-flex items-center justify-center bg-brand-600 px-9 py-4 font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50 transition hover:bg-brand-600/85 active:scale-[0.99]"
            >
              {SITE.hero.ctaLabel}
            </Link>

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-ops text-brand-500">
              {SITE.hero.benefits.map((benefit) => (
                <span key={benefit}>{benefit}</span>
              ))}
            </div>
          </div>

          {video?.kind === "iframe" && (
            <div className="mt-14 aspect-video w-full max-w-3xl overflow-hidden border border-brand-600/20 bg-black">
              <iframe
                src={video.src}
                title={`${SITE.siteName} intro video`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </section>
      )}

      {SITE.howItWorks.length > 0 && (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-4">
          <div className="border-b border-white/[0.09] pb-5 font-mono text-[11px] uppercase tracking-ops text-brand-500">
            Operational sequence
          </div>
          <div className="grid gap-px border border-t-0 border-white/[0.09] bg-white/[0.09] sm:grid-cols-3">
            {SITE.howItWorks.map((step, i) => (
              <HowItWorksStep key={step.title} n={i + 1} title={step.title} desc={step.description} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BackgroundVideoHero({ videoSrc }: { videoSrc: string }) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden sm:min-h-[85vh]">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-50/70" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-ops text-brand-600">
          <span aria-hidden className="block h-px w-7 bg-brand-600" />
          Field assessment / 72-hour window
        </div>
        <h1
          className={`${headingClass(SITE)} mt-6 max-w-4xl text-6xl leading-[0.88] text-brand-950 sm:text-7xl lg:text-[104px]`}
          style={{ textWrap: "balance" }}
        >
          {SITE.hero.title}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-800 sm:text-xl">
          {SITE.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
          <Link
            href="/quiz"
            className="clip-bevel inline-flex items-center justify-center bg-brand-600 px-9 py-4 font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50 transition hover:bg-brand-600/85 active:scale-[0.99]"
          >
            {SITE.hero.ctaLabel}
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-ops text-brand-700">
            {SITE.hero.benefits.map((benefit) => (
              <span key={benefit}>{benefit}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksStep({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="bg-brand-100/60 p-8">
      <div className="font-mono text-xs tracking-ops text-brand-600">
        {String(n).padStart(2, "0")}
      </div>
      <h3 className="mt-3.5 font-condensed text-2xl font-bold uppercase tracking-wide text-brand-900">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-brand-500">{desc}</p>
    </div>
  );
}

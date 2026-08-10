# Patch — direction Tactical (charbon + bronze)

Chaque fichier ci-dessous remplace **entièrement** son homologue dans
`readyscore-affiliate-engine/`. Rien d'autre à toucher.

| Fichier du patch | Destination |
|---|---|
| `config-niches-readyscore-site.ts` | `config/niches/readyscore/site.ts` |
| `app-globals.css` | `app/globals.css` |
| `app-layout.tsx` | `app/layout.tsx` |
| `app-page.tsx` | `app/page.tsx` |
| `app-result-page.tsx` | `app/result/page.tsx` |
| `app-icon.svg` | `app/icon.svg` |
| `tailwind.config.ts` | `tailwind.config.ts` |
| `lib-heading.ts` | `lib/heading.ts` |
| `components-layout-Header.tsx` | `components/layout/Header.tsx` |
| `components-layout-Footer.tsx` | `components/layout/Footer.tsx` |
| `components-quiz-ProgressBar.tsx` | `components/quiz/ProgressBar.tsx` |
| `components-quiz-QuestionCard.tsx` | `components/quiz/QuestionCard.tsx` |
| `components-result-ScoreDisplay.tsx` | `components/result/ScoreDisplay.tsx` |
| `components-result-ScoreGauge.tsx` | `components/result/ScoreGauge.tsx` |
| `components-result-StrengthsGaps.tsx` | `components/result/StrengthsGaps.tsx` |
| `components-result-ProductCard.tsx` | `components/result/ProductCard.tsx` |

## Le principe

La rampe `branding.colors` est **inversée** : `brand-50` est désormais le noir
charbon et `brand-950` le sable clair. `brand-600` reste l'accent (bronze).
Résultat : `bg-brand-50` / `text-brand-950` continuent de signifier « fond » et
« texte fort » sans qu'aucune classe Tailwind ne change de nom. Les autres
niches (growready) gardent leur rampe claire et ne sont pas affectées.

Les seules retouches composant sont là où un blanc ou un `amber-*` était codé
en dur — la palette ne pouvait pas les atteindre.

## Vérifier

```bash
npm run dev
```

Landing → quiz → result. Puis `npm run build` avant de déployer.

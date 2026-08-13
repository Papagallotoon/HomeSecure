# patch-editorial — Home-Secure éditorial

Fait passer le déploiement de l'ancien tunnel ReadyScore au site éditorial
Home-Secure validé dans `Home-Secure - Editorial.dc.html` : thème kaki clair,
marque Home-Secure, home magazine. Le quiz reste en place, rétrogradé au rôle
de CTA.

## Appliquer

Décompressez le dossier à la racine du repo, puis :

```powershell
powershell -ExecutionPolicy Bypass -File .\patch-editorial\apply.ps1
```

Le script crée la branche `editorial`, copie les fichiers, vérifie que les
visuels sont présents, lance `typecheck` puis `build`, supprime
`patch-editorial\` et commite. En cas de doute : `git checkout main`.

Déploiement :

```powershell
git checkout main
git merge editorial
git push
```

## Fichiers

L'arborescence du dossier est celle du repo — chaque fichier va à sa place.

| Fichier | Ce qui change |
| --- | --- |
| `app/globals.css` | Palette de secours en kaki clair. Camouflage sable en trois tons (paliers 0.73–0.94), porté par le body en `background-attachment: fixed` via `.camo-page` — pas de couture entre sections. Voile allégé. Deux classes `.editorial-shot` pour remonter les visuels tirés en clé sombre. |
| `config/niches/readyscore/site.ts` | `siteName` → Home-Secure, `logoLetter: "H"`, rampe `brand` basculée vers le clair (`50 #e6e1d1` fond, `100 #f1ede1` cartes, `950 #1b1e21` texte fort, accent `600 #0e7c6e`). |
| `app/layout.tsx` | Ajout de Newsreader aux polices chargées, classe `camo-page` sur le body. |
| `tailwind.config.ts` | `font-serif` → Newsreader. |
| `components/layout/Header.tsx` | Deux étages : bandeau mono « Independent testing », puis barre collante avec le monogramme H, la navigation par catégorie et le CTA « Score my home ». |
| `components/layout/Footer.tsx` | Filet supérieur en `brand-200` (il était en blanc translucide, invisible sur fond clair). |
| `app/page.tsx` | La home éditoriale : une illustrée, trois brèves, quatre hubs, liste des derniers articles, colonne latérale avec l'encart quiz. Remplace l'ancienne page hero + « operational sequence ». |
| `content/editorial.ts` | Tout le contenu de la home, séparé de `site.ts` (validé contre `SiteConfig`, partagé par les niches). |

## Visuels

La home consomme quatre des onze prises : `01-lead-camera.png`,
`02-smart-lock.png`, `03-alarm-app.png`, `04-window-sensor.png`. Elles
doivent être dans `public/images/` — le script prévient si l'une manque.

Tirées en clé sombre, elles passent par `.editorial-shot`. Les trois plus
sombres (`08-strike-plate`, `10-patio-door`, `11-garage-door`) demandent
`imageDark: true` dans `content/editorial.ts`, qui applique un filtre plus
fort. Pour s'en passer, régénérer avec les prompts éclaircis :

```powershell
node tools/generate-images.mjs --only ed-guide-n1 --force
```

## Ce qui reste après ce patch

- **Pages catégorie** : la navigation et les hubs pointent sur `#`. Il faut une
  route `app/[category]/page.tsx`.
- **Articles MDX** : `content/editorial.ts` contient des données en dur. La
  forme des objets est déjà celle du frontmatter visé, donc le passage à un
  dossier `content/articles/*.mdx` ne touchera pas les composants.
- **Gabarits d'article** : comparatif Top N, guide long, duel A/B, checklist.
- **Emplacements display** : `EDITORIAL.showAdSlots` est à `false` tant
  qu'aucune régie n'est branchée.
- **Newsletter** : pas encore de formulaire.

## Variables d'environnement Vercel

À déclarer sur Production, Preview et Development :

- `NEXT_PUBLIC_NICHE` = `readyscore`
- `NEXT_PUBLIC_GA_ID` = `G-6WW78QXRLW`

Sans `NEXT_PUBLIC_NICHE`, la niche tombe sur le repli de `config/registry.ts`.

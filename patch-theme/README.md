# patch-theme — thème kaki clair

Bascule le site du fond sombre vers le kaki clair validé dans
`Home-Secure - Editorial.dc.html`.

## Appliquer

Depuis la racine du repo :

```powershell
powershell -ExecutionPolicy Bypass -File .\patch-theme\apply.ps1
```

Le script crée la branche `theme-kaki`, copie les fichiers, lance `typecheck`
puis `build`, supprime `patch-theme\` et commite. En cas de doute :
`git checkout main` et rien n'est perdu.

## Contenu

L'arborescence de ce dossier est celle du repo — chaque fichier va à sa place
sans table de correspondance.

| Fichier | Ce qui change |
| --- | --- |
| `app/globals.css` | Palette de secours en kaki clair, camouflage en trois tons sable (paliers 0.74–0.94 au lieu de 0.05–0.15), voile allégé à un tiers d'opacité, deux classes `.editorial-shot` pour remonter les visuels tirés en clé sombre. |
| `config/niches/readyscore/site.ts` | Rampe `branding.colors` basculée vers le clair : `50 #e6e1d1` en fond, `100 #f1ede1` pour les cartes, `950 #1b1e21` pour le texte fort, accent `600 #0E7C6E` (turquoise assombri pour tenir le contraste sur fond clair). |

`tailwind.config.ts` n'est pas touché : les couleurs de marque pointent déjà
vers les custom properties, seule leur valeur bascule.

## Visuels

Les onze visuels de `public/images/` sont tirés en clé sombre. Sur fond clair
ils demandent la classe `editorial-shot`, et `editorial-shot--dark` pour les
trois plus sombres (`08-strike-plate.png`, `10-patio-door.png`,
`11-garage-door.png`). Pour s'en passer, régénérer ces trois prises avec les
prompts éclaircis de `tools/image-prompts.csv` :

```powershell
node tools/generate-images.mjs --only ed-guide-n1 --force
```

## Nuances turquoise par catégorie

Sur fond clair, les quatre nuances de catégorie deviennent :
Périmètre `#1F7E8C`, Détection `#0E7C6E`, Réponse `#147F60`,
Résilience `#2C6C8B`.

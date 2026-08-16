# patch-articles — Home-Secure, le site complet

Deuxième volet, à appliquer **après** `patch-editorial`. Il ajoute ce qui
manquait pour publier : les hubs de catégorie, un gabarit d'article avec
graphiques, la bibliothèque, et l'évaluation chiffrée avec résultats imagés.
Plus aucun `href="#"` de navigation dans le site.

## Appliquer

```powershell
powershell -ExecutionPolicy Bypass -File .\patch-articles\apply.ps1
git checkout main
git merge editorial-articles
git push
```

Le script vérifie que `content\editorial.ts` existe (donc que `patch-editorial`
est passé), crée la branche `editorial-articles`, copie, `typecheck`, `build`,
puis commite.

## Ce qui arrive

| Route | Contenu |
| --- | --- |
| `/` | Home inchangée dans sa forme. Les liens pointent maintenant sur de vrais articles, « All articles » sur `/library`, le CTA sur `/assessment`. |
| `/perimeter` `/detection` `/response` `/resilience` | Hub de catégorie : une illustrée, la liste du reste, encart d'évaluation contextualisé. |
| `/<category>/<slug>` | Gabarit d'article : entête avec chiffres clés, corps en blocs, colonne latérale, « Read next ». |
| `/library` | Les articles, groupés par couche. |
| `/assessment` | Les sept questions puis le résultat chiffré. |
| `/sitemap.xml` | Dérivé du registre. |

## Les quatre articles livrés

Un par couche, complets, avec données et graphiques :

1. **Detection** — `outdoor-cameras-that-record-offline` : comparatif de 18
   caméras. Barres (heures de vidéo exploitable après coupure), nuage de points
   prix/score avec tendance, tableau 7 lignes, trois recommandations avec liens
   affiliés, méthodologie.
2. **Perimeter** — `reinforce-a-sliding-patio-door` : guide en cinq étapes.
   Comparaison avant/après (12 s → 4 min 10 s), deux produits.
3. **Response** — `security-apps-when-you-lose-signal` : comparatif de six
   applications. Barres (secondes jusqu'à un humain), tableau, deux
   recommandations.
4. **Resilience** — `where-burglars-actually-enter` : 4 412 rapports de police.
   Barres (points d'entrée), comparaison dépense/risque, quatre actions.

## Le corps d'article est une liste de blocs

`content/articles.ts` décrit chaque article par un tableau de blocs typés —
`p`, `h2`, `bars`, `scatter`, `split`, `table`, `pick`, `callout`, `steps`,
`quiz`, `method`. `components/article/ArticleBody.tsx` les rend et numérote les
figures automatiquement (Fig. A, Fig. B…).

C'est ce qui rend le passage au MDX indolore : le frontmatter deviendra
`ArticleMeta`, et le corps MDX produira les mêmes blocs via des composants
(`<Bars>`, `<Scatter>`, `<Pick>`). Les composants graphiques n'auront pas à
changer. Pour écrire l'article 5, il suffit d'ajouter un objet au tableau — la
home, le hub, la bibliothèque et le sitemap le reprennent seuls.

## Graphiques

`components/charts/` : `Figure` (cadre commun, légende, note de méthode),
`Bars`, `Scatter`, `Split`, `Gauge`, `Histogram`. Tous en SVG ou en div, rendus
côté serveur, sans dépendance et lisibles à l'impression.

## L'évaluation

`/assessment` est un composant client autonome. `app/quiz` — le tunnel générique
de ReadyScore — **n'est pas touché** : le barème sécurité domestique est propre à
la niche et vit dans `content/assessment.ts` (questions, pondérations par couche,
correctifs, distribution des index).

Le résultat rend : jauge 0–100, bandeau selon quatre paliers, Fig. A (score par
couche avec marqueur de médiane), Fig. B (position dans les 41 200 foyers et
percentile), puis les trois correctifs classés par gain d'index par dollar, avec
produit affilié et lien vers l'article correspondant. Rien ne sort du navigateur
tant que le lecteur ne demande pas le rapport.

## Ce qui reste après ce patch

- **Articles 5 à 300** : ajouter des objets au registre, ou basculer sur MDX.
- **Newsletter** : le formulaire de rapport est présent mais n'envoie rien —
  brancher un fournisseur (`onSubmit` dans `Assessment.tsx`).
- **Liens affiliés** : tous les `href` produits sont à `"#"`. Remplacer par les
  tags Amazon dans `content/articles.ts` et `content/assessment.ts`.
- **Visuels d'article** : sept prises sur onze sont utilisées. Les articles 3 et
  4 réutilisent leur image de une, sans visuel produit.
- **Emplacements display** : `EDITORIAL.showAdSlots` toujours à `false`.
- **`NEXT_PUBLIC_SITE_URL`** : à déclarer sur Vercel pour que le sitemap sorte
  sur le bon domaine.

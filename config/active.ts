// Single switch to change which niche is live. To replicate this site for a
// new niche: duplicate config/niches/<name>/, then point these 5 exports at
// it. Nothing else in the app needs to change.
export * from "./niches/readyscore/site";
export * from "./niches/readyscore/quiz";
export * from "./niches/readyscore/products";
export * from "./niches/readyscore/scoring";
export * from "./niches/readyscore/content";

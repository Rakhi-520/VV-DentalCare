

const files = import.meta.glob(
  "/src/assets/images/Before & Afrter/*.{webp,jpg,jpeg,png}",
  { eager: true, query: "?url", import: "default" }
);

// Extract the numeric part of the filename, sort 1..N
const numbered = [];
for (const [path, url] of Object.entries(files)) {
  const m = path.match(/(\d+)\.(webp|jpe?g|png)$/i);
  if (m) numbered.push({ n: Number(m[1]), url });
}
numbered.sort((a, b) => a.n - b.n);

// Create one case per image (8 total)
export const cases = numbered.map(({ url }, idx) => ({
  id: `case_${String(idx + 1).padStart(2, "0")}`,
  title: `Smile Makeover ${idx + 1}`,
  procedure: "Cosmetic Dentistry",
  blurb: "",
  beforeSrc: url,     
  afterSrc: null,    
  altBefore: `Case ${idx + 1}`,
  altAfter: "",
  category: "BeforeAfter",
  consent: true,
  date: null,
}));

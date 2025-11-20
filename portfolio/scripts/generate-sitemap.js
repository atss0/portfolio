import fs from "fs"
import path from "path"

// Sitenizin URL'si
const SITE_URL = "https://yourportfolio.com"

// Sitemap oluşturma fonksiyonu
function generateSitemap() {
  const pages = ["", "/about", "/experience", "/projects", "/contact"]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>
  `
    })
    .join("")}
</urlset>
`

  // public klasörüne sitemap.xml dosyasını yaz
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap)
  console.log("Sitemap generated successfully!")
}

generateSitemap()

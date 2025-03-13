export async function GET() {
    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
  User-agent: *
  Allow: /
  
  # Sitemaps
  Sitemap: https://oussamamahi.me/sitemap.xml
  `
  
    return new Response(robotsTxt, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
  
  
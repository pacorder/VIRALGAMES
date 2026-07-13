import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Dynamic Sitemap Generator using the current visiting domain
app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host') || 'recreo-juegos.com';
  const protocol = (host.includes('localhost') || host.includes('127.0.0.1')) ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const pages = [
    { loc: '', changefreq: 'weekly', priority: '1.0' },
    { loc: '2048', changefreq: 'monthly', priority: '0.8' },
    { loc: 'APNEA', changefreq: 'monthly', priority: '0.8' },
    { loc: 'INHALAEXAHALA', changefreq: 'monthly', priority: '0.8' },
    { loc: 'ahorcado', changefreq: 'monthly', priority: '0.8' },
    { loc: 'contacto', changefreq: 'monthly', priority: '0.5' },
    { loc: 'cookies', changefreq: 'yearly', priority: '0.3' },
    { loc: 'cube-dash', changefreq: 'monthly', priority: '0.8' },
    { loc: 'luces-apagadas', changefreq: 'monthly', priority: '0.8' },
    { loc: 'neon-racer', changefreq: 'monthly', priority: '0.8' },
    { loc: 'nonograma', changefreq: 'monthly', priority: '0.8' },
    { loc: 'pong-tron', changefreq: 'monthly', priority: '0.8' },
    { loc: 'privacidad', changefreq: 'yearly', priority: '0.3' },
    { loc: 'puzzle-15', changefreq: 'monthly', priority: '0.8' },
    { loc: 'simon', changefreq: 'monthly', priority: '0.8' },
    { loc: 'sobre-nosotros', changefreq: 'monthly', priority: '0.6' },
    { loc: 'sudoku', changefreq: 'monthly', priority: '0.8' },
    { loc: 'terminos', changefreq: 'yearly', priority: '0.3' },
    { loc: 'torres-hanoi', changefreq: 'monthly', priority: '0.8' },
    { loc: 'tron-jump', changefreq: 'monthly', priority: '0.8' },
    { loc: 'wordle', changefreq: 'monthly', priority: '0.8' }
  ];

  const lastmod = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(p => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/${p.loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Serve static files from the root directory
// Automatically resolves .html extensions if omitted (e.g., /sudoku resolves to /sudoku.html)
app.use(express.static(path.join(process.cwd()), {
  extensions: ['html', 'htm']
}));

// Route fallback for 404/fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

export default app;

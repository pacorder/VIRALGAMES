import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

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

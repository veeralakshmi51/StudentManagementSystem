const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for API calls
app.use(cors());

// Serve static files from the Angular dist folder
app.use(express.static(path.join(__dirname, 'dist/httpclient')));

// Catch-all route for Angular SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/httpclient/index.html'));
});

// Use the Render-provided port or fallback to 8080 locally
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

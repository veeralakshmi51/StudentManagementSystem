// const express = require('express');
// const path = require('path');
// const jsonServer = require('json-server');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// // Port from environment variable (Render will set this)
// const PORT = process.env.PORT || 8080;

// // JSON Server setup
// const apiServer = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// apiServer.use(middlewares);
// apiServer.use(router);

// // Serve Angular build files
// app.use(express.static(path.join(__dirname, 'dist/httpclient')));

// // API routes go through JSON Server
// app.use('/api', apiServer);

// // For any other route, send back Angular's index.html
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/httpclient/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

// Enable CORS
app.use(cors());

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/httpclient')));

// Example JSON server API (if needed)
const jsonServer = require('json-server');
const apiServer = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
apiServer.use(middlewares);
apiServer.use(router);
app.use('/api', apiServer);

// For Angular routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/httpclient/index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

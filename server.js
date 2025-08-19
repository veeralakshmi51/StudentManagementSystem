const express = require("express");
const path = require("path");
const jsonServer = require("json-server");

const app = express();
const PORT = process.env.PORT || 10000;

// ============================
// Serve Angular build (Angular 16 -> dist/httpclient)
// ============================
app.use(express.static(path.join(__dirname, "dist/httpclient")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/httpclient/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/httpclient/index.html"));
});

// ============================
// JSON Server setup
// ============================
const apiServer = jsonServer.create();
const router = jsonServer.router("db.json"); // Make sure db.json is in root folder
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
apiServer.use(router);

// Mount JSON server under /api
app.use("/api", apiServer);

// ============================
// Start server
// ============================
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

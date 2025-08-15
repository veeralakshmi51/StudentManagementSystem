const express = require('express');
const path = require('path');
const jsonServer = require('json-server');


const cors = require('cors');
app.use(cors());

const app = express();
const PORT = process.env.PORT || 8080;

const apiServer = jsonServer.create();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();
apiServer.use(middlewares);
apiServer.use(router);

app.use(express.static(path.join(__dirname, 'dist/httpclient')));

app.use('/api', apiServer);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/httpclient/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

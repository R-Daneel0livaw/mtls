import fs from 'fs';
import https from 'https';
import express from 'express';

const app = express();

const options = {
  key: fs.readFileSync('src/server.key'),
  cert: fs.readFileSync('src/server.crt'),
  ca: fs.readFileSync('src/ca.pem'),
  // cert: fs.readFileSync('server-chain.crt'),
  // ca: fs.readFileSync('rootCA.pem'),
  requestCert: true,
  rejectUnauthorized: true,
};

app.get('/', (req, res) => {
  if (req.client.authorized) {
    res.send('Hello, mutual TLS client!');
  } else {
    res.status(401).send('Client certificate required.');
  }
});

https.createServer(options, app).listen(3000, () => {
  console.log('Server is listening on port 3000');
});

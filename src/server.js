import fs from 'fs';
import https from 'https';
import express from 'express';

export function startServer({ port, serverCert, serverKey, caCerts, scenario }) {
  const app = express();

  const certPath = `./certs/scenario${scenario}/${serverCert}`;
  const keyPath = `./certs/scenario${scenario}/${serverKey}`;
  const caPaths = caCerts.map(cert => `./certs/scenario${scenario}/${cert}`);

  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    ca: caPaths.map(certPath => fs.readFileSync(certPath)), 
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

  const server = https.createServer(options, app).listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  
  return server;
}
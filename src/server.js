import fs from 'fs';
import https from 'https';
import express from 'express';

export function startServer({ port, serverCert, serverKey, caCerts, scenario }) {
  const app = express();

  const certPath = `./certs/scenario${scenario}/${serverCert}`;
  const keyPath = `./certs/scenario${scenario}/${serverKey}`;
  const caPaths = caCerts.map(ca => `./certs/scenario${scenario}/${ca}`);

  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    ca: caPaths.map(ca => fs.readFileSync(ca)), 
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

  server.on('tlsClientError', (err, socket) => {
    socket.destroy(err);
  });
  
  return server;
}
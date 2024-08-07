import fs from 'fs';
import https from 'https';

export function makeRequest({ host, port, path, clientCert, clientKey, caCerts, scenario }) {
  const certPath = `./certs/scenario${scenario}/${clientCert}`;
  const keyPath = `./certs/scenario${scenario}/${clientKey}`;
  const caPaths = caCerts.map(cert => `./certs/scenario${scenario}/${cert}`);

  const options = {
    hostname: host,
    port: port,
    path: path,
    method: 'GET',
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    ca: caPaths.map(certPath => fs.readFileSync(certPath)),
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response:', data);
    });
  });

  req.on('error', (e) => {
    console.error('Error:', e);
  });

  req.end();
}
import fs from 'fs';
import https from 'https';

export function makeRequest({ host, port, path, clientCert, clientKey, caCerts, scenario }) {
  return new Promise((resolve, reject) => {
    const certPath = `./certs/scenario${scenario}/${clientCert}`;
    const keyPath = `./certs/scenario${scenario}/${clientKey}`;
    const caPaths = caCerts.map(ca => `./certs/scenario${scenario}/${ca}`);

    const options = {
      hostname: host,
      port: port,
      path: path,
      method: 'GET',
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
      ca: caPaths.map(ca => fs.readFileSync(ca)),
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, message: data });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

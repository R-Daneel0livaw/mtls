import fs from 'fs';
import https from 'https';

export function makeRequest({ host, port, path, clientCert, clientKey, caCerts, scenario }) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: port,
      path: path,
      method: 'GET',
    };

    if (clientCert) {
      const certPath = `./certs/scenario${scenario}/${clientCert}`;
      options.cert = fs.readFileSync(certPath);
    }

    if (clientKey) {
      const keyPath = `./certs/scenario${scenario}/${clientKey}`;
      options.key = fs.readFileSync(keyPath);
    }

    if (caCerts && caCerts.length > 0) {
      const caPaths = caCerts.map(ca => `./certs/scenario${scenario}/${ca}`);
      options.ca = caPaths.map(ca => fs.readFileSync(ca));
    }

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

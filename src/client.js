import fs from 'fs';
import https from 'https';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('src/client.key'),
  cert: fs.readFileSync('src/client.crt'),
  ca: fs.readFileSync('src/ca.pem'),
  // ca: fs.readFileSync('rootCA.pem'),
  rejectUnauthorized: true,
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
  console.error(e);
});

req.end();

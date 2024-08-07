import { makeRequest } from './client.js';
import { startServer } from './server.js';

function performRequest(serverConfig, requestConfig) {
  const server = startServer(serverConfig);

  makeRequest(requestConfig)

  setTimeout(() => {
    server.close(() => {
      console.log('Server has been closed.');
    });
  }, 1000); 
}

const serverConfig = {
  port: 8443,
  serverCert: 'server.crt',
  serverKey: 'server.key',
  caCerts: ['ca.pem'],
  scenario: 1
}

const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    clientCert: 'client.crt',
    clientKey: 'client.key',
    caCerts: ['ca.pem'],
    scenario: 1
}

performRequest(serverConfig, requestConfig);


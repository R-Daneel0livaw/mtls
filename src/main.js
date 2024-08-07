import { makeRequest } from './client.js';
import { startServer } from './server.js';

export function performRequest(serverConfig, requestConfig) {
  return new Promise((resolve, reject) => {
    const server = startServer(serverConfig);

    setTimeout(() => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Server has been closed.');
          resolve();
        }
      });
    }, 2000); 

    makeRequest(requestConfig);
  });
}

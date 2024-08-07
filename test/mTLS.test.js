import { expect } from 'chai';
import { performRequest } from '../src/main.js';

describe('performRequest Function Test', function () {
  this.timeout(5000);

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

  it('should receive the expected mTLS message and status for client and server cert with common root', function(done) {
    performRequest(serverConfig, requestConfig).then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.message).to.equal('Hello, mutual TLS client!');
      done();
    }).catch(done);
  });
});

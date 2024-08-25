import { expect } from 'chai';
import { performRequest } from '../src/main.js';

describe('mTLS Tests', function () {
  this.timeout(5000);

  it('should successfully connect via mTLS due to expected client and server certs with root in trust', function (done) {
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

    performRequest(serverConfig, requestConfig).then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.message).to.equal('Hello, mutual TLS client!');
      done();
    }).catch(done);
  });

  it('should successfully connect vis mTLS due to expected client, server and intermediate certs with root in trust', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server-chain.crt',
      serverKey: 'server.key',
      caCerts: ['rootCA.pem'],
      scenario: 2
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client-chain.crt',
      clientKey: 'client.key',
      caCerts: ['rootCA.pem'],
      scenario: 2
    }

    performRequest(serverConfig, requestConfig).then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.message).to.equal('Hello, mutual TLS client!');
      done();
    }).catch(done);
  });

  it('should fail to successfully connect via mTLS due to expected intermediate certificate not being provided via client', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server-chain.crt',
      serverKey: 'server.key',
      caCerts: ['rootCA.pem'],
      scenario: 3
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client.crt',
      clientKey: 'client.key',
      caCerts: ['rootCA.pem'],
      scenario: 3
    }

    performRequest(serverConfig, requestConfig).then(() => {
      done(new Error('Expected request to fail, but it succeeded.'));
    }).catch(err => {
      expect(err).to.be.an('error');
      expect(err.code).to.equal('ECONNRESET');
      expect(err.message).to.equal('socket hang up'); 
      done(); 
    });
  });

  it('should fail to successfully connect via mTLS due to expected intermediate certificate not being provided via server', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server.crt',
      serverKey: 'server.key',
      caCerts: ['rootCA.pem'],
      scenario: 4
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client-chain.crt',
      clientKey: 'client.key',
      caCerts: ['rootCA.pem'],
      scenario: 4
    }

    performRequest(serverConfig, requestConfig).then(() => {
      done(new Error('Expected request to fail, but it succeeded.'));
    }).catch(err => {
      expect(err).to.be.an('error');
      expect(err.code).to.equal('UNABLE_TO_VERIFY_LEAF_SIGNATURE');
      expect(err.message).to.equal('unable to verify the first certificate'); 
      done(); 
    });
  });

  it('should successfully connect via mTLS due to expected client and server certs with intermediate and root in trust', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server.crt',
      serverKey: 'server.key',
      caCerts: ['intermediateCA.pem', 'rootCA.pem'],
      scenario: 5
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client.crt',
      clientKey: 'client.key',
      caCerts: ['intermediateCA.pem', 'rootCA.pem'],
      scenario: 5
    }
    
    performRequest(serverConfig, requestConfig).then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.message).to.equal('Hello, mutual TLS client!');
      done();
    }).catch(done);
  });

  it('should fail to successfully connect via mTLS due to expected root certificate not being present in server trust', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server.crt',
      serverKey: 'server.key',
      caCerts: ['intermediateCA.pem'],
      scenario: 6
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client.crt',
      clientKey: 'client.key',
      caCerts: ['intermediateCA.pem', 'rootCA.pem'],
      scenario: 6
    }

    performRequest(serverConfig, requestConfig).then(() => {
      done(new Error('Expected request to fail, but it succeeded.'));
    }).catch(err => {
      expect(err).to.be.an('error');
      expect(err.code).to.equal('ECONNRESET');
      expect(err.message).to.equal('socket hang up'); 
      done(); 
    });
  });

  it('should fail to successfully connect via mTLS due to expected root certificate not being present in client trust', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server.crt',
      serverKey: 'server.key',
      caCerts: ['intermediateCA.pem', 'rootCA.pem'],
      scenario: 7
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client.crt',
      clientKey: 'client.key',
      caCerts: ['intermediateCA.pem'],
      scenario: 7
    }

    performRequest(serverConfig, requestConfig).then(() => {
      done(new Error('Expected request to fail, but it succeeded.'));
    }).catch(err => {
      expect(err).to.be.an('error');
      expect(err.code).to.equal('UNABLE_TO_GET_ISSUER_CERT');
      expect(err.message).to.equal('unable to get issuer certificate'); 
      done(); 
    });
  });

  it('should successfully connect via mTLS due to expected client and server certs despite redundant intermediate and root in chain', function (done) {
    const serverConfig = {
      port: 8443,
      serverCert: 'server.crt',
      serverKey: 'server.key',
      caCerts: ['intermediateCA.pem', 'rootCA.pem'],
      scenario: 8
    }

    const requestConfig = {
      host: 'localhost',
      port: 8443,
      path: '/',
      clientCert: 'client-chain.crt',
      clientKey: 'client.key',
      caCerts: ['intermediateCA.pem', 'rootCA.pem'],
      scenario: 8
    }

    performRequest(serverConfig, requestConfig).then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.message).to.equal('Hello, mutual TLS client!');
      done();
    }).catch(done);
  });
});

it('should fail to successfully connect via mTLS due to client cert not being provided via the client', function (done) {
  const serverConfig = {
    port: 8443,
    serverCert: 'server.crt',
    serverKey: 'server.key',
    caCerts: ['intermediateCA.pem', 'rootCA.pem'],
    scenario: 9
  }

  const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    caCerts: ['intermediateCA.pem', 'rootCA.pem'],
    scenario: 9
  }

  performRequest(serverConfig, requestConfig).then(() => {
    done(new Error('Expected request to fail, but it succeeded.'));
  }).catch(err => {
    expect(err).to.be.an('error');
    expect(err.code).to.equal('ERR_SSL_TLSV13_ALERT_CERTIFICATE_REQUIRED');
    expect(err.reason).to.equal('tlsv13 alert certificate required');
    done();
  });
});

it('should fail to successfully connect via mTLS due to server cert not being provided via the server', function (done) {
  const serverConfig = {
    port: 8443,
    caCerts: ['intermediateCA.pem', 'rootCA.pem'],
    scenario: 10
  }

  const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    clientCert: 'client.crt',
    clientKey: 'client.key',
    caCerts: ['intermediateCA.pem', 'rootCA.pem'],
    scenario: 10
  }

  performRequest(serverConfig, requestConfig).then(() => {
    done(new Error('Expected request to fail, but it succeeded.'));
  }).catch(err => {
    expect(err).to.be.an('error');
    expect(err.code).to.equal('EPROTO');
    expect(err.message).to.contain('SSL');
    done();
  });
});

it('should fail to successfully connect via mTLS due to trust store certs not being present in client', function (done) {
  const serverConfig = {
    port: 8443,
    serverCert: 'server.crt',
    serverKey: 'server.key',
    caCerts: ['intermediateCA.pem', 'rootCA.pem'],
    scenario: 11
  }

  const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    clientCert: 'client.crt',
    clientKey: 'client.key',
    scenario: 11
  }

  performRequest(serverConfig, requestConfig).then(() => {
    done(new Error('Expected request to fail, but it succeeded.'));
  }).catch(err => {
    expect(err).to.be.an('error');
    expect(err.code).to.equal('SELF_SIGNED_CERT_IN_CHAIN');
    expect(err.message).to.equal('self-signed certificate in certificate chain');
    done();
  });
});

it('should fail to successfully connect via mTLS due to trust store certs not being present in server', function (done) {
  const serverConfig = {
    port: 8443,
    serverCert: 'server.crt',
    serverKey: 'server.key',
    scenario: 12
  }

  const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    clientCert: 'client.crt',
    clientKey: 'client.key',
    caCerts: ['intermediateCA.pem', 'rootCA.pem'],
    scenario: 12
  }

  performRequest(serverConfig, requestConfig).then(() => {
    done(new Error('Expected request to fail, but it succeeded.'));
  }).catch(err => {
    expect(err).to.be.an('error');
    expect(err.code).to.equal('ECONNRESET');
    expect(err.message).to.equal('socket hang up');
    done();
  });
});

it('should fail to successfully connect via mTLS due to expired client certificate', function (done) {
  const serverConfig = {
    port: 8443,
    serverCert: 'server.crt',
    serverKey: 'server.key',
    caCerts: ['ca.pem'],
    scenario: 13
  }

  const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    clientCert: 'client.crt',
    clientKey: 'client.key',
    caCerts: ['ca.pem'],
    scenario: 13
  }


  performRequest(serverConfig, requestConfig).then(() => {
    done(new Error('Expected request to fail, but it succeeded.'));
  }).catch(err => {
    expect(err).to.be.an('error');
    expect(err.code).to.equal('CERT_HAS_EXPIRED');
    expect(err.message).to.equal('certificate has expired');
    done();
  });
});

it('should fail to successfully connect via mTLS due to expired server certificate', function (done) {
  const serverConfig = {
    port: 8443,
    serverCert: 'server.crt',
    serverKey: 'server.key',
    caCerts: ['ca.pem'],
    scenario: 14
  }

  const requestConfig = {
    host: 'localhost',
    port: 8443,
    path: '/',
    clientCert: 'client.crt',
    clientKey: 'client.key',
    caCerts: ['ca.pem'],
    scenario: 14
  }

  performRequest(serverConfig, requestConfig).then(() => {
    done(new Error('Expected request to fail, but it succeeded.'));
  }).catch(err => {
    expect(err).to.be.an('error');
    expect(err.code).to.equal('ECONNRESET');
    expect(err.message).to.equal('socket hang up');
    done();
  });
});

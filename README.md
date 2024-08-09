# mTLS
Testing of TLS and mTLS Functionality

## Prerequisites

Create a top-level certs directory and a scenario# directory within it for each test case.

## Scenario 1

Generate scenaro1 directory.

```bash

cd certs
mkdir scenario1
cd scenario1

```

Generate certificates.

```bash

# Generate CA key and certificate

openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=example.com"

# Generate server key and CSR

openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Sign server certificate with CA

openssl x509 -req -in server.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256

# Generate client key and CSR

openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=client"

# Sign client certificate with CA

openssl x509 -req -in client.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256

```


## Scenario 2


## Scenario 3
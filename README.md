# mTLS
Testing of TLS and mTLS Functionality

## Prerequisites

Create a top-level `certs` directory and a scenario# directory within it for each test case as the below instructions detail.

## Scenario 1

Generate scenario1 directory.

```bash

cd certs
mkdir scenario1
cd scenario1

```

Generate root, server and client certificates.

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

Generate scenario2 directory.

```bash

cd certs
mkdir scenario2
cd scenario2

```

Generate root, intermediate, server and client certificates.

```bash

# Generate CA key and certificate

openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 365 -out rootCA.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=RootCA" -config openssl-custom.cnf -extensions v3_ca


# Generate Intermediate CA certificate

openssl genrsa -out intermediateCA.key 2048
openssl req -new -key intermediateCA.key -out intermediateCA.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=IntermediateCA"
openssl x509 -req -in intermediateCA.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out intermediateCA.pem -days 365 -sha256 -extensions v3_ca -extfile openssl-custom.cnf


# Generate Server certificate

openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
openssl x509 -req -in server.csr -CA intermediateCA.pem -CAkey intermediateCA.key -CAcreateserial -out server.crt -days 365 -sha256 -extensions v3_server -extfile openssl-custom.cnf


# Generate Client certificate

openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=client"
openssl x509 -req -in client.csr -CA intermediateCA.pem -CAkey intermediateCA.key -CAcreateserial -out client.crt -days 365 -sha256 -extensions v3_client -extfile openssl-custom.cnf



```


## Scenario 3
# mTLS
Testing of TLS and mTLS Functionality

## Prerequisites

1. Create (if non-existent) a top-level `certs` directory and a scenario# directory within it for each test case as the below instructions detail.
2. Ensure `openssl-custom.cnf` exists within the `certs` and update as required.

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


# Combine leaf and intermediate certificates into a chain

cat server.crt intermediateCA.pem > server-chain.crt
cat client.crt intermediateCA.pem > client-chain.crt

```


## Scenario 3

Generate scenario3 directory.

```bash

cd certs
mkdir scenario3
cd scenario3

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


# Combine leaf and intermediate certificates into a chain

cat server.crt intermediateCA.pem > server-chain.crt
cat client.crt intermediateCA.pem > client-chain.crt

```


## Scenario 4

Generate scenario4 directory.

```bash

cd certs
mkdir scenario4
cd scenario4

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


# Combine leaf and intermediate certificates into a chain

cat server.crt intermediateCA.pem > server-chain.crt
cat client.crt intermediateCA.pem > client-chain.crt

```


## Scenario 5

Generate scenario5 directory.

```bash

cd certs
mkdir scenario5
cd scenario5

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


## Scenario 6

Generate scenario6 directory.

```bash

cd certs
mkdir scenario6
cd scenario6

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


## Scenario 7

Generate scenario7 directory.

```bash

cd certs
mkdir scenario7
cd scenario7

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


## Scenario 8

Generate scenario8 directory.

```bash

cd certs
mkdir scenario8
cd scenario8

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


# Combine leaf, intermediate and root certificates into a chain

cat client.crt intermediateCA.pem rootCA.pem > client-chain.crt

```


## Scenario 9

Generate scenario9 directory.

```bash

cd certs
mkdir scenario9
cd scenario9

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


## Scenario 10

Generate scenario10 directory.

```bash

cd certs
mkdir scenario10
cd scenario10

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
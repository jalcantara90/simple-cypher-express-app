const express = require('express');
const crypto = require('node:crypto');
const bodyParser = require('body-parser');

const algorithm = 'aes-256-cbc';
const INIT_VECTOR_KEY = 'P2B0rTWYuncCncBx';
const ENCRYPTED_KEY = 'JxfmVQ8Ejn9ilVUL4cnDCEfDcTg0U3vB';

const app = express();

app.use(bodyParser.json());

const port = 4202;

app.post('/encrypt', (req, res) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTED_KEY, 'utf-8'),
    Buffer.from(INIT_VECTOR_KEY, 'utf-8')
  );

  let encrypted = cipher.update(JSON.stringify(req.body), 'utf-8', 'base64');

  encrypted += cipher.final('base64');

  console.log('Encrypted message: ' + encrypted);

  res.send({ encrypted });
});

app.post('/decrypt', (req, res) => {
  const { toBeDecrypted } = req.body;

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(ENCRYPTED_KEY, 'utf-8'),
    Buffer.from(INIT_VECTOR_KEY, 'utf-8')
  );

  let decrypted = decipher.update(toBeDecrypted, 'base64', 'utf-8');

  decrypted += decipher.final('utf8');

  res.send(decrypted);
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});

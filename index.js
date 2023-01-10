const express = require('express');
const crypto = require('node:crypto');
const bodyParser = require('body-parser');

const algorithm = 'aes-256-cbc';
const INIT_VECTOR_KEY = crypto.randomBytes(16);
const ENCRYPTED_KEY = crypto.randomBytes(32);

const app = express();

app.use(bodyParser.json());

const port = 4202;

app.post('/encrypt', (req, res) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    ENCRYPTED_KEY,
    INIT_VECTOR_KEY
  );

  let encrypted = cipher.update(JSON.stringify(req.body), 'utf-8', 'hex');

  encrypted += cipher.final('hex');

  console.log('Encrypted message: ' + encrypted);

  res.send({ encrypted });
});

app.post('/decrypt', (req, res) => {
  const { toBeDecrypted } = req.body;

  const decipher = crypto.createDecipheriv(
    algorithm,
    ENCRYPTED_KEY,
    INIT_VECTOR_KEY
  );

  let decrypted = decipher.update(toBeDecrypted, 'hex', 'utf-8');

  decrypted += decipher.final('utf8');

  res.send(decrypted);
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});

# Install dependencies
```bash
 yarn
```
or 
```bash
npm install
```

# Run server 
```bash
yarn start
```
or
```bash
npm start
```
> When we run this command we will run the server in PORT 4202

## Endpoints
In this sample application are two endpoints, /encrypt and /decrypt, both are post methods.

### /encrypt
As body of the post http call we can send any object and the response is the encrypted object as hex string.
> example http POST /decrypt body:
```json
{
   "property": "with data",
   "nestedProperty": {
     "key": "value"
   }
}
```
> response 

```json
{
  "encrypted": "242b312efd8879f3c354137a5d253517475b066eff43e2bee0a106ec1ea4de271b74db34057620c420be79401365494aca514e924dcd2fe84120700d1140f42d"
}
```

### /decrypt
Send the encrypted hex string as an object with the property toBeDecrypted
> example http POST /decrypt body:

```json
{
    "toBeDecrypted": "242b312efd8879f3c354137a5d253517475b066eff43e2bee0a106ec1ea4de271b74db34057620c420be79401365494aca514e924dcd2fe84120700d1140f42d"
}
```

> response

```json
{
   "property": "with data",
   "nestedProperty": {
     "key": "value"
   }
}
```
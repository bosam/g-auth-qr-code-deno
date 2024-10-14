# Google Authenticator QR Code Regen
Regenerate QR Codes from google authenticator database app to be easily re-imported in other 2FA apps.

It is a simple fun project used to discover and play with Deno and Vno.

![deno version](https://img.shields.io/badge/deno-^2-lightgrey?logo=deno)

## Note

This version is compatible with deno 2.x.
A legacy branch `deno-1-legacy` is available for deno 1.x.

## Dependencies
- [vno](https://github.com/open-source-labs/vno)

## Requirement

This project requires your own `databases` file located under
```
/data/data/com.google.android.apps.authenticator2/databases/
```
It is **NOT** possible to acquire this file unless your phone is **rooted**.

## Getting started

```bash
$ denox run start
```

This will run 2 servers listening on `.env` port parameters.

Client is accessible on: **localhost:90** by default

API server is accessible on: **localhost:3000** by default
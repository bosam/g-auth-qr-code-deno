# Google Authenticator QR Code Regen
Regenerate QR Codes from google authenticator database app to be easily re-imported in other 2FA apps.

It is a simple fun project used to discover and play with Deno and Vno.

![deno version](https://img.shields.io/badge/deno-^1.13.1-lightgrey?logo=deno)

## Dependencies
- [vno](https://github.com/open-source-labs/vno)
- [denox](https://github.com/BentoumiTech/denox)
- [Dotenv](https://github.com/pietvanzoen/deno-dotenv)

## Requirement

This project requires your own `databases` file located under
```
/data/data/com.google.android.apps.authenticator2/databases/
```
It is **NOT** possible to acquire this file unless your phone is **rooted**.

## Getting started

You need to install [denox](https://github.com/BentoumiTech/denox) first and run

```bash
$ denox run start
```

This will run 2 servers listening on `.env` port parameters.

Client is accessible on: **localhost:90** by default

API server is accessible on: **localhost:3000** by default
# Online Log Service

This project provides a simple way to log messages to a remote server. It is intended to be used in a development environment where you want to log messages from your application to a remote server. But you don't want to setup a full blown logging system like logstash or graylog.

It is not recommended to use this in a production environment, as it does not provide some key feature like authentication, encryption, timestamp, or tracing. All depends on you.

## Run without setup

This project has a public deployment at [Cloudflare Workers](https://log.kj415j45.space/). API document can be found at [openapi.json](./openapi.json).

Notes: Official deployment is not guaranteed to be available at all time. And configured with 1 day expiry cleaning up. It is recommended to setup your own deployment if you needed more reliability.

## Setup your own

At your Cloudflare account, create a new worker and a R3 storage.

Update the `wrangler.toml` file with your own configuration, the [example file](./wrangler.toml.example) could help you configure it.

Then you can deploy it with wrangler. Run `npm run deploy`. Check [wrangler's documents](https://developers.cloudflare.com/workers/wrangler/commands/#deploy) for more details.

## LICENSE

[MIT](./LICENSE)

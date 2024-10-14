import * as log from '@std/log';
import { Application } from '@oak/oak/application';
import { cors } from '@momiji/cors';
import router from './router.ts';

export const server = async function() {
    const serverHostname = Deno.env.get('SERVER_HOSTNAME') || '0.0.0.0';
    const serverPort = Deno.env.get('SERVER_PORT') || 8000;

    const app: Application = new Application();
    app.use(cors());
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.addEventListener('listen', ({secure, hostname, port}) => {
        const protocol = secure ? 'https://' : 'http://';
        const url = `${protocol}${hostname ?? 'localhost'}:${port}`;
        log.info(`Listening on: ${url}`);
    });
    await app.listen({
        hostname: serverHostname,
        port: +serverPort
    });
}
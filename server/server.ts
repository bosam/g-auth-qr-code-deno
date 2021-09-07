import { Application, Router, oakCors, log } from './deps.ts';
import router from './router.ts';
import { uploadService } from './services/uploadService.ts';

export const server = async function() {
    const serverHostname = Deno.env.get('SERVER_HOSTNAME') || '0.0.0.0';
    const serverPort = Deno.env.get('SERVER_PORT') || 8000;

    const app: Application = new Application();
    app.use(oakCors({ origin: '*' }));
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
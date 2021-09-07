import { Factory, path } from '../server/deps.ts';
import { Application, join, log, send } from './deps.ts';
import routes from './routes.ts';

const clientPort = Deno.env.get('CLIENT_PORT') || 3000;
const hostname = Deno.env.get('CLIENT_HOSTNAME') || '0.0.0.0';
const port: number = +clientPort;
const server: Application = new Application();

export const client = async function() {
  log.info('Running client build');
  Deno.chdir('./client');
  await Factory.create().build();

  log.info('Running client\'s server');
  try {
    server.use(async (ctx, next) => {
      const filePath = ctx.request.url.pathname;
      if (routes.includes(filePath)) {
        await send(ctx, '/', {
          root: join(Deno.cwd(), 'public'),
          index: 'index.html',
        });
      } else if (filePath === '/build.js') {
        ctx.response.type = 'application/javascript';
        await send(ctx, filePath, {
          root: join(Deno.cwd(), 'vno-build'),
          index: 'build.js',
        });
      } else if (filePath === '/style.css') {
        ctx.response.type = 'text/css';
        await send(ctx, filePath, {
          root: join(Deno.cwd(), 'vno-build'),
          index: 'style.css',
        });
      } else await next();
    });

    log.info('Server is up and running on http://' + hostname + ':' + port);
    await server.listen({
      hostname: hostname,
      port: port
    });
    Deno.exit(0);
  } catch (e) {
    log.error(e);
    Deno.exit(1);
  }
}

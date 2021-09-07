import 'https://deno.land/x/dotenv/load.ts'; // .env support
import { server } from './server/server.ts';
import { client } from './client/client.ts';

server();
client();
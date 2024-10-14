import '@std/dotenv/load'; // .env support
import { server } from './server/main.ts';
import { client } from './client/main.ts';

server();
client();
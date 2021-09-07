import { Router } from './deps.ts';
import type { Context } from './deps.ts';
import { uploadService } from './services/uploadService.ts';
import { databaseService } from './services/databaseService.ts';
import { qrcodeService } from './services/qrcodeService.ts';

const router = new Router();
router
    .get('/', (ctx: Context) => {
        ctx.response.body = 'API server is up and running!';
    })
    .post('/upload', async (ctx: Context) => await uploadService.upload(ctx))
    .get('/exists', async (ctx: Context) => await databaseService.exists(ctx))
    .get('/qr-list', async (ctx: Context) => await qrcodeService.generate(ctx))
;

export default router;
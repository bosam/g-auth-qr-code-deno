import type { Context } from '@oak/oak';
import { exists } from '@std/fs';

class Upload {
    async upload(ctx: Context): Promise<void> {
        if (!ctx.request.hasBody) {
            ctx.response.body = 'No body!';
            ctx.response.status = 404;

            return;
        }

        const result = ctx.request.body({ type: 'form-data' });
        const { files } = await result.value.read({ maxSize: 1000000000});
        if (!files ||
            0 === files.length ||
            !files[0].content) {
            ctx.response.body = 'Invalid file';
            ctx.response.status = 403;

            return;
        }

        const dirPath = '../dbs';
        if (! await exists(dirPath)) {
            await Deno.mkdirSync(dirPath);
        }

        const dbFile = dirPath+'/database.sqlite';
        await Deno.writeFileSync(dbFile, files[0].content);
        let body = 'nothing';
        if (await exists(dbFile)) {
            body = dbFile;
        }
        ctx.response.body = body;
        ctx.response.status = 200;
    }
}

export const uploadService = new Upload();
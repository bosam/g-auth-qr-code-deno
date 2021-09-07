import { Context, qrcode } from '../deps.ts';
import { Account, QRCode } from '../types.d.ts';
import { databaseService } from './databaseService.ts';

class QrcodeService {
    async generate(ctx: Context): Promise<void> {
        const accounts: Account[] = await databaseService.loadAccounts(ctx);

        if (0 === accounts.length) {
            ctx.response.status = 404;
            ctx.response.body = 'No accounts';

            return;
        }

        let results: QRCode[] = [];
        for (const account of accounts) {
            const identifier = encodeURI(account.original_name);
            const secret = encodeURI(account.secret);
            const issuer = encodeURI(account.issuer);
            const otpURL = `otpauth://totp/${identifier}?secret=${secret}&issuer=${issuer}`;
            results.push(<QRCode> {
                name: account.original_name,
                base64src: await qrcode(otpURL, {size: 250})
            });
        }

        ctx.response.headers.set('Content-Type', 'application/json');
        ctx.response.status = 200;
        ctx.response.body = results;
    }
}

export const qrcodeService = new QrcodeService();
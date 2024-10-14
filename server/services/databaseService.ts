import { Database } from '@db/sqlite';
import type { Context } from '@oak/oak';
import { exists } from '@std/fs';
import type { Account } from '../types.d.ts';

class DatabaseService {
    private readonly filePath: string;

    constructor() {
        this.filePath = '../dbs/database.sqlite';
    }

    async exists(ctx: Context): Promise<void> {
        const found = await exists(this.filePath);

        ctx.response.headers.set('Content-Type', 'application/json');
        ctx.response.body = {
            found: found
        };
        ctx.response.status = 200;
    }

    async loadAccounts(ctx: Context): Promise<Account[]> {
        const db = new Database(this.filePath);

        const results : Account[] = [];
        for (const acct of db.sql`SELECT email, secret, issuer, original_name FROM accounts`) {
            results.push(<Account> {
                email: acct[0],
                secret: acct[1],
                issuer: acct[2],
                original_name: acct[3]
            });
        }
        db.close();

        return results;
    }
}

export const databaseService = new DatabaseService();
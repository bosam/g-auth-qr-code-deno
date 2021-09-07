import { Context, exists, DB } from '../deps.ts';
import { Account } from '../types.d.ts';

class DatabaseService {
    private filePath: string;

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
        const db = new DB(this.filePath);

        let results : Account[] = [];
        for (const acct of db.query('SELECT email, secret, issuer, original_name FROM accounts')) {
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
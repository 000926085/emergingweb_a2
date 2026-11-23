'use server'

import { getDb } from '../lib/db';
import { redirect } from 'next/navigation';

export async function lookupStatus(rawCode) {
    if (typeof rawCode !== 'string' || !rawCode.trim()) {
        return;
    }

    const code = rawCode.trim();
    const db = await getDb();
    const request = await db.get(
        'SELECT tracking_code FROM loan_requests WHERE tracking_code = ?',
        [code]
    );

    if (!request) { 
        return {
            error: `A request with the tracking code '${rawCode}' does not exist.`
        }
     }

    redirect(`/statuses/${encodeURIComponent(code)}`);
}
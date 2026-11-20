import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';

export default async function StatusRequests() {
    async function lookupStatus(formData) {
        'use server';

        const rawCode = formData.get('inputTracking');
        if (typeof rawCode !== 'string' || !rawCode.trim()) {
            return;
        }

        const code = rawCode.trim();
        const db = await getDb();
        const request = await db.get(
            'SELECT tracking_code FROM loan_requests WHERE tracking_code = ?',
            [code]
        );

        if (!request) { return; }

        redirect(`/statuses/${encodeURIComponent(code)}`);
    }

    return (
        <div className='mx-3'>
            <h1>Request Status Lookup</h1>

            <form className="row g-3 align-items-center" action={lookupStatus}>
                <div className="col-auto">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="inputTracking"
                    id="inputTracking" 
                    placeholder="Enter tracking code" 
                    required
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

import { getDb } from '@/lib/db';

export default async function Statuses({params})
{
    const { code } = await params;

    const db = await getDb();
    const request = await db.get(
        'SELECT tracking_code, status FROM loan_requests WHERE tracking_code = ?',
        [decodeURIComponent(code)]
    );

    return (
        <div className='mx-3'>
            <h1>Status of Request: {code}</h1>
            <p>{JSON.stringify(request)}</p>
        </div>
    );
}

export async function generateStaticParams() 
{
    const db = await getDb();
    const requests = await db.all(
        'SELECT tracking_code FROM loan_requests ORDER BY id DESC LIMIT 50'
    );
 
    return requests.map((req) => ({
        code: req.tracking_code,
    }));
}
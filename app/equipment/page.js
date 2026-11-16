import { getDb } from '@/lib/db';

export const revalidate = 60;

export default async function Equipment() {
    const db = await getDb();
    const items = await db.all(
        'SELECT * FROM items WHERE stock >= 1'
    );

    return (
        <div>
            <h1>Equipment Page!</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.item_id}>
                        {item.name} - {item.category} (Stock: {item.stock})
                    </li>
                ))}
            </ul>
        </div>
    );
}

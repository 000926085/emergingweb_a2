import { getDb } from '@/lib/db';

export const revalidate = 60;

export default async function Equipment() {
    const db = await getDb();
    const items = await db.all(
        'SELECT * FROM items WHERE stock >= 1'
    );

    return (
        <div className='mx-3'>
            <h1>Available Equipment</h1>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Category</th>
                        <th scope="col">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.item_id}>
                            <td scope="row">{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

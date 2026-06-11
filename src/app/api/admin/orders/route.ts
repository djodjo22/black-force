import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from('admin:bf@2026').toString('base64');

  if (auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  const result = await db.execute('SELECT * FROM orders ORDER BY created_at DESC');
  const orders = result.rows.map((r: any) => ({
    ...r,
    id: typeof r.id === 'bigint' ? Number(r.id) : r.id,
    quantity: typeof r.quantity === 'bigint' ? Number(r.quantity) : r.quantity,
  }));
  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from('admin:bf@2026').toString('base64');

  if (auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, status } = await req.json();
  const db = await getDb();
  await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  return NextResponse.json({ success: true });
}

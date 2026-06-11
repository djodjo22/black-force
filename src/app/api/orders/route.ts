import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, address, quantity, notes } = await req.json();

    if (!name || !phone || !address) {
      return NextResponse.json({ error: 'يرجى ملء جميع الحقول المطلوبة' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.execute(
      'INSERT INTO orders (name, phone, address, quantity, notes) VALUES (?, ?, ?, ?, ?)',
      [name, phone, address, quantity || 1, notes || '']
    );

    const id = typeof result.lastInsertRowid === 'bigint' ? Number(result.lastInsertRowid) : result.lastInsertRowid;
    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json({ error: 'فشل في إرسال الطلب' }, { status: 500 });
  }
}

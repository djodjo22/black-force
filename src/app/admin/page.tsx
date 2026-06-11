'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Order } from '@/types';

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [auth, setAuth] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const fetchOrders = useCallback(async () => {
    const r = await fetch('/api/admin/orders', { headers: { Authorization: auth } });
    if (!r.ok) { setErr('خطأ في تسجيل الدخول'); return; }
    const data = await r.json();
    if (Array.isArray(data)) setOrders(data);
  }, [auth]);

  useEffect(() => {
    if (!loggedIn) return;
    fetchOrders();
  }, [loggedIn, fetchOrders]);

  const login = () => {
    const b = 'Basic ' + btoa(user + ':' + pass);
    setAuth(b);
    setTimeout(() => setLoggedIn(true), 0);
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setOrders(orders.map(o => o.id === id ? { ...o, status: status as Order['status'] } : o));
  };

  const statusColor: Record<string, string> = {
    pending: 'text-amber-400', confirmed: 'text-blue-400', completed: 'text-green-400', cancelled: 'text-red-400',
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-2">لوحة التحكم</h1>
          <p className="text-gray-500 text-center mb-6 text-sm">BLACK FORCE — الإدارة</p>
          {err && <p className="text-red-400 text-sm text-center mb-3">{err}</p>}
          <input placeholder="اسم المستخدم" value={user} onChange={(e) => setUser(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-3 outline-none focus:border-purple-500" />
          <input type="password" placeholder="كلمة المرور" value={pass} onChange={(e) => setPass(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-4 outline-none focus:border-purple-500" />
          <button onClick={login} className="w-full py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition font-bold">دخول</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">📦 <span className="text-purple-400">BLACK FORCE</span> — الطلبات</h1>
          <span className="text-gray-500 text-sm">{orders.length} طلب</span>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-600">لا توجد طلبات بعد</div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-sm text-gray-500">طلب #{o.id}</span>
                    <span className={`mr-3 text-sm font-medium ${statusColor[o.status]}`}>
                      {o.status === 'pending' && 'قيد الانتظار'}
                      {o.status === 'confirmed' && 'مؤكد'}
                      {o.status === 'completed' && 'مكتمل'}
                      {o.status === 'cancelled' && 'ملغي'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">{o.created_at}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-gray-500">الاسم:</span> {o.name}</div>
                  <div><span className="text-gray-500">الهاتف:</span> {o.phone}</div>
                  <div><span className="text-gray-500">الكمية:</span> {o.quantity} لتر</div>
                  <div><span className="text-gray-500">المجموع:</span> <span className="text-amber-400">{o.quantity * 150} د.ج</span></div>
                  <div className="col-span-2"><span className="text-gray-500">العنوان:</span> {o.address}</div>
                  {o.notes && <div className="col-span-2"><span className="text-gray-500">ملاحظات:</span> {o.notes}</div>}
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                  {o.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(o.id, 'confirmed')} className="px-4 py-1.5 bg-blue-600 rounded-lg text-xs hover:bg-blue-500 transition">تأكيد</button>
                      <button onClick={() => updateStatus(o.id, 'cancelled')} className="px-4 py-1.5 bg-red-600/50 rounded-lg text-xs hover:bg-red-500 transition">إلغاء</button>
                    </>
                  )}
                  {o.status === 'confirmed' && (
                    <button onClick={() => updateStatus(o.id, 'completed')} className="px-4 py-1.5 bg-green-600 rounded-lg text-xs hover:bg-green-500 transition">إتمام</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

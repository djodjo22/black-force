'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', quantity: 1, notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setDone(true); setForm({ name: '', phone: '', address: '', quantity: 1, notes: '' }); }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-grid">
      <div className="bg-glow">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <span className="text-xl font-bold tracking-wider">
            <span className="text-purple-400">BLACK</span> <span className="text-amber-400">FORCE</span>
          </span>
          <a href="#order" className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition">اطلب الآن</a>
        </nav>

        {/* Hero */}
        <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-medium mb-6 tracking-wider">
            🚀 سماد عضوي متكامل — الجيل الجديد
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="gradient-text">BLACK FORCE</span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-300 font-normal">القوة السوداء لمحاصيلك</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            تركيبة NPK 10-10-10 المدعمة بالأحماض الهيوميك والفولفيك والعناصر الصغرى — 
            لمنح محاصيلك قوة نمو استثنائية وإنتاجية غير مسبوقة
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {['آزوت 10%', 'فوسفور 10%', 'بوتاسيوم 10%', 'هيوميك 12.5%', 'فولفيك 5%'].map((x) => (
              <span key={x} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">{x}</span>
            ))}
          </div>
          <a href="#order" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-amber-500 rounded-xl text-lg font-bold glow-border hover:scale-105 transition">
            ابدأ طلبك الآن
          </a>
        </section>

        {/* Composition */}
        <section className="px-6 py-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">التركيبة العلمية</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'آزوت كلي (N)', value: '10%', desc: 'نمو خضري قوي' },
              { label: 'فوسفور (P₂O₅)', value: '10%', desc: 'تطوير الجذور والأزهار' },
              { label: 'بوتاسيوم (K₂O)', value: '10%', desc: 'جودة الثمار ومقاومة الإجهاد' },
              { label: 'حمض هيوميك', value: '12.5%', desc: 'تحسين بنية التربة' },
              { label: 'حمض فولفيك', value: '5%', desc: 'امتصاص سريع للعناصر' },
              { label: 'أحماض أمينية', value: 'حرة', desc: 'دعم النمو والتمثيل الغذائي' },
              { label: 'مغنيسيوم (Mg)', value: 'مدعم', desc: 'البناء الضوئي' },
              { label: 'حديد مخلبي (Fe)', value: 'مدعم', desc: 'منع الاصفرار' },
              { label: 'موليبدينوم (Mo)', value: 'مدعم', desc: 'تثبيت النيتروجين' },
              { label: 'عناصر صغرى', value: 'B, Zn, Cu, Mn', desc: 'تغذية متكاملة' },
            ].map((x) => (
              <div key={x.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center hover:border-purple-500/30 transition">
                <div className="text-2xl font-bold text-purple-400 mb-1">{x.value}</div>
                <div className="text-sm text-gray-300 font-medium mb-1">{x.label}</div>
                <div className="text-xs text-gray-500">{x.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">فوائد BLACK FORCE</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">لماذا تختار القوة السوداء لمحاصيلك؟</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'نمو متسارع', desc: 'NPK متوازن + أحماض أمينية يعزز النمو الخضري والجذري في آن واحد', icon: '🌱' },
              { title: 'تربة أكثر حيوية', desc: 'الأحماض الهيوميك والفولفيك تحسن بنية التربة وتزيد قدرتها على الاحتفاظ بالماء والعناصر', icon: '🪨' },
              { title: 'امتصاص فوري', desc: 'العناصر المخلبية (Chelated) والفولفيك تضمن امتصاص سريع وكفاءة عالية', icon: '⚡' },
              { title: 'إنتاجية مضاعفة', desc: 'زيادة حجم وجودة الثمار مع تقليل نسبة التشوهات والأمراض', icon: '📈' },
              { title: 'مقاومة الإجهاد', desc: 'البوتاسيوم والعناصر الصغرى تقوي النبات ضد الجفاف والحرارة والملوحة', icon: '🛡️' },
              { title: 'جل عضوي سهل', desc: 'لزوجة متوسطة — سهل الخلط والاستخدام مع جميع أنظمة الري', icon: '💧' },
            ].map((x) => (
              <div key={x.title} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 transition">
                <div className="text-3xl mb-4">{x.icon}</div>
                <h3 className="text-lg font-bold mb-2">{x.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage */}
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">طريقة الاستخدام</h2>
          <p className="text-gray-500 text-center mb-12">مناسب لجميع المحاصيل الحقلية والبستانية</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'تخفيف', desc: 'أضف 2-4 مل لكل لتر ماء حسب نوع المحصول' },
              { step: '2', title: 'خلط', desc: 'حرك جيداً حتى يذوب الجل تماماً في الماء' },
              { step: '3', title: 'ري', desc: 'طبق المحلول مع ماء الري أو رشاً على الأوراق' },
            ].map((x) => (
              <div key={x.step} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4 text-purple-400 font-bold text-xl">{x.step}</div>
                <h3 className="font-bold mb-2">{x.title}</h3>
                <p className="text-gray-400 text-sm">{x.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Placeholder */}
        <section className="px-6 py-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">ماذا قال المزارعون؟</h2>
          <p className="text-gray-500 text-center mb-12">قريباً — آراء المستخدمين الأوائل</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3 text-amber-400">{'★'.repeat(5)}</div>
                <p className="text-gray-400 text-sm italic mb-4">"تجربة رائعة، النتائج ظهرت من أول استخدام. أنصح بالمنتج بقوة."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center text-sm font-bold">م</div>
                  <div>
                    <div className="text-sm font-medium">مزارع {i}</div>
                    <div className="text-xs text-gray-500">منطقة تجريبية</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Order Form */}
        <section id="order" className="px-6 py-20 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent border border-purple-500/20">
            <h2 className="text-3xl font-bold text-center mb-2">اطلب BLACK FORCE الآن</h2>
            <p className="text-gray-500 text-center mb-8">الدفع عند الاستلام — التوصيل إلى باب منزلك</p>

            {done ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">تم استلام طلبك!</h3>
                <p className="text-gray-400 mb-6">سنتواصل معك قريباً لتأكيد الطلب</p>
                <button onClick={() => setDone(false)} className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition">طلب جديد</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">الاسم الكامل</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">رقم الهاتف</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">عنوان التوصيل</label>
                  <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition text-white" rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">الكمية (لتر)</label>
                    <input type="number" min={1} max={100} value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition text-white" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">السعر</label>
                    <div className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-lg font-bold text-amber-400 flex items-center">
                      {form.quantity * 150} د.ج
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">ملاحظات (اختياري)</label>
                  <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition text-white" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-amber-500 rounded-xl text-lg font-bold glow-border hover:scale-[1.02] transition disabled:opacity-50">
                  {submitting ? 'جاري الإرسال...' : 'تأكيد الطلب — الدفع عند الاستلام'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/5 text-center text-gray-600 text-sm">
          <span className="text-purple-400">BLACK FORCE</span> — جميع الحقوق محفوظة &copy; 2026
        </footer>
      </div>
    </div>
  );
}

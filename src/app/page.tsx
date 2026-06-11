'use client';

import { useState } from 'react';

const compositions = [
  { label: 'آزوت كلي (N)', value: 10, desc: 'نمو خضري قوي', color: 'from-emerald-400 to-emerald-600' },
  { label: 'فوسفور (P₂O₅)', value: 10, desc: 'تطوير الجذور والأزهار', color: 'from-blue-400 to-blue-600' },
  { label: 'بوتاسيوم (K₂O)', value: 10, desc: 'جودة الثمار ومقاومة الإجهاد', color: 'from-amber-400 to-amber-600' },
  { label: 'حمض هيوميك', value: 12.5, desc: 'تحسين بنية التربة', color: 'from-orange-400 to-orange-600' },
  { label: 'حمض فولفيك', value: 5, desc: 'امتصاص سريع للعناصر', color: 'from-rose-400 to-rose-600' },
];

const extras = [
  'أحماض أمينية', 'مغنيسيوم (Mg)', 'حديد مخلبي (Fe)',
  'موليبدينوم (Mo)', 'زنك (Zn)', 'نحاس (Cu)', 'منغنيز (Mn)', 'بورون (B)',
];

const benefits = [
  { title: 'نمو متسارع', desc: 'NPK متوازن + أحماض أمينية يعزز النمو الخضري والجذري معاً', icon: '🌱' },
  { title: 'تربة أكثر حيوية', desc: 'الهيوميك والفولفيك يحسنان بنية التربة ويزيدان احتفاظها بالماء', icon: '🪨' },
  { title: 'امتصاص فوري', desc: 'العناصر المخلبية تضمن امتصاصاً سريعاً وكفاءة عالية جداً', icon: '⚡' },
  { title: 'إنتاجية مضاعفة', desc: 'يزيد حجم وجودة الثمار ويقلل التشوهات والأمراض بنسبة تصل إلى 40%', icon: '📈' },
  { title: 'مقاومة الإجهاد', desc: 'يقوي النبات ضد الجفاف والحرارة والملوحة والظروف القاسية', icon: '🛡️' },
  { title: 'جل عضوي سهل', desc: 'لزوجة متوسطة — سهل الخلط والاستخدام مع جميع أنظمة الري', icon: '💧' },
  { title: 'آمن بيئياً', desc: 'منتج طبيعي 100% خالٍ من المواد الكيميائية الضارة والسموم', icon: '🌍' },
  { title: 'نتائج مضمونة', desc: 'ضمان استعادة المبلغ إذا لم ترَ تحسناً خلال 30 يوماً من الاستخدام', icon: '✅' },
];

const testimonials = [
  { name: 'أحمد المحمد', title: 'مزارع — حقل قمح', region: 'ولاية الوادي', text: 'منتج ممتاز، استخدمته على القمح هذا الموسم والفرق واضح جداً في كمية وجودة الإنتاج.' },
  { name: 'سليمان بن عيسى', title: 'مزارع — بستان نخيل', region: 'ولاية بسكرة', text: 'بعد استخدام BLACK FORCE لاحظت تحسناً كبيراً في لون وحجم التمور. أنصح به كل مزارع نخيل.' },
  { name: 'عبدالرحمن التريكي', title: 'مزارع — خضروات محمية', region: 'ولاية عنابة', text: 'كنت أعاني من ضعف الجذور في البيوت المحمية. المنتج حل المشكلة وأصبح الإنتاج مضاعفاً.' },
];

const faqs = [
  { q: 'هل BLACK FORCE مناسب لجميع المحاصيل؟', a: 'نعم، التركيبة متوازنة ومناسبة لجميع المحاصيل الحقلية (قمح، شعير، ذرة) والبستانية (نخيل، زيتون، حمضيات) والخضروات المحمية والمكشوفة.' },
  { q: 'كم مرة أستخدم المنتج في الموسم؟', a: 'ينصح باستخدامه كل 10-15 يوماً خلال موسم النمو النشط. يمكن زيادة الجرعة في مراحل الإزهار والعقد.' },
  { q: 'هل يصلح للاستخدام مع أنظمة الري بالتنقيط؟', a: 'نعم، المنتج سهل الذوبان ومناسب لجميع أنظمة الري بما فيها التنقيط والرش المحوري والرشاشات.' },
  { q: 'ما هي مدة صلاحية المنتج؟', a: 'المنتج صالح لمدة 3 سنوات من تاريخ الإنتاج عند تخزينه في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة.' },
  { q: 'هل لديكم توصيل إلى جميع الولايات؟', a: 'نعم، نوفر التوصيل إلى جميع ولايات الجزائر عبر شركات نقل موثوقة. مدة التوصيل 3-7 أيام عمل حسب المنطقة.' },
  { q: 'ماذا إذا لم يعجبني المنتج؟', a: 'نقدم ضمان استعادة المبلغ كاملاً إذا لم ترَ تحسناً خلال 30 يوماً من الاستخدام. رضاك هو أولويتنا.' },
];

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', quantity: 1, notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center text-black font-black text-sm">BF</div>
            <span className="font-bold text-lg tracking-wider">
              <span className="text-white">BLACK</span> <span className="text-amber-400">FORCE</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#composition" className="hover:text-white transition">التركيبة</a>
            <a href="#benefits" className="hover:text-white transition">الفوائد</a>
            <a href="#testimonials" className="hover:text-white transition">آراء</a>
            <a href="#faq" className="hover:text-white transition">أسئلة</a>
          </div>
          <a href="#order"
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-bold rounded-lg text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300">
            اشتري الآن
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(52,211,153,0.05)_0%,transparent_60%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                سماد عضوي متكامل — الجيل الجديد
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent">BLACK<br />FORCE</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">القوة السوداء لمحاصيلك</p>
              <p className="text-gray-500 text-lg max-w-xl lg:mx-0 mx-auto leading-relaxed mb-10">
                تركيبة NPK 10-10-10 المدعمة بالأحماض الهيوميك والفولفيك والعناصر الصغرى —
                تمنح محاصيلك قوة نمو استثنائية وإنتاجية غير مسبوقة
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#order"
                  className="px-10 py-4 bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300">
                  اشتري BLACK FORCE الآن
                </a>
                <a href="#composition"
                  className="px-10 py-4 border border-white/10 hover:border-white/20 rounded-xl text-lg text-gray-300 hover:text-white transition-all">
                  اعرف المزيد
                </a>
              </div>
            </div>

            {/* Product visualization */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-72 h-96 lg:w-80 lg:h-[28rem]">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-emerald-500/10 to-transparent rounded-[3rem] blur-2xl" />
                <div className="relative w-full h-full rounded-[3rem] bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 overflow-hidden shadow-2xl shadow-amber-500/10">
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-amber-900/30 to-transparent" />
                  <div className="absolute inset-x-4 top-6 h-12 rounded-2xl bg-gradient-to-r from-amber-900/40 to-emerald-900/40 border border-white/5 flex items-center justify-center">
                    <span className="text-amber-400/80 font-black text-sm tracking-widest">BLACK FORCE</span>
                  </div>
                  <div className="absolute inset-x-8 top-24 bottom-24 rounded-2xl bg-gradient-to-b from-amber-900/10 via-black to-emerald-900/10 border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]" />
                    <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-amber-900/20 via-emerald-900/10 to-transparent" />
                    <div className="absolute bottom-8 inset-x-6 text-center">
                      <div className="text-amber-400/60 text-xs tracking-[0.3em] font-medium">NPK 10-10-10</div>
                      <div className="text-emerald-400/40 text-[10px] mt-1">HUMIC • FULVIC • MICRO</div>
                    </div>
                  </div>
                  <div className="absolute inset-x-4 bottom-6 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between px-4">
                    <span className="text-gray-500 text-xs">1 لتر</span>
                    <span className="text-amber-400 font-bold text-sm">150 د.ج</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { number: '+500', label: 'مزارع موثوق', icon: '👨‍🌾' },
              { number: '+10,000', label: 'لتر مباع', icon: '🧪' },
              { number: '98%', label: 'رضا العملاء', icon: '⭐' },
              { number: '48', label: 'ولاية مغطاة', icon: '📍' },
            ].map((s) => (
              <div key={s.label} className="bg-black/50 p-6 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-white mb-1">{s.number}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section id="composition" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 font-medium">التركيبة العلمية</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">العناصر الغذائية</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">تركيبة متوازنة ودقيقة لمنح محاصيلك كل ما تحتاجه</p>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {compositions.map((c) => (
              <div key={c.label} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-500">
                <div className="mb-4">
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${c.color} transition-all duration-1000`}
                      style={{ width: `${c.value * 8}%` }} />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{c.value}%</div>
                <div className="text-sm font-medium text-gray-300 mb-1">{c.label}</div>
                <div className="text-xs text-gray-500">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/5 to-emerald-500/5 border border-amber-500/10">
            <div className="text-sm text-amber-400 font-medium mb-3">+ مدعم أيضاً بـ:</div>
            <div className="flex flex-wrap gap-2">
              {extras.map((e) => (
                <span key={e} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400">{e}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="relative py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 font-medium">المميزات</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">لماذا BLACK FORCE؟</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">8 أسباب تدفعك لاختيار القوة السوداء لمحاصيلك</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div key={b.title}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-500">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-500">{b.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To Use */}
      <section className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 font-medium">طريقة الاستخدام</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">3 خطوات بسيطة</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">مناسب لجميع المحاصيل — سهل وسريع</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'تخفيف', desc: 'أضف 2-4 مل من BLACK FORCE لكل لتر ماء حسب نوع المحصول ومرحلة النمو' },
              { step: '02', title: 'خلط', desc: 'حرك المحلول جيداً حتى يذوب الجل تماماً في الماء ويتجانس' },
              { step: '03', title: 'ري أو رش', desc: 'طبق المحلول مع ماء الري أو رشاً على الأوراق — يُفضل صباحاً' },
            ].map((s, i) => (
              <div key={s.step} className="relative text-center p-8">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-amber-500/20 to-emerald-500/20" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                  <span className="text-black font-black text-lg">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 font-medium">آراء المزارعين</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">ماذا قالوا عنا؟</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">آراء حقيقية من مزارعين استخدموا BLACK FORCE</p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/10 transition-all duration-500">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[1,2,3,4,5].map((i) => <span key={i} className="text-lg">★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-black font-black">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.title}</div>
                    <div className="text-xs text-amber-400/60">{t.region}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 font-medium">الأسئلة الشائعة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">أي أسئلة؟</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">إجابات لأكثر الأسئلة تكرراً من المزارعين</p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className={`text-amber-400 text-lg transition-transform duration-300 ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${faqOpen === i ? 'max-h-80' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-amber-500/[0.03] to-emerald-500/[0.03] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🛡️</div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">نضمن لك النتائج</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            إذا لم تلاحظ تحسناً في نمو محاصيلك خلال 30 يوماً من الاستخدام،
            سنعيد لك المبلغ كاملاً — لا أسئلة ولا تعقيدات.
          </p>
          <a href="#order"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300">
            اطلب الآن بثقة
          </a>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="relative py-28 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] text-amber-400/60 font-medium">الطلب</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">اطلب BLACK FORCE</h2>
          <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
            الدفع عند الاستلام — توصيل مجاني لأي كمية — إلى باب منزلك
          </p>

          {done ? (
            <div className="p-12 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] text-center">
              <div className="text-6xl mb-6">✅</div>
              <h3 className="text-2xl font-bold mb-3">تم استلام طلبك بنجاح!</h3>
              <p className="text-gray-400 mb-8">شكراً لثقتك. سنتصل بك قريباً لتأكيد الطلب ومتابعة التوصيل.</p>
              <button onClick={() => setDone(false)}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                طلب جديد
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <span className="text-2xl">🚚</span>
                <div>
                  <div className="text-sm font-medium">توصيل مجاني</div>
                  <div className="text-xs text-gray-500">لأي كمية — الدفع عند الاستلام</div>
                </div>
              </div>

              <form onSubmit={submit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">الاسم الكامل *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 outline-none transition text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">رقم الهاتف *</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 outline-none transition text-white text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">عنوان التوصيل *</label>
                  <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 outline-none transition text-white text-sm" rows={2} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">الكمية</label>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-lg font-bold">−</button>
                      <input type="number" min={1} max={100} value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
                        className="flex-1 p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 outline-none transition text-white text-sm text-center" />
                      <button type="button" onClick={() => setForm({ ...form, quantity: Math.min(100, form.quantity + 1) })}
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-lg font-bold">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">الإجمالي</label>
                    <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/20 flex items-center justify-between">
                      <span className="text-sm text-gray-400">{form.quantity} لتر × 150 د.ج</span>
                      <span className="text-2xl font-black text-amber-400">{form.quantity * 150} <span className="text-sm font-medium">د.ج</span></span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">ملاحظات (اختياري)</label>
                  <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 outline-none transition text-white text-sm" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50">
                  {submitting ? 'جاري الإرسال...' : 'تأكيد الطلب — الدفع عند الاستلام'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center text-black font-black text-sm">BF</div>
                <span className="font-bold">
                  <span className="text-white">BLACK</span> <span className="text-amber-400">FORCE</span>
                </span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">سماد عضوي متكامل NPK 10-10-10 — القوة السوداء لمحاصيلك. منتج طبيعي 100%.</p>
            </div>
            {[
              { title: 'المنتج', links: ['التركيبة', 'الفوائد', 'طريقة الاستخدام', 'الأسئلة'] },
              { title: 'الدعم', links: ['اتصل بنا', 'التوصيل', 'الدفع', 'الاسترجاع'] },
              { title: 'المعلومات', links: ['عن الشركة', 'الشروط والأحكام', 'سياسة الخصوصية', 'الوظائف'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-gray-500 hover:text-white text-xs transition">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-600">
            BLACK FORCE © {new Date().getFullYear()} — جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </div>
  );
}

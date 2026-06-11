# Black Force — سماد عضوي متكامل

Next.js 16 + SQLite + Tailwind CSS v4 + COD

## التشغيل محلياً

```bash
npm install
npm run dev
```

- الموقع: http://localhost:3000
- لوحة التحكم: http://localhost:3000/admin
  - المستخدم: `admin`
  - كلمة السر: `bf@2026`

## الرفع على Vercel (مجاني)

```bash
npm i -g vercel
vercel
```

ملاحظة: SQLite يعمل محلياً فقط. للرفع على Vercel تحتاج قاعدة بيانات خارجية:
- [Neon](https://neon.tech) (PostgreSQL مجاني)
- [Turso](https://turso.tech) (SQLite على الحافة)
- [Supabase](https://supabase.com) (PostgreSQL + Auth)

## الهيكل

```
src/
  app/
    page.tsx          # اللاندينغ بيج
    admin/page.tsx    # لوحة التحكم
    api/orders/       # إنشاء طلب
    api/admin/orders/ # إدارة الطلبات
  lib/
    db.ts             # قاعدة البيانات
  types/
    index.ts          # الأنواع
```

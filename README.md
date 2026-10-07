<div align="center">

# ⚖️ عدالة كونتراكت
### منظومة الصياغة والتوثيق القانوني المعتمدة
**Bilingual Legal Contract Generator** | Egyptian Law · Arabic & English

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/bilingual-legal-contract-generator)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 نظرة عامة | Overview

**عدالة كونتراكت** هي منصة ذكاء اصطناعي متكاملة لصياغة العقود القانونية ثنائية اللغة (عربي-إنجليزي) المتوافقة مع أحكام **القانون المدني المصري**، **نقابة المحامين**، و**محكمة النقض**.

**Adala Contract** is a comprehensive AI-powered platform for generating bilingual (Arabic–English) legal contracts fully compliant with Egyptian civil law, the Egyptian Bar Association standards, and Court of Cassation principles.

### ✨ الميزات الرئيسية | Key Features

| الميزة | Feature |
|--------|---------|
| 🤖 توليد عقود بالذكاء الاصطناعي (Gemini) | AI Contract Generation (Gemini) |
| 📚 موسوعة رسمية تضم 600+ عقد معتمد | Official Encyclopedia: 600+ Contracts |
| ⚖️ بنك الشروط الذكية القانونية | Smart Legal Clause Bank |
| 📄 تصدير PDF / Word احترافي | Professional PDF / Word Export |
| ✍️ توقيع إلكتروني معتمد | Certified Electronic Signature |
| 🏛️ بوابة رفع الدعاوى (<2MB) | Court Filing Portal (<2MB) |
| 🏢 هوية مكتب المحاماة المخصصة | Custom Law Firm Branding |
| 📱 تطبيق PWA يعمل بدون إنترنت | Offline-capable PWA |

---

## 🚀 التشغيل المحلي | Local Development

### المتطلبات | Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### الخطوات | Steps

```bash
# 1. استنساخ المستودع | Clone the repository
git clone https://github.com/YOUR_USERNAME/bilingual-legal-contract-generator.git
cd bilingual-legal-contract-generator

# 2. تثبيت الحزم | Install dependencies
npm install

# 3. إعداد المتغيرات البيئية | Setup environment variables
cp .env.example .env
# ثم عدّل .env وأدخل مفاتيح API الخاصة بك
# Then edit .env and add your API keys

# 4. تشغيل الخادم المحلي | Start development server
npm run dev
```

افتح المتصفح على: **http://localhost:3000**

---

## 🔑 المتغيرات البيئية | Environment Variables

أنشئ ملف `.env` بنسخ `.env.example`:

```env
# Required: Google Gemini API Key
# الحصول عليه من: https://aistudio.google.com/
GEMINI_API_KEY=your_key_here

# Optional PayPal (for payment features)
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_MODE=sandbox  # أو live للإنتاج
```

> ⚠️ **تحذير أمني:** لا تُشارك مفاتيح API أبداً ولا ترفعها على GitHub. ملف `.env` مُضاف إلى `.gitignore`.

---

## ☁️ النشر على Vercel | Deploy to Vercel

### الطريقة الأولى: زر النشر الفوري

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/bilingual-legal-contract-generator)

### الطريقة الثانية: الـ CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel

# إضافة المتغيرات البيئية
vercel env add GEMINI_API_KEY
vercel env add PAYPAL_CLIENT_SECRET
```

### الطريقة الثالثة: عبر لوحة تحكم Vercel

1. اذهب إلى [vercel.com](https://vercel.com) وسجّل الدخول
2. اضغط **"Add New Project"** واختر المستودع
3. في قسم **"Environment Variables"** أضف:
   - `GEMINI_API_KEY`
   - `VITE_PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `PAYPAL_MODE`
4. اضغط **"Deploy"** ✅

---

## 🏗️ هيكل المشروع | Project Structure

```
bilingual-legal-contract-generator/
├── components/              # React UI Components
│   ├── Header.tsx           # Global navigation
│   ├── ContractForm.tsx     # Contract generation form
│   ├── ContractDisplay.tsx  # Contract viewer & export
│   ├── LandingPage.tsx      # Landing / features page
│   ├── OfficialEncyclopediaView.tsx  # 600+ contract library
│   ├── SmartClauseBank.tsx  # Legal clause library
│   ├── ContractsArchive.tsx # Saved contracts archive
│   ├── ElectronicSignatureModal.tsx  # e-Signature
│   ├── GovPortalCompressionModal.tsx # Court filing
│   ├── BrandingSettingsModal.tsx     # Law firm branding
│   └── ...
├── services/                # Business Logic Services
│   ├── geminiService.ts     # AI contract generation
│   ├── contractBuilder.ts   # Offline statutory builder
│   ├── officialEncyclopedia.ts  # Core encyclopedia
│   ├── officialStatutoryMegaRepository.ts  # Full law DB
│   ├── pdfExportService.ts  # PDF/Word export
│   ├── storageService.ts    # LocalStorage persistence
│   └── clauseBankData.ts    # Smart clause database
├── public/                  # PWA Assets
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   └── *.png               # App icons
├── App.tsx                  # Root application
├── types.ts                 # TypeScript types
├── server.ts                # Local Express dev server
├── vite.config.ts           # Vite build config
├── vercel.json              # Vercel deployment config
└── .env.example             # Environment variable template
```

---

## 🛠️ السكريبتات المتاحة | Available Scripts

```bash
npm run dev       # تشغيل خادم التطوير | Start dev server
npm run build     # بناء نسخة الإنتاج | Build for production
npm run preview   # معاينة نسخة الإنتاج | Preview production build
npm run lint      # فحص TypeScript | TypeScript type check
```

---

## 🧱 التقنيات المستخدمة | Tech Stack

- **Frontend:** React 19, TypeScript 5.8, Tailwind CSS (CDN)
- **Build Tool:** Vite 6
- **AI:** Google Gemini API (`@google/genai`)
- **Export:** `docx`, `pdf-lib`, `html2pdf.js`, `file-saver`
- **QR Code:** `qrcode`
- **Dev Server:** Express 4
- **PWA:** Service Worker + Web App Manifest

---

## 📜 الترخيص | License

هذا المشروع مرخص بموجب رخصة [MIT](LICENSE).

---

<div align="center">
  <p>صُنع بـ ❤️ لخدمة المنظومة القانونية المصرية</p>
  <p><strong>عدالة كونتراكت</strong> © 2026 — المنظومة القانونية المعتمدة</p>
</div>

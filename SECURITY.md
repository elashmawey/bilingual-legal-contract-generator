# Security Policy | سياسة الأمان

## Supported Versions | الإصدارات المدعومة

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅ |

## Reporting a Vulnerability | الإبلاغ عن ثغرة أمنية

**⚠️ لا تُبلغ عن الثغرات الأمنية عبر Issues العامة.**

إذا اكتشفت ثغرة أمنية، يُرجى:
1. **لا** تفتح Issue عام
2. راسلنا على البريد الإلكتروني مباشرة
3. أرسل وصفاً تفصيلياً للثغرة

سنرد خلال **48 ساعة** وسنُصلح الثغرة في أقرب وقت ممكن.

---

**⚠️ Please DO NOT report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability:
1. **Do NOT** open a public issue
2. Email us directly  
3. Include a detailed description of the vulnerability

We will respond within **48 hours** and patch the vulnerability as soon as possible.

## Important Notes | ملاحظات مهمة

- ملف `.env` لا يُرفع على GitHub ويحتوي على بيانات حساسة
- **Never commit `.env` files** containing real API keys to version control
- Use environment variables in Vercel/hosting platform dashboard instead

---
farsi-title:
english-title: MCP
description: MCP یه پل بین Agent و سرویس‌های تردپارتیه که اضافه کردن Toolهای جدید رو خیلی راحت می‌کنه و باعث میشه لازم نباشه هر Harness همه‌ی اتصال‌ها رو از صفر بسازه.
category: tools-and-environment
order: 30
---

 **MCP** یا **Model Context Protocol** یه پروتکله که اجازه میده [Agent](/t/wiki-ai/agent) از [Tool](/t/wiki-ai/tool)هایی استفاده کنه که خارج از خود [Harness](/t/wiki-ai/harness) ساخته شدن.

فرض کن می‌خوای ایجنتت به **GitHub** ، **Slack** یا دیتابیس شرکتت وصل بشه. بدون **MCP** ، هر [Harness](/t/wiki-ai/harness) باید برای تک‌تک این سرویس‌ها یه اتصال جدا بنویسه و مثلا هم **Cursor** ، هم **Claude Code** باید یه کار واحد رو هی از اول انجام بدن.

این **MCP** میاد و کار رو ساده تر میکنه.

یه نفر فقط یه **MCP Server** می‌نویسه که مثلا به **GitHub** وصله. بعد هر [Harness](/t/wiki-ai/harness)ـی که از **MCP** پشتیبانی کنه، می‌تونه به اون سرور وصل بشه و همون [Tool](/t/wiki-ai/tool)ها رو استفاده کنه.

نکته‌ی مهم اینه که [Agent](/t/wiki-ai/agent) اصلا مستقیما با **MCP** کاری نداره.

ایجنت] فقط یه [Tool](/t/wiki-ai/tool) رو صدا می‌زنه. این [Harness](/t/wiki-ai/harness)ـه که پشت صحنه می‌دونه اون [Tool](/t/wiki-ai/tool) از یه **MCP Server** اومده.

علاوه بر [Tool](/t/wiki-ai/tool) ، این **MCP** می‌تونه **Resource** های **read-only** یا **Prompt** های آماده هم ارائه بده، ولی خب مهم‌ترین کاربردش اضافه کردن [Tool](/t/wiki-ai/tool)های جدیده.

یه نکته‌ی مهم اینه که هر [Tool](/t/wiki-ai/tool) جدیدی که از طریق **MCP** اضافه میشه، باید همراه با توضیحاتش برای [Model](/t/wiki-ai/model) ارسال بشه. یعنی اسم [Tool](/t/wiki-ai/tool)، توضیحش و آرگومان‌هایی که می‌پذیره. اگه تعداد [Tool](/t/wiki-ai/tool)ها خیلی زیاد باشه، این توضیحات بخش زیادی از [Context Window](/t/wiki-ai/context-window) رو اشغال می‌کنن و هم هزینه رو بالا می‌برن، هم تمرکز مدل رو کم می‌کنن.

برای حل این مشکل، خیلی از [Harness](/t/wiki-ai/harness)های جدید فقط یه لیست از [Tool](/t/wiki-ai/tool)ها رو اول کار به مدل نشون میدن. هر وقت [Agent](/t/wiki-ai/agent) به یه [Tool](/t/wiki-ai/tool) نیاز داشت، همون موقع توضیحات کاملش رو داخل [Context](/t/wiki-ai/context) بارگذاری می‌کنن. اینطوری [Context](/t/wiki-ai/context) سبک‌تر می‌مونه و مدل فقط چیزهایی رو می‌بینه که واقعاً بهشون نیاز داره.

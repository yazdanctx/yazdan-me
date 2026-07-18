---
farsi-title:
english-title: subagent
description: Subagent یه agent کمکی با context جداست که کارهای شلوغ و سنگین رو انجام میده و فقط نتیجه‌ی نهایی رو به agent اصلی برمی‌گردونه.
category: memory-and-steering
order: 56
---
ساب ایجنت، خودش یه [agent](/t/wiki-ai/agent) جدیده که یه [agent](/t/wiki-ai/agent) دیگه برای انجام یه کار مشخص می‌سازتش. 

یکم پیچیده شد :))))

بخوام ساده تر بگم این میشه که **subagent** داخل یه [session](/t/wiki-ai/session) جدا اجرا میشه و [context window](/t/wiki-ai/context-window) خودش رو داره و آخر کار فقط نتیجه‌ی نهایی رو به [agent](/t/wiki-ai/agent) اصلی برمی‌گردونه.

دلیل وجودش اینه که [context](/t/wiki-ai/context) اصلی تمیز بمونه. 

فرض کن باید بین هزاران فایل بگردی یا کلی اطلاعات رو بررسی کنی. اگه خود [agent](/t/wiki-ai/agent) اصلی این کار رو انجام بده، تمام اون نتایج وارد [context](/t/wiki-ai/context)ش میشن و تا آخر [session](/t/wiki-ai/session) هم همونجا می‌مونن، در حالی که بیشترشون اصلا به درد ادامه‌ی کار نمی‌خورن.

ولی اگه همون کار رو به یه **subagent** بدی، تمام اون شلوغی فقط داخل [context](/t/wiki-ai/context) خود اون اتفاق میفته. آخرش هم فقط یه خلاصه یا نتیجه‌ی نهایی برمی‌گرده و [context](/t/wiki-ai/context) اصلی سبک و مرتب باقی می‌مونه.

این نتیجه‌ای که برمی‌گرده یه [secondary source](/t/wiki-ai/secondary-source) محسوب میشه. یعنی [agent](/t/wiki-ai/agent) اصلی فقط گزارش **subagent** رو می‌بینه، نه تمام اطلاعات خامی که جمع‌آوری شده. اگه چیزی داخل گزارش نباشه، برای [agent](/t/wiki-ai/agent) اصلی هم انگار اصلا وجود خارجی نداشته.

یه مزیت دیگه هم اینه که میشه چندتا **subagent** رو همزمان اجرا کرد. مثلا هر کدوم روی یه بخش از کار کار کنن و آخرش نتایجشون رو به [agent](/t/wiki-ai/agent) اصلی برگردونن تا سریع‌تر به جواب برسه.

فقط یه محدودیت وجود داره و اون اینه که **subagent** خودش نمی‌تونه دوباره **subagent** جدید بسازه. هدفش ساختن زنجیره‌های پیچیده نیست بلکه فقط می‌خواد [context](/t/wiki-ai/context)ها رو از هم جدا نگه داره.
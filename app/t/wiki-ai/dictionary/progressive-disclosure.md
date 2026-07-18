---
farsi-title:
english-title: Progressive disclosure
description: Progressive disclosure یعنی agent فقط اطلاعاتی رو لود کنه که برای تسک فعلی لازمه تا هم هزینه‌ی context کمتر بشه و هم کیفیت تصمیم‌گیری مدل بالاتر بره.
category: memory-and-steering
order: 53
---
 **Progressive disclosure** یعنی به جای اینکه از همون اول کل اطلاعات رو بریزی جلوی [agent](/t/wiki-ai/agent)، بیای فقط همون چیزایی رو بهش بدی که الان برای انجام اون تسک لازم داره و بقیه اطلاعات رو بذاری یه گوشه تا فقط اگر لازم شد خود ایجنت بره بخونتش.

دلیلش هم اینه که [context](/t/wiki-ai/context) مفت نیست و هر توکنی که از اول داخل [context](/t/wiki-ai/context) باشه، توی هر [turn](/t/wiki-ai/turn) دوباره به عنوان **input token** حساب میشه و از [attention budget](/t/wiki-ai/attention-budget) مدل هم مصرف می‌کنه.

یعنی اگه از همون اول بیای [AGENTS.md](/t/wiki-ai/agents-md) رو پر از دستورات نامربوط بکنی، خب ایجنت گیج میشه و کیفیت جواباش هم طبیعتا میاد پایین.

راه درست اینه که [AGENTS.md](/t/wiki-ai/agents-md) فقط یه خلاصه‌ی خیلی کوتاه از یه سری دستورات داشته باشه و بگه جزئیات اون دستور کجاست و بعد هر وقت [agent](/t/wiki-ai/agent) واقعا خواست یه کاری رو انجام بده، بره جزئیات مربوط به اون دستورات مورد نیاز رو بخونه

اصلا دقیقا به همین خاطر **Skills** توی [harness](/t/wiki-ai/harness) ساخته شدن، اول هر [session](/t/wiki-ai/session) فقط یه معرفی کوتاه از هر [skill](/t/wiki-ai/skill) لود میشه و دستورالعمل کاملش فقط وقتی وارد [context](/t/wiki-ai/context) میشه که واقعاً بهش نیاز باشه. این باعث میشه [context](/t/wiki-ai/context) سبک بمونه، هزینه کمتر بشه و مدل هم تمرکز بیشتری روی کاری که الان انجام میده داشته باشه.
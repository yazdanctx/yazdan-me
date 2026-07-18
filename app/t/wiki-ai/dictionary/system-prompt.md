---
farsi-title:
english-title: System Prompt
description: System Prompt مجموعه دستورالعمل‌های ثابتیه که قبل از هر درخواست به Model داده میشه و نقش، رفتار و قوانین Agent رو مشخص می‌کنه و به همین خاطر تأثیرش از پیام کاربر هم بیشتره.
category: context-windows
order: 22
---

 **System Prompt** یه سری دستورالعمل ثابته که [Harness](/t/wiki-ai/harness) قبل از هر [Model Provider Request](/t/wiki-ai/model-provider-request) به [Model](/t/wiki-ai/model) میده.

یعنی اصلا قبل اینکه حتی پیام تو به مدل برسه، یه متن بزرگ به مدل داده میشه که مشخص می‌کنه کیه، چطور باید رفتار کنه، چه [Tool](/t/wiki-ai/tool)هایی داره، چه قوانینی رو رعایت کنه و اینکه کلا نقشش چیه و این حرفا.

به همین خاطر، مدل اول **System Prompt** رو می‌خونه، بعد اگه فایل‌هایی مثل [AGENTS.md](/t/wiki-ai/agents-md) وجود داشته باشن اون‌ها رو می‌خونه و تازه بعد از اون به پیام تو می‌رسه.

توی **Coding Agent** ها، **System Prompt** معمولا خیلی زیاده و ممکنه هزاران یا حتی ده‌ها هزار [Token](/t/wiki-ai/token) داشته باشه. چون این متن توی هر [Model Provider Request](/t/wiki-ai/model-provider-request) دوباره ارسال میشه، جزو [Input Tokens](/t/wiki-ai/input-tokens) حساب میشه و روی هزینه هم تاثیر میذاره.

از اونجایی که **System Prompt** معمولا توی کل [Session](/t/wiki-ai/session) ثابت می‌مونه، بخش بزرگی از [Prefix Cache](/t/wiki-ai/prefix-cache) رو هم تشکیل میده. برای همین [Harness](/t/wiki-ai/harness)ها سعی می‌کنن وسط کار تغییرش ندن، چون هر تغییری باعث میشه **Cache** از بین بره و هزینه بیشتر بشه.

یه نکته‌ی مهم اینه که مدل معمولا به **System Prompt** بیشتر از پیام کاربر اهمیت میده. یعنی اگه تو یه چیزی بگی ولی **System Prompt** خلافش رو گفته باشه، احتمال زیادی داره مدل از دستور **System Prompt** پیروی کنه.

به همین دلیل گاهی دو [Agent](/t/wiki-ai/agent) که دقیقا از یه [Model](/t/wiki-ai/model) استفاده می‌کنن، رفتار کاملا متفاوتی دارن و اینجا تفاوت از خود مدل نیست بلکه از **System Prompt** های متفاوتیه که قبل از هر درخواست بهش داده شده.


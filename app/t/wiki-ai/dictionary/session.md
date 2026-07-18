---
farsi-title:
english-title: Session
description: Session تاریخچه‌ی کامل تعاملت با Agent در طول یک مکالمه است و هرچه طولانی‌تر و شلوغ‌تر بشه، مدیریت Context سخت‌تر و کیفیت پاسخ‌ها ممکن است کمتر شود.
category: context-windows
order: 23
---
این کلمه **Session** یعنی کل بازه‌ای که از شروع تا پایان با یه [Agent](/t/wiki-ai/agent) تعامل داری.

وقتی یه **Session** جدید شروع میشه که خب چت شما خالیه و چیزی داخلش وجود نداره. بعد کم‌کم پیام‌های تو، جواب‌های مدل، نتیجه‌ی [Tool](/t/wiki-ai/tool)ها و اطلاعاتی که خونده شده بهش اضافه میشن و **Session** بزرگ‌تر میشه.

در واقع **Session** همون چیزیه که به مرور [Context Window](/t/wiki-ai/context-window) رو پر می‌کنه. 

هرچی مکالمه طولانی‌تر بشه، اطلاعات بیشتری داخل [Context Window](/t/wiki-ai/context-window) قرار می‌گیره.

از اونجایی که [Model](/t/wiki-ai/model) یه سیستم [Stateless](/t/wiki-ai/stateless)ـه، حافظه مدل در واقع داخل همین **Session** قرار داره. مدل چیزی رو حفظ نمیکنه و فقط [Harness](/t/wiki-ai/harness) تاریخچه‌ **Session** رو توی هر [Model Provider Request](/t/wiki-ai/model-provider-request) دوباره براش می‌فرسته.

وقتی **Session** تموم میشه، این حافظه هم از بین میره. اگه یه **Session** جدید باز کنی، [Agent](/t/wiki-ai/agent) دیگه چیزی از مکالمه‌ی قبلی نمی‌دونه و تنها چیزی که باقی می‌مونه فایل‌هاییه که روی [Filesystem](/t/wiki-ai/filesystem) ذخیره شدن. به همین خاطر فایل‌هایی مثل [AGENTS.md](/t/wiki-ai/agents-md) یا [Memory System](/t/wiki-ai/memory-system) می‌تونن بین **Session** های مختلف اطلاعات رو حفظ کنن.

یه نکته‌ی مهم اینه که هر چیزی که داخل یه **Session** اتفاق میفته، روی جواب‌های بعدی هم اثر میذاره. اگه چند کار کاملا بی‌ربط رو داخل یه **Session** انجام بدی، اطلاعاتشون قاطی هم میشه و ممکنه کیفیت جواب‌ها پایین بیاد.

برای همین معمولا بهتره هر **Session** فقط روی یه موضوع یا یه تسک تمرکز داشته باشه و بعد از تموم شدن اون تسک، یه **Session** جدید شروع کنی.

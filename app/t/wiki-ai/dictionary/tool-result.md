---
farsi-title:
english-title: Tool Result
description: Tool Result خروجی واقعی اجرای یک Toolـه و تنها راهیه که Model می‌تونه از وضعیت Environment باخبر بشه و تصمیم بگیره مرحله‌ی بعدی چه کاری انجام بده.
category: tools-and-environment 
order: 29
---
 **Tool Result** همون نتیجه‌ایه که بعد از اجرای یه [Tool](/t/wiki-ai/tool) به [Model](/t/wiki-ai/model) برگردونده میشه.

مثلا اگه [Agent](/t/wiki-ai/agent) یه فایل رو با **Read** بخونه، محتوای فایل یه **Tool Result** محسوب میشه. اگه یه دستور با **Bash** اجرا کنه، خروجی ترمینال **Tool Result** ـه. حتی اگه اجرای [Tool](/t/wiki-ai/tool) با خطا مواجه بشه، متن خطا هم یه **Tool Result** محسوب میشه.

بعد از اینکه [Harness](/t/wiki-ai/harness) یه [Tool](/t/wiki-ai/tool) رو اجرا کرد، نتیجه‌ش رو به [Context](/t/wiki-ai/context) اضافه می‌کنه و توی [Model Provider Request](/t/wiki-ai/model-provider-request) بعدی برای [Model](/t/wiki-ai/model) می‌فرسته. مدل هم بر اساس همون نتیجه تصمیم می‌گیره قدم بعدی چیه و آیا یه [Tool Call](/t/wiki-ai/tool-call) دیگه انجام بده یا جواب نهایی رو به کاربر بده.

در واقع [Tool Call](/t/wiki-ai/tool-call) و **Tool Result** دو بخش از یه چرخه هستن. اول مدل درخواست اجرای یه [Tool](/t/wiki-ai/tool) رو تولید می‌کنه، بعد [Harness](/t/wiki-ai/harness) اون رو اجرا می‌کنه و نتیجه رو دوباره به مدل برمی‌گردونه.

یه نکته‌ی مهم اینه که [Model](/t/wiki-ai/model) هیچ راه دیگه‌ای برای دیدن [Environment](/t/wiki-ai/environment) نداره. هر چیزی که درباره‌ی پروژه، فایل‌ها یا خروجی دستورها می‌دونه، فقط از روی همین **Tool Result** ـه.

اگه یه فایل کامل خونده بشه یا خروجی یه تست خیلی طولانی باشه، اون **Tool Result** تا آخر [Session](/t/wiki-ai/session) داخل [Context](/t/wiki-ai/context) باقی می‌مونه و از ظرفیت [Context Window](/t/wiki-ai/context-window) استفاده می‌کنه. به همین خاطر معمولا بیشترین بخش [Context](/t/wiki-ai/context) توی یه **Coding Agent** رو همین **Tool Result** ها تشکیل میدن.
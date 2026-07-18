---
farsi-title:
english-title: Environment
description: این Environment جاییه که Agent داخلش کار می‌کنه و هر چیزی که Agent می‌تونه بخونه یا تغییر بده بخشی از این محیطه و هر چیزی که بیرون از اون باشه، برای Agent عملاً وجود نداره.
category: tools-and-environment
order: 25
---

 **Environment** یعنی محیط و فضایی که [Agent](/t/wiki-ai/agent) داخلش کار می‌کنه.

خود [Harness](/t/wiki-ai/harness) فقط [Agent](/t/wiki-ai/agent) رو ران می‌کنه، ولی **Environment** همون جاییه که [Agent](/t/wiki-ai/agent) می‌تونه ببینه، بخونه یا داخلش تغییرات ایجاد کنه.

حالا این محیط می‌تونه یه [Filesystem](/t/wiki-ai/filesystem)، یه دیتابیس، یه **API** ، یه مرورگر یا هر چیز دیگه‌ای باشه که [Agent](/t/wiki-ai/agent) بهش دسترسی داره.

یه نکته‌ی مهم اینه که [Agent](/t/wiki-ai/agent) همیشه یه تصویر لایو از **Environment** نداره بلکه فقط از طریق [Tool](/t/wiki-ai/tool) ها میتونه **Environment** رو ببینه.

در واقع، ایجنت فقط یه **snapshot** از **Environment** رو میتونه ببینه.

مثلاً اگه [Agent](/t/wiki-ai/agent) یه فایل رو بخونه و بعد تو بری همون فایل رو دستی تغییر بدی، [Agent](/t/wiki-ai/agent) هنوز فکر می‌کنه فایل همون شکلیه که دفعه‌ی قبل دیده و تا وقتی دوباره فایل رو نخونه، از تغییرات جدید هیچ خبری نداره.

---

برخلاف [Session](/t/wiki-ai/session)، خود **Environment** همیشه [Stateful](/t/wiki-ai/stateful)ـه.

یعنی وقتی یه [Session](/t/wiki-ai/session) تموم میشه، تاریخچه‌ی مکالمه از بین میره، ولی فایل‌ها، دیتابیس یا هر چیزی که داخل **Environment** وجود داره سر جاش می‌مونه. به همین خاطر چیزهایی مثل [AGENTS.md](/t/wiki-ai/agents-md) یا [Memory System](/t/wiki-ai/memory-system) می‌تونن بین [Session](/t/wiki-ai/session)های مختلف اطلاعات رو حفظ کنن.

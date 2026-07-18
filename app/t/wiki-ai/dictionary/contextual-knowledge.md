---
farsi-title:
english-title: Contextual Knowledge
description: یعنی اطلاعاتی که مدل همین الان داخل Context می‌بینه و مستقیم از روشون جواب می‌ده، نه چیزایی که از قبل موقع Training یاد گرفته.
category: failure-modes
order: 39
---
یعنی هر اطلاعاتی که همین الان جلوی چشم [Agent](/t/wiki-ai/agent) قرار گرفته و می‌تونه مستقیم بخونتش.

مثلاً فایل‌هایی که براش آپلود کردی، داکیومنت یه کتابخونه، خروجی یه [Tool](/t/wiki-ai/tool)، محتوای [AGENTS.md](/t/wiki-ai/agents-md) یا حتی چیزایی که تو چت به ایجنت گفتی، اینا همشون میشن **Contextual knowledge** .

این دقیقاً برعکس [Parametric knowledge](/t/wiki-ai/parametric-knowledge)ـه. اون یکی اطلاعاتیه که مدل از قبل موقع [Training](/t/wiki-ai/training) یاد گرفته و از حافظه‌ش **Recall** می‌کنه. ولی **Contextual knowledge** رو اصلاً حفظ نکرده و همون لحظه از روی [Context](/t/wiki-ai/context) می‌خونه.

به خاطر همین، وقتی اطلاعات داخل [Context](/t/wiki-ai/context) باشه، احتمال [Hallucination](/t/wiki-ai/hallucination) خیلی کمتر میشه. چون مدل لازم نیست چیزی رو حدس بزنه یا از حافظه قدیمیش بیرون بکشه و جواب همون جلوی چشمشه.

نکته مهم اینه که تنها چیزی که واقعاً دست خودته همین **Contextual knowledge** ـه. تو نمی‌تونی [Parameters](/t/wiki-ai/parameter) مدل رو تغییر بدی، ولی هر اطلاعات جدیدی که مدل نداره رو می‌تونی داخل [Context](/t/wiki-ai/context) بذاری و برای همین بخش بزرگی از **AI Coding** اینه که اطلاعات درست رو، دقیقاً همون لحظه‌ای که مدل لازم داره، جلوش بذاری.

اگه یه زمانی **Contextual knowledge** با [Parametric knowledge](/t/wiki-ai/parametric-knowledge) مدل اختلاف داشته باشن، معمولاً [Context](/t/wiki-ai/context) برنده میشه. 

یه تفاوت دیگه هم اینه استفاده از **Contextual knowledge** هزینه داره و هر چیزی که وارد [Context](/t/wiki-ai/context) می‌کنی، بخشی از [Context Window](/t/wiki-ai/context-window) و توکن رو مصرف می‌کنه.

پس هدف این نیست که همه‌چی رو بریزی داخل [Context](/t/wiki-ai/context) بلکه هدف اینه که فقط اطلاعاتی که واقعاً به درد اون کار می‌خورن، در لحظه مناسب وارد کانتکست بشن.
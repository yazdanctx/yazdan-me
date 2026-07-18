---
farsi-title:
english-title: memory-system
description: Memory system لایه‌ایه که با ذخیره و بازیابی اطلاعات بین Session ها، باعث میشه یه Agent حافظه‌ی بلندمدت داشته باشه، حتی با اینکه خود Model هیچ چیزی رو بین Session ها به خاطر نمی‌سپاره.
category: memory-and-steering
order: 51
---
این **Memory system** سیستمیه که باعث میشه [Agent](/t/wiki-ai/agent) بین چند [Session](/t/wiki-ai/session) مختلف **Memory** داشته باشه، در حالی که خود [Model](/t/wiki-ai/model) ذاتا [Stateless](/t/wiki-ai/stateless)ـه و بعد از هر [Session](/t/wiki-ai/session) همه‌چیز رو فراموش می‌کنه. 

این سیستم اطلاعات مهم رو موقع کار داخل [Environment](/t/wiki-ai/environment) ذخیره می‌کنه و ابتدای [Session](/t/wiki-ai/session)های بعدی دوباره اون‌ها رو وارد [Context](/t/wiki-ai/context) میکنه، تا مدل حس کنه قبلا هم روی این تسک یا پروژه کار کرده.

حالا این سیستم دو بخش داره. بخش اول میاد چیزهای مهم مثل ترجیحات کاربر، اطلاعات پروژه و اینجور چیزارو رو ذخیره می‌کنه. بخش دوم میاد اول هر [Session](/t/wiki-ai/session) این اطلاعات رو دوباره بارگذاری می‌کنه. 

بعضی [Harness](/t/wiki-ai/harness)ها این قابلیت رو به‌صورت پیشفرض دارن، ولی حالا خودت هم می‌تونی با یه پوشه درست کنی و داخلش یادداشت بنویسی و بعد با یه دستور داخل [AGENTS.md](/t/wiki-ai/agents-md) یه **Memory system** ساده بسازی.

البته **Memory system** هم معمولا بی‌نقص نیست و اگه بیای همه چیو بریزی تو **Memory system** خب طبیعتا [Context](/t/wiki-ai/context) کم کم شلوغ میشه. 

برای همین معمولا فقط یه فهرست کوتاه از حافظه‌ها وارد [Context](/t/wiki-ai/context) میشه و متن کاملشون پشت [Context pointer](/t/wiki-ai/context-pointer) قرار می‌گیره. از طرف دیگه، چون این اطلاعات یه [Secondary source](/t/wiki-ai/secondary-source) هستن، ممکنه با گذشت زمان قدیمی بشن و مثلا یه سری تنظیماتی که سه ماه پیش درست بوده، امروز دیگه بی معنی باشه و برای همین، حافظه‌ها هم مثل [AGENTS.md](/t/wiki-ai/agents-md) باید هر چند وقت یک‌بار بررسی، به‌روزرسانی یا حذف بشن.
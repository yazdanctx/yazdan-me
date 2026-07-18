---
english-title: Prefix cache
description: قابلیت Prefix Cache با نگه داشتن بخش‌های تکراری Context باعث میشه درخواست‌های پشت‌سرهم سریع‌تر و ارزون‌تر اجرا بشن، چون مدل لازم نیست هر بار کل تاریخچه‌ی مکالمه رو دوباره پردازش کنه.
category: the-model
order: 15
---
این **Prefix Cache** یه قابلیته که سمت [Model Provider](/t/wiki-ai/model-provider) قرار داره و باعث میشه مدل مجبور نباشه هر بار کل [Context](/t/wiki-ai/context) رو از اول پردازش کنه.

همون‌طور که تا الان یاد گرفتی، چون [Model](/t/wiki-ai/model) یه سیستم [Stateless](/t/wiki-ai/stateless)ـه، [Harness](/t/wiki-ai/harness) توی هر [Model Provider Request](/t/wiki-ai/model-provider-request) کل تاریخچه‌ی [Session](/t/wiki-ai/session) رو دوباره ارسال می‌کنه. ولی خوشبختانه **Prefix Cache** جلوی این همه پردازش تکراری رو می‌گیره.

فرض کن تا الان ۲۰ تا پیام رد و بدل کردین و فقط یه پیام جدید اضافه شده. بیشتر [Context](/t/wiki-ai/context) دقیقاً همون چیزیه که توی درخواست قبلی هم وجود داشت. [Model Provider](/t/wiki-ai/model-provider) این بخش مشترک رو داخل **Prefix Cache** نگه می‌داره و دفعه‌ی بعد به جای اینکه دوباره از اول پردازشش کنه، فقط از همون جایی ادامه میده که تغییر ایجاد شده.

به همین خاطر، اون بخش تکراری با قیمت خیلی کمتری حساب میشه و بهش [Cache Tokens](/t/wiki-ai/cache-tokens) میگن.

اگه **Prefix Cache** وجود نداشت، هر بار که یه پیام جدید می‌فرستادی، مدل مجبور بود کل تاریخچه‌ی مکالمه رو دوباره از اول پردازش کنه. مثلاً توی یه [Session](/t/wiki-ai/session) پنجاه‌پیامه، پیام اول پنجاه بار پردازش می‌شد.

البته **Prefix Cache** دائمی نیست. معمولاً فقط چند دقیقه فعال می‌مونه. اگه مدت زیادی از [Session](/t/wiki-ai/session) استفاده نکنی، **Cache** منقضی میشه و درخواست بعدی دوباره باید کل [Context](/t/wiki-ai/context) رو با هزینه‌ی کامل پردازش کنه. بعد از اون، **Cache** دوباره ساخته میشه و درخواست‌های بعدی مثل قبل ارزون‌تر میشن.

یه نکته‌ی مهم هم اینه که **Prefix Cache** فقط وقتی کار می‌کنه که ابتدای [Context](/t/wiki-ai/context) تغییر نکرده باشه. اگه مثلاً [Harness](/t/wiki-ai/harness) هر بار یه چیز جدید به اول [System Prompt](/t/wiki-ai/system-prompt) اضافه کنه، **Cache** از همون نقطه از کار میفته و مدل مجبور میشه دوباره همه‌چیز رو از اول پردازش کنه.
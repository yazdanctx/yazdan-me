---
farsi-title: توکن ورودی
english-title: Input tokens
description: توکن ورودی تمام اطلاعاتیه که قبل از هر درخواست به Model فرستاده میشه و چون کل Session بارها و بارها ارسال میشه، معمولاً بخش بزرگی از هزینه‌ی کار با LLM ها از همین Input Tokens میاد.
category: the-model
order: 13
---
توکن ورودی یا **Input Tokens** همون [Token](/t/wiki-ai/token)هایی هستن که [Harness](/t/wiki-ai/harness) قبل از هر درخواست برای [Model](/t/wiki-ai/model) می‌فرسته. یعنی هر چیزی که مدل باید بخونه، مثل [System Prompt](/t/wiki-ai/system-prompt)، تاریخچه‌ی مکالمه، نتیجه‌ی [Tool](/t/wiki-ai/tool)ها و هر اطلاعات دیگه‌ای که داخل [Context](/t/wiki-ai/context) قرار داره.

معمولا هزینه‌ی **Input Tokens** از [Output Tokens](/t/wiki-ai/output-tokens) کمتره، چون مدل فقط اون‌ها رو می‌خونه و لازم نیست چیزی تولید کنه.

نکته‌ی مهم اینه که توی **AI Coding** بیشتر هزینه‌ای که پرداخت می‌کنی، مربوط به همین **Input Tokens** ـه، نه جوابی که مدل تولید می‌کنه.

دلیلش هم اینه که [Model](/t/wiki-ai/model) یه سیستم [Stateless](/t/wiki-ai/stateless)ـه و چیزی از درخواست قبلی یادش نمی‌مونه. پس [Harness](/t/wiki-ai/harness) مجبور میشه قبل از هر [Model Provider Request](/t/wiki-ai/model-provider-request) دوباره کل [Session](/t/wiki-ai/session) رو براش بفرسته.

مثلاً اگه الان توی پیام پنجاهم باشی، مدل فقط پیام آخرت رو نمی‌بینه بلکه هر چیزی که از اول این [Session](/t/wiki-ai/session) رد و بدل شده دوباره براش ارسال میشه. در نتیجه ممکنه مدل فقط چند صد **Output Token** تولید کنه، ولی قبلش صدها هزار **Input Token** رو دوباره خونده باشه.

برای اینکه این هزینه کمتر بشه، [Model Provider](/t/wiki-ai/model-provider)ها از چیزی به اسم [Prefix Cache](/t/wiki-ai/prefix-cache) استفاده می‌کنن. اگه بخش زیادی از [Context](/t/wiki-ai/context) نسبت به درخواست قبلی تغییری نکرده باشه، لازم نیست هزینه‌ی کاملش دوباره حساب بشه و با قیمت خیلی کمتری محاسبه میشه.

با این حال، اگه [Session](/t/wiki-ai/session) خیلی طولانی بشه، حتی [Prefix Cache](/t/wiki-ai/prefix-cache) هم همیشه کافی نیست. اون موقع بهترین راه اینه که [Context](/t/wiki-ai/context) رو کوچیک‌تر کنی. ( یه راه ساده اش شروع کردن یه [Session](/t/wiki-ai/session) جدیده )
---
farsi-title:
english-title: Handoff artifact
description: Handoff artifact یه فایل یا داکیومنته که اطلاعات مهم یه Session رو نگه می‌داره تا Sessionهای بعدی بدون از دست دادن روند کار، پروژه رو ادامه بدن.
category: handoffs
order: 46
---
یه فایل یا داکیومنته که برای انتقال اطلاعات از یه [Session](/t/wiki-ai/session) به [Session](/t/wiki-ai/session) بعدی ساخته میشه.

مثلاً یه [Spec](/t/wiki-ai/spec)، یه [Ticket](/t/wiki-ai/ticket)، یه فایل برنامه‌ریزی یا هر داکیومنتی که وضعیت پروژه رو توضیح بده، همشون می‌تونن **Handoff artifact** باشن.

دلیل وجودش هم خیلی ساده‌ست.

چون [Model](/t/wiki-ai/model) کاملا [Stateless](/t/wiki-ai/stateless)ـه، وقتی یه [Session](/t/wiki-ai/session) تموم میشه یا [Clearing](/t/wiki-ai/clearing) انجام میدی، همه‌چیز از بین میره. تصمیم‌هایی که گرفته شده، محدودیت‌های پروژه، کارهایی که نصفه موندن یا هر چیزی که فقط داخل [Context](/t/wiki-ai/context) بوده، دیگه وجود نداره.

ولی فایل‌هایی که داخل [Environment](/t/wiki-ai/environment) ذخیره شدن باقی می‌مونن.

پس به جای اینکه اطلاعات مهم فقط داخل [Context](/t/wiki-ai/context) بمونن، اونا رو داخل یه فایل می‌نویسی تا [Session](/t/wiki-ai/session) بعدی دوباره بخونتش و ادامه کار رو از همونجا انجام بده.

البته **Handoff artifact** خودش یه [Secondary source](/t/wiki-ai/secondary-source)ـه، نه [Primary source](/t/wiki-ai/primary-source).

یعنی حقیقت پروژه نیست؛ فقط روایت اون [Session](/t/wiki-ai/session) از اتفاقاتیه که افتاده.

برای همین ممکنه یه چیزی رو اشتباه نوشته باشه یا یه جزئیات مهم رو جا انداخته باشه.

به خاطر همین، اگه یه ادعا واقعاً مهمه، [Session](/t/wiki-ai/session) جدید نباید کورکورانه قبولش کنه. بهتره بره از روی [Primary source](/t/wiki-ai/primary-source) مثل خود کد یا تست‌ها بررسیش کنه.

یه **Handoff artifact** خوب باید طوری نوشته بشه که انگار کسی که قراره بخونتش، هیچ اطلاعی از پروژه نداره.

مثلا بیای مسیر دقیق فایلها رو ( **File Path** ) رو بنویسی.

یا فقط نگی که قبلا چه تصمیماتی گرفته شده و دلایل رو هم توضیح بدی تا [Session](/t/wiki-ai/session) بعدی دوباره نیاد همون بحث‌ها رو از اول شروع نکنه.

همچنین مشخص باشه چه کارهایی انجام شده، چه چیزهایی مونده و قدم بعدی چیه و این حرفا.

حتی بهتره موقع نوشتنش به [Agent](/t/wiki-ai/agent) بگی این فایل برای یه [Session](/t/wiki-ai/session) کاملا جدیده که هیچ اطلاعاتی از این پروژه نداره. اون وقت داکیومنت کامل‌تر و مستقل‌تر می‌نویسه.

در کنار **Handoff artifact** یه روش دیگه هم برای انتقال اطلاعات وجود داره که اسمش [Compaction](/t/wiki-ai/compaction)ـه. اون خلاصه رو داخل حافظه [Context](/t/wiki-ai/context) منتقل می‌کنه.

ولی **Handoff artifact** دو تا مزیت مهم داره.

اول اینکه روی دیسک ذخیره میشه و قبل از اینکه کسی ازش استفاده کنه، خودت می‌تونی بخونیش و اصلاحش کنی.

دوم اینکه می‌تونی همون فایل رو به چند [Session](/t/wiki-ai/session) مختلف بدی و مثلا پنج تا [Agent](/t/wiki-ai/agent) مختلف همزمان از یه [Spec](/t/wiki-ai/spec) یا **Plan** مشترک استفاده کنن.
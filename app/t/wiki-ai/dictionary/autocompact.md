---
farsi-title:
english-title: Autocompact
description: Autocompact یعنی سیستم به‌صورت خودکار و هنگام پر شدن Context Window یه خلاصه از Session می‌سازه تا کار ادامه پیدا می‌کنه، اما ممکنه بعضی اطلاعات مهم هم ناخواسته از دست برن.
category: handoffs
order: 50
---
این **Autocompact** همون [Compaction](/t/wiki-ai/compaction)ـه، با این تفاوت که دیگه خودت زمانش رو انتخاب نمی‌کنی و وقتی [Context Window](/t/wiki-ai/context-window) تقریباً پر میشه (معمولاً حدود ۸۰٪)، سیستم به‌صورت خودکار یه خلاصه از [Session](/t/wiki-ai/session) می‌سازه، یه [Session](/t/wiki-ai/session) جدید شروع می‌کنه و کار ادامه پیدا می‌کنه و انگار هیچ اتفاقی نیفتاده.

ولی در واقع یه اتفاق خیلی مهم افتاده، چون [Compaction](/t/wiki-ai/compaction) ذاتا یه خلاصس، ممکنه بعضی جزئیات از بین برن. وقتی خودت دستی [Compaction](/t/wiki-ai/compaction) انجام میدی، معمولا بعد از تموم شدن یه مرحله از پروژه این کار رو می‌کنی و حتی می‌تونی به مدل بگی چه چیزهایی حتما داخل خلاصه بمونن. اما **Autocompact** ممکنه دقیقاً وسط یه **Refactor** یا یه کار پیچیده فعال بشه و مدل خودش تصمیم بگیره چه اطلاعاتی مهمن و چه چیزهایی حذف بشن. نتیجه اینه که [Agent](/t/wiki-ai/agent) با اعتمادبه‌نفس به کارش ادامه میده، ولی ممکنه یه محدودیت یا تصمیم مهمی که یک ساعت پیش گرفته بودی رو کاملاً فراموش کرده باشه.

بهترین راه اینه که نذاری **Autocompact** غافلگیرت کنه و قبل از اینکه [Context](/t/wiki-ai/context) پر بشه، خودت دستی [Compaction](/t/wiki-ai/compaction) انجام بدی یا تصمیم‌های مهم رو داخل یه [Handoff artifact](/t/wiki-ai/handoff-artifact) یا [Spec](/t/wiki-ai/spec) ذخیره کنی تا هیچ خلاصه‌ای نتونه از بینشون ببره. حالا خیلی از [Harness](/t/wiki-ai/harness)ها هم اجازه میدن زمان فعال شدن **Autocompact** رو تغییر بدی یا کلا خاموشش کنی تا کنترل بیشتری روی [Context](/t/wiki-ai/context) داشته باشی.
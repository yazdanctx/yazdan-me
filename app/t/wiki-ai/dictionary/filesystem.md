---
farsi-title:
english-title: Filesystem
description: این Filesystem فضای کاری مشترک بین شما و ایجنته، همه‌ی فایل‌های پروژه اونجاس، اما مدل فقط فایل‌هایی را میشناسه که در طول انجام تسک واقعا اونارو خونده باشه.
category: tools-and-environment 
order: 26
---
فایل سیستم، همون ساختار فایل‌ها و فولدرا و ایناست.

اینجا، جاییه که [Agent](/t/wiki-ai/agent) کدها رو می‌خونه، فایل‌ها رو ویرایش می‌کنه و دستورها رو اجرا می‌کنه.

برای یه **Coding Agent** ، **Filesystem** مهم‌ترین بخش [Environment](/t/wiki-ai/environment) محسوب میشه. 

فایل‌هایی مثل [AGENTS.md](/t/wiki-ai/agents-md)، سورس کد، اسکریپت‌ها، تنظیمات پروژه و هر چیزی که داخل پروژه وجود داره، همگی داخل **Filesystem** قرار دارن.

وقتی [Harness](/t/wiki-ai/harness) روی یه پروژه اجرا میشه، در واقع به [Agent](/t/wiki-ai/agent) میگه که با کدوم **Filesystem** کار کنه.

یه نکته‌ی مهم اینه که وجود یه فایل داخل پروژه به این معنی نیست که [Model](/t/wiki-ai/model) محتوای اون رو می‌دونه. تا وقتی [Agent](/t/wiki-ai/agent) با یه [Tool Call](/t/wiki-ai/tool-call) فایل رو نخونه، محتوای اون وارد [Context Window](/t/wiki-ai/context-window) نمیشه و مدل هیچ اطلاعی ازش نداره.

به همین دلیل یه [Agent](/t/wiki-ai/agent) می‌تونه روی پروژه‌هایی کار کنه که میلیون‌ها خط کد دارن. چون لازم نیست همه‌ی فایل‌ها رو یکجا داخل [Context](/t/wiki-ai/context) قرار بده و فقط هر فایلی که برای تسک فعلی لازمه رو می‌خونه.

بعضی [Harness](/t/wiki-ai/harness)ها حتی قبل از شروع، فقط اسم فایل‌ها و پوشه‌ها رو داخل [Context](/t/wiki-ai/context) قرار میدن، نه محتوای اون‌ها. اینطوری [Agent](/t/wiki-ai/agent) می‌فهمه چه فایل‌هایی وجود دارن و هر وقت لازم شد خودش محتوای فایل موردنظر رو می‌خونه.
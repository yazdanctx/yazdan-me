---
farsi-title:
english-title: Context Window
description: Context Window تمام اطلاعاتیه که Model در لحظه می‌بینه و چون ظرفیت محدودی داره، انتخاب اینکه چه اطلاعاتی داخلش قرار بگیرن تأثیر مستقیمی روی کیفیت پاسخ مدل داره.
category: context-windows
order: 19
---

این **Context Window** یعنی تمام اطلاعاتی که [Model](/t/wiki-ai/model) واقعا توی هر [Model Provider Request](/t/wiki-ai/model-provider-request) می‌بینه.

و کلا این تنها راهیه که مدل می‌تونه چیزی از دنیای بیرون بفهمه.

داخل **Context Window** چیزهایی مثل [System Prompt](/t/wiki-ai/system-prompt)، مسج هایی که با ایجنت رد و بدل شده، نتیجه‌ی [Tool](/t/wiki-ai/tool)ها و هر اطلاعات دیگه‌ای قرار می‌گیره که [Harness](/t/wiki-ai/harness) برای مدل فرستاده.

به عبارتی شاید دیروز یه فایل رو ادیت زدی یا سه تا [Session](/t/wiki-ai/session) قبل یه چیز مهمی به مدل گفتی، تا وقتی اون اطلاعات دوباره داخل **Context Window** قرار نگیرن، مدل هیچ اطلاعی ازشون نداره.

---

یه ویژگی مهم **Context Window** اینه که ظرفیتش محدوده. هر مدل یه سقف مشخص برای تعداد [Token](/t/wiki-ai/token)هایی که می‌تونه ببینه داره. هر مسج جدید، هر جواب مدل و هر خروجی [Tool](/t/wiki-ai/tool) مقداری از این ظرفیت رو اشغال می‌کنه.

وقتی این فضا کم‌کم پر بشه، [Harness](/t/wiki-ai/harness) باید تصمیم بگیره بخشی از اطلاعات رو حذف یا خلاصه کنه. به همین خاطره که مفاهیمی مثل [Compaction](/t/wiki-ai/compaction) و [Clearing](/t/wiki-ai/clearing) به وجود اومدن.

از اونجایی که این فضا محدوده پس هر [Token](/t/wiki-ai/token) به شدت ارزشمنده. هر اطلاعات اضافه‌ای که وارد **Context Window** کنی، جا رو از اطلاعات مهم‌تر می‌گیره و حتی ممکنه باعث بشه مدل تمرکزش روی چیزهای بی‌ربط بره.

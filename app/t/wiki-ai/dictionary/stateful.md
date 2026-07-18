---
farsi-title:
english-title: Stateful
description: Stateful یعنی اطلاعات بین مراحل مختلف حفظ میشن، اما این حافظه همیشه توسط Harness یا Environment مدیریت میشه؛ خود Model هیچ‌وقت چیزی رو به خاطر نمی‌سپاره.
category: context-windows
order: 20
---
 **Stateful** یعنی یه سیستم می‌تونه اطلاعات رو نگه داره و توی مراحل بعدی دوباره ازشون استفاده کنه.

مثلاً یه [Session](/t/wiki-ai/session) یه سیستم **Stateful** محسوب میشه چون هر پیامی که رد و بدل میشه به تاریخچه اضافه میشه و [Context](/t/wiki-ai/context) کم‌کم بزرگ‌تر میشه. 

به همین خاطر مدل می‌تونه به چیزهایی که چند مسج قبلی بهش گفتی رو یادش بیاد و ازشون استفاده کنه.

اما خود [Model](/t/wiki-ai/model) هیچ‌وقت **Stateful** نیست و همیشه [Stateless](/t/wiki-ai/stateless) باقی می‌مونه و فقط همون کانتکستی رو می‌بینه که [Harness](/t/wiki-ai/harness) میده دستش.

اگه یه [Agent](/t/wiki-ai/agent) بین چند [Session](/t/wiki-ai/session) مختلف هم چیزهایی رو یادش میمونه، باز هم دلیلش خود مدل نیست بلکه [Harness](/t/wiki-ai/harness) اطلاعات مهم رو داخل فایل‌هایی مثل [AGENTS.md](/t/wiki-ai/agents-md) یا یه [Memory System](/t/wiki-ai/memory-system) ذخیره می‌کنه و دفعه‌ی بعد دوباره اون‌ها رو داخل [Context](/t/wiki-ai/context) قرار میده.

در واقع هر لایه حافظه‌ خودش رو از لایه‌ پایین‌تر می‌گیره. [Session](/t/wiki-ai/session) به خاطر تاریخچه‌ی مکالمه **Stateful** به نظر میاد.

البته این **Stateful** بودن همیشه هم مزیت نیست. اگه اول یه [Session](/t/wiki-ai/session) شما بیای و یه فرض اشتباه وارد [Context](/t/wiki-ai/context) بکنی، اون اشتباه تا آخر مکالمه همراه مدل می‌مونه و برای همین گاهی بهترین کار اینه که [Session](/t/wiki-ai/session) رو **Clear** کنی و دوباره از اول شروع کنی.


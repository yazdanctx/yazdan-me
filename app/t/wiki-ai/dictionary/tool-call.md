---
farsi-title:
english-title: Tool Call
description: Tool Call فقط درخواستی است که Model برای اجرای یک Tool تولید می‌کند، اجرای واقعی آن توسط Harness انجام می‌شود و نتیجه دوباره به مدل برمی‌گردد.
category: tools-and-environment 
order: 28
---
 **Tool Call** در واقع درخواستیه که [Model](/t/wiki-ai/model) برای استفاده از یه [Tool](/t/wiki-ai/tool) تولید می‌کنه.

خود **Tool Call** هیچ کاری انجام نمیده و فقط یه متن ساختاریافته‌ست که داخلش اسم [Tool](/t/wiki-ai/tool) و آرگومان‌های لازم نوشته شده. اجرای واقعی اون به عهده‌ی [Harness](/t/wiki-ai/harness)ه.

مثلاً اگه [Agent](/t/wiki-ai/agent) بخواد یه فایل بخونه، [Model](/t/wiki-ai/model) چیزی شبیه این تولید می‌کنه:

```json
{
  "tool": "Read",
  "path": "src/index.ts"
}
```

این فقط یه متن یا **JSON** ـه. بعد [Harness](/t/wiki-ai/harness) اون رو می‌خونه، بررسی می‌کنه که مجازه یا نه، [Tool](/t/wiki-ai/tool) رو اجرا می‌کنه و نتیجه رو دوباره برای [Model](/t/wiki-ai/model) می‌فرسته.

کل فرآیند اینطوریه: اول [Model](/t/wiki-ai/model) از روی [System Prompt](/t/wiki-ai/system-prompt) یاد می‌گیره چه [Tool](/t/wiki-ai/tool)هایی در اختیارش هست. بعد تصمیم می‌گیره کدوم [Tool](/t/wiki-ai/tool) رو صدا بزنه و یه **Tool Call** تولید می‌کنه. [Harness](/t/wiki-ai/harness) اون رو بررسی و اجرا می‌کنه و در آخر نتیجه‌ی اجرا رو به صورت [Tool Result](/t/wiki-ai/tool-result) داخل یه [Model Provider Request](/t/wiki-ai/model-provider-request) جدید برای مدل می‌فرسته.

از اونجایی که **Tool Call** هم مثل بقیه‌ی خروجی‌های مدل با [Next-token prediction](/t/wiki-ai/next-token-prediction) ساخته میشه، ممکنه اشتباه هم باشه. مثلاً مدل یه مسیر فایل اشتباه بنویسه، اسم یه دستور رو غلط وارد کنه یا آرگومان نامعتبری تولید کنه. [Harness](/t/wiki-ai/harness) هم همون چیزی رو اجرا می‌کنه که مدل نوشته، نه چیزی که مدل «منظورش» بوده.

برای همین گاهی [Agent](/t/wiki-ai/agent) فکر می‌کنه داره روی یه فایل خاص کار می‌کنه، ولی چون **Tool Call** اشتباه بوده، یه فایل دیگه رو ویرایش می‌کنه یا اصلاً دستور اجرا نمیشه.

---
farsi-title:
english-title: AGENTS.md
description: AGENTS.md یه فایل راهنمای دائمیه که اول هر Session به‌صورت خودکار وارد Context میشه تا Agent قوانین و تنظیمات ثابت پروژه رو بدون نیاز به تکرار، همیشه بدونه.
category: memory-and-steering
order: 52
---
این یه فایلیه که داخل پروژه‌ست و اول هر [Session](/t/wiki-ai/session) به‌صورت خودکار وارد [Context](/t/wiki-ai/context) میشه و نقش یه راهنمای دائمی برای [Agent](/t/wiki-ai/agent) رو داره. 

چون [Model](/t/wiki-ai/model) کاملا [Stateless](/t/wiki-ai/stateless)ـه، هر چیزی که توی یه [Session](/t/wiki-ai/session) بهش یاد بدی، توی [Session](/t/wiki-ai/session) بعدی فراموش میشه و **AGENTS.md** این مشکل رو حل می‌کنه، یعنی شما میای یه سری قوانینو یه بار داخل **AGENTS.md** می‌نویسی تا همیشه از اول جلوی چشم [Agent](/t/wiki-ai/agent) باشن.

از اون طرف، چون **AGENTS.md** همیشه لود میشه، هر خطی که داخلش اضافه می‌کنی توی هر [Session](/t/wiki-ai/session) هم [Token](/t/wiki-ai/token) مصرف می‌کنه و هم بخشی از **Attention** مدل رو می‌گیره و اگه بیش از حد بزرگ بشه، هم هزینه‌ی [Context](/t/wiki-ai/context) بالا میره و هم احتمال اینکه مدل به هر دستور به‌درستی عمل کنه کمتر میشه. برای همین، بایستی فقط قوانین مهم و همیشگی رو داخلش نگه داری و چیزهای بزرگ‌تر مثل داکیومنت‌های طولانی رو از طریق [Skill](/t/wiki-ai/skill) یا [Context pointer](/t/wiki-ai/context-pointer) در اختیار [Agent](/t/wiki-ai/agent) بذاری.
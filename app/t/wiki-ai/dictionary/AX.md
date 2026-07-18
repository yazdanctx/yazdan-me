---
farsi-title:
english-title: AX
description: AX یعنی تجربه‌ی کاری agent داخل یک پروژه و هرچقدر پروژه برای فهمیدن، پیمایش و اصلاح خودکار خطاها مناسب‌تر باشه، AX بهتری داره.
category: failure-modes
order: 64
---
 **AX** یا **Agent Experience** یعنی یه پروژه چقدر برای کار کردنِ [agent](/t/wiki-ai/agent) آماده و بهینه شده. اگه یه [agent](/t/wiki-ai/agent) با یه [model](/t/wiki-ai/model) و [harness](/t/wiki-ai/harness) ثابت توی یه پروژه عالی عمل کنه ولی توی یه پروژه‌ی دیگه ضعیف باشه، معمولا مشکل از خود پروژه است و نه از [agent](/t/wiki-ai/agent).

یه **AX** خوب سه ویژگی اصلی داره: اول، **automated check** های سریع و قابل اعتماد مثل **test** ، **lint** و **type check** که [agent](/t/wiki-ai/agent) بتونه خودش از روی خطاها اشتباه‌هاش رو اصلاح کنه. دوم، معماری ساده و قابل پیش‌بینی که بدون خوندن کل پروژه بتونه مسیرش رو پیدا کنه. سوم، [context](/t/wiki-ai/context) سبک؛ یعنی [AGENTS.md](/t/wiki-ai/agents-md)، **skills** و **tools** فقط اطلاعات ضروری رو نگه دارن تا بیشترِ [context window](/t/wiki-ai/context-window) برای حل خود تسک آزاد بمونه. **AX** و [DX](/t/wiki-ai/dx) خیلی جاها شبیه هم هستن، ولی یکی نیستن. مثلاً ممکنه یه پروژه برای برنامه‌نویس‌ها عالی باشه، چون همه از تجربه‌ی همدیگه کمک می‌گیرن یا یه نفر همیشه جواب سؤال‌ها رو میده. اما [agent](/t/wiki-ai/agent) به این چیزها دسترسی نداره و فقط چیزهایی رو می‌بینه که داخل [environment](/t/wiki-ai/environment) و [tool result](/t/wiki-ai/tool-result)ها وجود دارن. برای همین ممکنه یه پروژه [DX](/t/wiki-ai/dx) خوبی داشته باشه، ولی **AX** ضعیفی داشته باشه.



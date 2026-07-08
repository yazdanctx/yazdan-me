import { toJalaali } from "jalaali-js";

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const persianMonthNames = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

function toPersianDigits(num: number): string {
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPersianDate(dateStr: string): string {
  const date = new Date(dateStr);
  const j = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  return `${toPersianDigits(j.jd)} ${persianMonthNames[j.jm - 1]} ${toPersianDigits(j.jy)}`;
}

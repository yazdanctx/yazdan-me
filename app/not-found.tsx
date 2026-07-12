import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-bold">۴۰۴</h1>
      <p>صفحه‌ای که دنبالش هستی وجود نداره.</p>
      <Link href="/" className="link">
        برگرد به خونه
      </Link>
    </div>
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "free-ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "app/fonts/IRANYekanXFaNum-Bold.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          free-ai
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          لیست پلتفرم‌های رایگان هوش مصنوعی
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IRANYekanX",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

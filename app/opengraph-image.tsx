import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ez ai access / free models";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const imageData = await readFile(join(process.cwd(), "app/assets/pfp.jpg"), {
    encoding: "base64",
  });
  const imageSrc = `data:image/jpeg;base64,${imageData}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={imageSrc}
        width={320}
        height={320}
        alt=""
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>,
    { ...size },
  );
}

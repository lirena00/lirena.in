import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (resource?.[1]) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Blog Post";
  const date = searchParams.get("date") ?? "";
  const readingTime = searchParams.get("readingTime") ?? "";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full bg-[#111111] text-white relative overflow-hidden">
        <div tw="flex flex-col justify-between w-full h-full p-6 relative z-10">
          <div tw="flex items-center mb-4">
            <div tw="w-8 h-0.5 bg-[#32dfa0] mr-2 rounded-full"></div>
            <span tw="text-sm font-medium text-[#32dfa0] tracking-wide">
              lirena00
            </span>
          </div>

          <div
            style={{ fontFamily: "Jetbrains Mono" }}
            tw="flex flex-col flex-1 justify-center max-w-full"
          >
            <h1 tw="text-2xl font-bold mb-3 text-[#f2e0d9] leading-tight tracking-tight">
              {title}
            </h1>
          </div>

          <div tw="flex items-center justify-between pt-4">
            <div
              style={{ fontFamily: "Jetbrains Mono", gap: "6px" }}
              tw="flex items-center text-[#8fd8bd]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span tw="text-xs font-medium">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div
              style={{ fontFamily: "Jetbrains Mono", gap: "6px" }}
              tw="flex items-center text-[#8fd8bd]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6V12L16 14" />
              </svg>
              <span tw="text-xs font-medium">
                {Math.ceil(Number(readingTime))} min
              </span>
            </div>
          </div>
        </div>

        <div tw="absolute bottom-0 left-0 h-0.5 w-full bg-[#32dfa0] opacity-80"></div>
        <div tw="absolute bottom-1 left-0 h-0.25 w-full bg-[#32dfa0] opacity-60"></div>
      </div>
    ),
    {
      width: 420,
      height: 300,
      fonts: [
        {
          name: "Jetbrains Mono",
          data: await loadGoogleFont("JetBrains+Mono", title),
          style: "normal",
        },
        {
          name: "Jetbrains Mono",
          data: await loadGoogleFont("JetBrains+Mono", date),
          style: "normal",
        },
        {
          name: "Jetbrains Mono",
          data: await loadGoogleFont("JetBrains+Mono", readingTime),
          style: "normal",
        },
      ],
    },
  );
}

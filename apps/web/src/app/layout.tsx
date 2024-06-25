import "../styles/globals.css";
import { fonts, twMerge } from "@ikigai/ui/lib";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Ikigai",
  description: "Productivty management done differently...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={twMerge(
            "overflow-y-hidden bg-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
            fonts.sans.className,
            fonts.mono.className,
          )}
          style={{
            height: "100dvh",
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import "../styles/globals.css";
import fonts from "@repo/ui/font";

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
          className={`min-h-screen ${fonts.sans.className} ${fonts.mono.className}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

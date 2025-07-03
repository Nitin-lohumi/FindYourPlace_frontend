import type { Metadata } from "next";
import ReactQuery from "@/providers/ReactQuery";
import StateProvider from "@/providers/StateProvider";
import "./globals.css";
import Header from "@/component/Header";
export const metadata: Metadata = {
  title: "Tour and Travel app",
  description:
    "the app which suggest nearby locations to visit, make trip and plan",
  icons: {
    icon: "/next.svg",
  },
  authors: [{ name: "Nitin Lohumi", url: "https://your-portfolio.com" }],
  applicationName: "TourApp",
  keywords: ["travel", "trip", "vacation", "planner"],
};
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LocationWrapper from "@/providers/LocationWrapper";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="backgroundColor">
      <body>
        <StateProvider>
          <ReactQuery>
            <Header />
            <main>
              <LocationWrapper>{children}</LocationWrapper>
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQuery>
        </StateProvider>
      </body>
    </html>
  );
}

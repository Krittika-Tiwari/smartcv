import type { Metadata } from "next";
import { Inter, PT_Serif, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const ptserif = PT_Serif({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - SmartCV",
    absolute: "SmartCV",
  },
  description:
    "SmartCV is the easiest way to create a proffessional resume that will help you land your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.className} ${ptserif.variable} ${roboto.className}`}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

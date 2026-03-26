import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "ChariDay | شاري داي - منصة التجارة الإلكترونية",
  description: "منصة شاري داي للتجارة الإلكترونية - تسوق آمن وموثوق بأفضل الأسعار في الجزائر. إلكترونيات، ملابس، منزل وأكثر.",
  keywords: ["شاري داي", "ChariDay", "تجارة إلكترونية", "تسوق أونلاين", "الجزائر", "ecommerce", "online shopping"],
  authors: [{ name: "ChariDay Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ChariDay | شاري داي",
    description: "منصة التجارة الإلكترونية الرائدة في الجزائر",
    type: "website",
    locale: "ar_DZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChariDay | شاري داي",
    description: "منصة التجارة الإلكترونية الرائدة في الجزائر",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cairo.variable}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

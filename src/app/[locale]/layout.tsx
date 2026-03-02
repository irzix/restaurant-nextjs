import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kyma Cyprus | Mediterranean Gastronomy",
  description: "Experience the essence of the Mediterranean at Kyma Cyprus. Fresh flavors, coastal vibes, and authentic hospitality in the heart of Limassol.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === 'fa' ? 'rtl' : 'ltr';
  const fontClass = locale === 'fa' ? 'font-vazir' : 'font-gilda';

  return (
    <html lang={locale} dir={direction}>
      <body className={`min-h-screen antialiased ${fontClass} bg-[#111] text-white overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

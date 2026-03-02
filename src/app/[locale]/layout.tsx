import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Gilda_Display, Barlow, Barlow_Condensed } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const gildaDisplay = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gilda',
  display: 'swap',
});

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-c',
  display: 'swap',
});

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

  return (
    <html lang={locale} dir={direction} className={`${gildaDisplay.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className={`min-h-screen antialiased ${locale === 'fa' ? 'font-vazir' : ''} bg-[#111] text-white overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

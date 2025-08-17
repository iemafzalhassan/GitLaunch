import type { Metadata } from 'next';
import { Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk' 
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'GitLaunch',
  description: 'Enhance your GitHub README with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${sourceCodePro.variable} font-body antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

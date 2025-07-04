import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
// import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Professional author typography system
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anna Lea - Inspirational Christian Books",
  description: "Discover inspiring Christian stories by Anna Lea Cannon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${lora.variable} ${sourceSans.variable} antialiased`}
      >
        {/* CartProvider disabled for Phase 3 - Amazon integration coming */}
        {/* <CartProvider> */}
          <Header />
          <div style={{ paddingTop: '80px' }}> {/* Account for fixed header */}
            {children}
          </div>
          
          {/* Social Media Icons at Bottom of Page - Like Cathy Carr */}
          <div className="py-8 text-center" style={{ backgroundColor: 'var(--cream)' }}>
            <div className="flex justify-center gap-4">
              <a href="https://facebook.com/annaleacannon" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                 style={{ backgroundColor: 'var(--sage-green)' }}>
                <span className="text-white text-lg font-bold">f</span>
              </a>
              <a href="https://instagram.com/annaleacannon" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                 style={{ backgroundColor: 'var(--burgundy)' }}>
                <span className="text-white text-sm font-bold">ig</span>
              </a>
              <a href="https://youtube.com/@annaleacannon" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                 style={{ backgroundColor: 'var(--golden-honey)' }}>
                <span className="text-white text-sm font-bold">yt</span>
              </a>
            </div>
          </div>
          
          {/* <Footer /> */}
        {/* </CartProvider> */}
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
const inter = Inter({ subsets: ["latin"] });

import { AuthProvider } from "@/Components/Provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (
    <html data-theme="dark">
      <body className={inter.className}>
        <AuthProvider>

          <Navbar />
          {children}
          <Footer />

        </AuthProvider>

      </body>
    </html>
  );
}

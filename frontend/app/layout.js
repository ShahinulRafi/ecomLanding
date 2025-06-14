import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        <main className="max-w-6xl mx-auto p-4">{children}</main>
        <Footer />    
      </body>
    </html>
  );
}

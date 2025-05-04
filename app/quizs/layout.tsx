import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizapp - Test Your Knowledge!",
  description: "",
};

export default function QuizsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
    <Navbar />
        <main>{children}</main>
        <Footer/>
    </>
     
  );
}

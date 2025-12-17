import type { Metadata } from "next";
import { Outfit, Allura } from "next/font/google";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";
import Cursor from "@/components/Cursor";
import BottomBlur from "@/components/BottomBlur";
import { CursorProvider } from "@/components/CursorContext";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

const allura = Allura({
    variable: "--font-allura",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "My Portfolio",
    description: "Designing with humans at the centre.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${outfit.variable} ${allura.variable} antialiased font-sans relative overflow-x-hidden text-black`}
            >
                <CursorProvider>
                    <ShaderBackground />
                    <Cursor />
                    {children}
                    <BottomBlur />
                </CursorProvider>
            </body>
        </html>
    );
}

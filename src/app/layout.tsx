import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./_components/navbar/navbar";
import { SidebarProvider } from "@/components/ui/sidebar"
import { ToastContainer } from "react-toastify";
import { SessionProviderr } from "@/MySessionProvider/MySessionProvider";
import NavBarTwo from "@/app/_components/navBarTwo/navBarTwo";
import Footer from "@/app/_components/footer/footer";

const exo = localFont({
  src: [
    { path: "./fonts/exo-100.ttf", weight: "100" },
    { path: "./fonts/exo-200.ttf", weight: "200" },
    { path: "./fonts/exo-300.ttf", weight: "300" },
    { path: "./fonts/exo-400.ttf", weight: "400" },
    { path: "./fonts/exo-500.ttf", weight: "500" },
    { path: "./fonts/exo-600.ttf", weight: "600" },
    { path: "./fonts/exo-700.ttf", weight: "700" },
    { path: "./fonts/exo-800.ttf", weight: "800" },
    { path: "./fonts/exo-900.ttf", weight: "900" },
  ],
  variable: "--font-exo",
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`${exo.variable} min-h-full flex flex-col`}>
        <SessionProviderr>
          <SidebarProvider defaultOpen={false}>
            <div className="w-full flex flex-col min-h-screen">
              <NavBarTwo />
              <main className="flex-1 bg-[#FBFCFD]">
                <ToastContainer />
                {children}
              </main>
              <Footer/>
            </div>
          </SidebarProvider>
        </SessionProviderr>
      </body>
    </html>
  );
}

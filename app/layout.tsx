import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
      <Header />
      <div className="childrenWrapper" style={{ paddingTop: '60px' }}>
        {children}
      </div>
      </body>
    </html>
  );
}

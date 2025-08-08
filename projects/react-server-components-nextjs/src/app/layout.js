import Link from "next/link";
import "doodle.css/doodle.css";
import "./globals.css";

export const metadata = {
  title: "Note Passer",
  description: "React Server Components with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="doodle">
        <header>
          <nav>
            <h1>
              <Link href="/">Note Passer</Link>
            </h1>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

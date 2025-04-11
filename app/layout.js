import Link from 'next/link';
import './globals.css';
import DarkModeToggle from './components/DarkModeToggle';

export const metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-blue-600 dark:bg-blue-900 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold">My Blog</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center p-4">
          <p>© 2025 My Blog</p>
        </footer>
      </body>
    </html>
  );
}
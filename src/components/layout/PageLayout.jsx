/**
 * Page shell: header + main content + footer. Reusable for all pages.
 */
import { Header } from './Header';
import { Footer } from './Footer';

export function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface pt-[72px] md:pt-[80px]">{children}</main>
      <Footer />
    </>
  );
}

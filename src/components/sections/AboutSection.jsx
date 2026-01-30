import { Logo } from '../ui/Logo';
import { aboutBio } from '../../data/about';

/**
 * About section: left = logo, right = full biography.
 */
export function AboutSection() {
  return (
    <section id="about" className="border-t border-tertiary/10 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          <div className="flex justify-center md:justify-start">
            <Logo href="/#home" variant="dark-bg" className="h-16 w-auto md:h-20" />
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
              About
            </h2>
            <div className="space-y-4 text-tertiary/80 leading-relaxed whitespace-pre-line">
              {aboutBio}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

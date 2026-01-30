import { ContactForm } from '../contact/ContactForm';
import { SocialLinks } from '../ui/SocialLinks';

/**
 * Contact section: intro, form, and social links.
 */
export function ContactSection() {
  return (
    <section id="contact" className="border-t border-tertiary/10 bg-primary/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
          Contact
        </h2>
        <p className="mb-10 text-tertiary/80 leading-relaxed">
          For commissions and inquiries, reach out. Let’s create something beautiful together.
        </p>

        <ContactForm />

        <div className="mt-12 pt-10 border-t border-tertiary/10">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-tertiary/70">
            Follow
          </p>
          <SocialLinks linkClassName="text-tertiary/70 hover:text-secondary" />
        </div>
      </div>
    </section>
  );
}

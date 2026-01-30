/**
 * Contact section for the Home page.
 */
export function ContactSection() {
  return (
    <section id="contact" className="border-t border-tertiary/10 bg-primary/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
          Contact
        </h2>
        <p className="text-tertiary/80 leading-relaxed">
          For commissions and inquiries, reach out. Let’s create something beautiful together.
        </p>
      </div>
    </section>
  );
}

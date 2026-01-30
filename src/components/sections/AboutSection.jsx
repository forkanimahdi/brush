/**
 * About section for the Home page.
 */
export function AboutSection() {
  return (
    <section id="about" className="border-t border-tertiary/10 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
          About
        </h2>
        <p className="text-tertiary/80 leading-relaxed">
          Hanane Brush is a calligraphic artist blending traditional script with contemporary
          expression. Each piece is crafted with intention and precision.
        </p>
      </div>
    </section>
  );
}

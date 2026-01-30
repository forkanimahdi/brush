/**
 * Dark accent banner with an art quote. Used after each major section on Home.
 */
export function StatementBand({ quote }) {
  return (
    <section className="bg-secondary py-16 md:py-20" aria-hidden>
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
        <p className="text-lg font-light tracking-wide text-quaternary md:text-xl">
          {quote}
        </p>
      </div>
    </section>
  );
}

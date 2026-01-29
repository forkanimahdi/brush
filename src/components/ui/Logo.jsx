import logoSrc from '../../assets/images/logo.png';

/**
 * Reusable logo. variant "dark-bg" = light logo on dark; "light-bg" = dark logo on light.
 */
export function Logo({ className = '', href = '#home', alt = 'Hanane Brush', variant = 'dark-bg' }) {
  const invertClass = variant === 'light-bg' ? 'invert' : '';
  const img = (
    <img
      src={logoSrc}
      alt={alt}
      className={`h-10 w-auto object-contain md:h-12 ${invertClass} ${className}`.trim()}
      width={160}
      height={48}
    />
  );

  if (href) {
    return (
      <a href={href} className="inline-block focus:outline-none focus:ring-2 focus:ring-primary/50 rounded">
        {img}
      </a>
    );
  }

  return img;
}

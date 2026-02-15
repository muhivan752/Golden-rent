import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'white';
  size?: 'md' | 'lg';
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
}

const variants = {
  primary: 'bg-gold text-navy-900 hover:bg-gold-300 shadow-lg shadow-gold/25',
  secondary: 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60',
  dark: 'bg-navy text-white hover:bg-navy-700 shadow-lg',
  white: 'bg-white text-navy hover:bg-slate-100 shadow-lg',
};

const sizes = {
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}

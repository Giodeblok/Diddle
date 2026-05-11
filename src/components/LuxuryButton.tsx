import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LuxuryButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function LuxuryButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  className = '',
  fullWidth = false,
  type = 'button',
  disabled = false,
}: LuxuryButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans tracking-[0.12em] uppercase transition-all duration-500 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-anthracite text-ivory hover:bg-brown border border-anthracite hover:border-brown shadow-soft hover:shadow-luxury',
    secondary:
      'bg-gold-gradient text-anthracite hover:opacity-90 shadow-gold hover:shadow-luxury',
    ghost:
      'bg-transparent text-anthracite border border-gold hover:bg-gold/10 hover:border-gold-deep',
    outline:
      'bg-transparent text-ivory border border-ivory/40 hover:bg-ivory/10 hover:border-ivory',
  };

  const sizes = {
    sm: 'text-xs px-5 py-2.5',
    md: 'text-xs px-7 py-3.5',
    lg: 'text-sm px-9 py-4',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    transition: { duration: 0.2 },
  };

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={classes}>
          {children}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}

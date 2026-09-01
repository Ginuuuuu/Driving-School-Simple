import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'amber' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'left',
  isLoading = false,
  isExternal = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100 select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[50px] shadow-sm',
    xl: 'text-lg px-8 py-3.5 gap-3 min-h-[56px] shadow-md font-bold',
  };

  const variantStyles = {
    primary: 'bg-[#BC2639] hover:bg-[#5F1618] active:bg-[#39340F] text-white shadow-sm hover:shadow-glow-crimson focus-visible:ring-[#BC2639]',
    secondary: 'bg-[#9FBAB4] hover:bg-[#404D68] hover:text-white active:bg-[#39340F] text-[#39340F] shadow-sm focus-visible:ring-[#404D68]',
    amber: 'bg-[#BC2639] hover:bg-[#5F1618] text-white font-bold shadow-sm focus-visible:ring-[#BC2639]',
    outline: 'border-2 border-[#D4E2DF] hover:border-[#BC2639] text-[#39340F] hover:bg-[#FFF5F8] focus-visible:ring-[#BC2639]',
    ghost: 'text-[#39340F] hover:bg-[#FFC5DC]/30 hover:text-[#39340F] focus-visible:ring-[#404D68]',
    whatsapp: 'bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold shadow-sm hover:shadow-md focus-visible:ring-[#25D366]',
    danger: 'bg-[#BC2639] hover:bg-[#5F1618] text-white focus-visible:ring-[#BC2639]',
  };

  const combinedClasses = twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className));

  const content = (
    <>
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className="inline-flex shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' ? (
        <span className="inline-flex shrink-0">{icon}</span>
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};


import React from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  variant?: 'live' | 'soon' | 'success' | 'warning' | 'default';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  pulse?: boolean;
};

const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  dot = false,
  pulse = false,
}: BadgeProps) => {
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-3',
    lg: 'text-base py-1.5 px-4',
  };

  // Variant classes
  const variantClasses = {
    live: 'bg-live/10 text-live border border-live/20',
    soon: 'bg-soon/10 text-soon border border-soon/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    default: 'bg-primary/10 text-primary border border-primary/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all',
        sizeClasses[size],
        variantClasses[variant],
        pulse && variant === 'live' && 'animate-pulse-live',
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            {
              'bg-live': variant === 'live',
              'bg-soon': variant === 'soon',
              'bg-success': variant === 'success',
              'bg-warning': variant === 'warning',
              'bg-primary': variant === 'default',
            }
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;

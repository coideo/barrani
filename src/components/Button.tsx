import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { cn } from 'utils/class-names';
import Loading from './Loading';

const SIZES = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm leading-4',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};
type Size = keyof typeof SIZES;
const Sizes = Object.fromEntries(Object.keys(SIZES).map((s) => [s, s])) as { [key in Size]: key };

const ButtonLoading: FC<{ bg: string; className: string; size?: Size }> = ({
  bg,
  className,
  size,
}) => (
  <div className={cn('absolute inset-0', bg)}>
    <Loading className={className} size={size} />
  </div>
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
  flat?: boolean;
  kind?: { bg: string; button: string; loading: string };
  loading?: boolean;
  size?: Size;
};

const Button = ({
  block,
  children,
  className,
  disabled,
  flat = false,
  kind = { bg: '', button: '', loading: '' },
  loading = false,
  size = 'md',
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={cn(
      'relative overflow-hidden inline-flex items-center justify-center shadow-sm border border-transparent font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed',
      block && 'w-full',
      !flat && 'rounded-md',
      SIZES[size],
      kind.bg,
      kind.button,
      className
    )}
    disabled={disabled || loading}
    type="button"
    {...props}
  >
    {children}
    {loading && <ButtonLoading bg={kind.bg} className={kind.loading} size={size} />}
  </button>
);

Button.Sizes = Sizes;

export default Button;

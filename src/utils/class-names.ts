const cn = (...classes: (false | null | undefined | string)[]): string =>
  classes.filter(Boolean).join(' ');

export { cn };

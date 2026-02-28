import * as React from 'react';
import { cn } from '@/lib/utils';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

function Label(props: LabelProps) {
  const { className, ...rest } = props;
  return <label className={cn('text-sm font-medium leading-none', className)} {...rest} />;
}

export { Label };

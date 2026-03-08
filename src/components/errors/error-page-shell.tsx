import type { ReactNode } from 'react';

type ErrorPageShellProps = {
  code: string;
  title: string;
  description: string;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
};

export function ErrorPageShell({ code, title, description, primaryAction, secondaryAction }: ErrorPageShellProps) {
  return (
    <section className="px-6 py-16 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-190px)] w-full max-w-4xl items-center justify-center">
        <div className="w-full text-center">
          <p className="text-sm font-semibold tracking-[0.24em] text-[#4D7BE6]">{code}</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#002A6A] sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-base leading-relaxed text-[#33507D]">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primaryAction}
            {secondaryAction}
          </div>
        </div>
      </div>
    </section>
  );
}

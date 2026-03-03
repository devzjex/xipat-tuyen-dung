'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

import { cn } from '@/lib/utils';

type AsTag = 'div' | 'article' | 'section' | 'main';

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  as?: AsTag;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
  blur?: number;
};

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  amount?: number;
};

type MotionStaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: AsTag;
  duration?: number;
  y?: number;
  blur?: number;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const MOTION_COMPONENTS = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
  main: motion.main,
} as const;

const defaultViewport = (amount?: number) => ({
  once: true,
  amount: amount ?? 0.24,
  margin: '0px 0px -10% 0px',
});

function revealVariants(opts: { reduce: boolean; y: number; blur: number }): Variants {
  const { reduce, y, blur } = opts;

  if (reduce) {
    return {
      hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 1, y: 0, filter: 'blur(0px)' },
    };
  }

  return {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { ease: EASE_OUT },
    },

    exit: { opacity: 0, y: -8, filter: `blur(${blur}px)`, transition: { duration: 0.2, ease: EASE_OUT } },
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function MotionReveal({
  children,
  className,
  as = 'div',
  delay = 0,
  duration = 0.56,
  y = 16,
  amount = 0.24,
  blur = 6,
}: MotionRevealProps) {
  const reduce = useReducedMotion();
  const MotionComponent = MOTION_COMPONENTS[as];

  const variants = revealVariants({ reduce: !!reduce, y, blur });

  return (
    <MotionComponent
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={defaultViewport(amount)}
      variants={variants}
      transition={reduce ? { duration: 0 } : { duration, delay, ease: EASE_OUT }}
      style={reduce ? undefined : { willChange: 'transform, opacity, filter' }}
    >
      {children}
    </MotionComponent>
  );
}

export function MotionStagger({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.06,
  amount = 0.2,
}: MotionStaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport(amount)}
      variants={
        reduce
          ? containerVariants
          : {
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren,
                  staggerChildren,
                },
              },
            }
      }
      style={reduce ? undefined : { willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
  as = 'div',
  duration = 0.48,
  y = 12,
  blur = 6,
}: MotionStaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionComponent = MOTION_COMPONENTS[as];

  const variants = revealVariants({ reduce: !!reduce, y, blur });

  return (
    <MotionComponent
      className={cn(className)}
      variants={variants}
      transition={reduce ? { duration: 0 } : { duration, ease: EASE_OUT }}
      style={reduce ? undefined : { willChange: 'transform, opacity, filter' }}
    >
      {children}
    </MotionComponent>
  );
}

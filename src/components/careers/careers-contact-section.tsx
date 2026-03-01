'use client';

import { ArrowRight, CheckCircle2, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { executeRecaptchaV3 } from '@/lib/recaptcha-client';
import { cn } from '@/lib/utils';

type ContactSocial = {
  platform: 'facebook' | 'linkedin';
  href: string;
  ariaLabel: string;
};

type ContactValidationCopy = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  messageRequired: string;
  messageMin: string;
};

type CareersContactSectionProps = {
  badge: string;
  title: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
  submitSuccessTitle: string;
  submitSuccessDescription: string;
  submitErrorMessage: string;
  socials: ContactSocial[];
  validation: ContactValidationCopy;
};

const iconMap = {
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

export function CareersContactSection({
  badge,
  title,
  nameLabel,
  emailLabel,
  phoneLabel,
  messageLabel,
  submitLabel,
  submitSuccessTitle,
  submitSuccessDescription,
  submitErrorMessage,
  socials,
  validation,
}: CareersContactSectionProps) {
  const { toast } = useToast();

  const schema = z.object({
    name: z.string().trim().min(1, validation.nameRequired),
    email: z.string().trim().min(1, validation.emailRequired).email(validation.emailInvalid),
    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((value) => !value || /^\+?[0-9()\-\s.]{9,20}$/.test(value), validation.phoneInvalid),
    message: z.string().trim().min(1, validation.messageRequired).min(10, validation.messageMin),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const fieldClassName = (hasError: boolean) =>
    cn(
      'mt-3 h-12 rounded-none border-0 border-b-2 bg-transparent px-0 text-lg text-[#113C8D] shadow-none outline-none placeholder:text-[#8A9AC0] focus-visible:ring-0',
      hasError ? 'border-[#C63737]' : 'border-[#5D86D8]',
    );

  const onSubmit = async (values: FormValues) => {
    form.clearErrors();

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string') {
          form.setError(field as keyof FormValues, { type: 'manual', message: issue.message });
        }
      }
      return;
    }

    try {
      const recaptchaToken = await executeRecaptchaV3('career_contacts');
      const formData = new FormData();
      formData.append('name', parsed.data.name);
      formData.append('email', parsed.data.email);
      formData.append('phone', parsed.data.phone || '');
      formData.append('message', parsed.data.message);
      formData.append('recaptchaToken', recaptchaToken);

      console.log('[CareersContactSection] Contact payload:', Object.fromEntries(formData.entries()));

      const response = await fetch('/api/career-contacts', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('[CareersContactSection] Contact response:', result);

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: submitErrorMessage,
          description: result?.message || submitErrorMessage,
        });
        return;
      }

      toast({
        title: (
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0D7A3B]" />
            {submitSuccessTitle}
          </span>
        ),
        description: submitSuccessDescription,
      });
      form.reset();
    } catch (error) {
      console.error('[CareersContactSection] Contact error:', error);
      toast({
        variant: 'destructive',
        title: submitErrorMessage,
        description: submitErrorMessage,
      });
    }
  };

  return (
    <section className="bg-[#F3F5F8]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div>
            <p className="text-xl font-medium text-[#113C8D]">{badge}</p>
            <h2 className="mt-4 max-w-4xl text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl">
              {title}
            </h2>
          </div>

          <div className="flex items-start lg:pt-6">
            <div className="flex gap-3 lg:flex-col">
              {socials.map((social) => {
                const Icon = iconMap[social.platform];
                return (
                  <Link
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.ariaLabel}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#B7BECC] text-[#113C8D] transition-colors hover:border-[#113C8D] hover:bg-white"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="mt-10 sm:mt-12">
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <Label htmlFor="contact-name" className="text-xl font-medium text-[#113C8D]">
                {nameLabel} <span className="text-[#C63737]">*</span>
              </Label>
              <Input
                id="contact-name"
                type="text"
                className={fieldClassName(Boolean(form.formState.errors.name))}
                {...form.register('name')}
              />
              {form.formState.errors.name ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.name.message}</p>
              ) : null}
            </label>

            <label className="block">
              <Label htmlFor="contact-email" className="text-xl font-medium text-[#113C8D]">
                {emailLabel} <span className="text-[#C63737]">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                className={fieldClassName(Boolean(form.formState.errors.email))}
                {...form.register('email')}
              />
              {form.formState.errors.email ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.email.message}</p>
              ) : null}
            </label>

            <label className="block md:col-span-2 lg:col-span-1">
              <Label htmlFor="contact-phone" className="text-xl font-medium text-[#113C8D]">
                {phoneLabel}
              </Label>
              <Input
                id="contact-phone"
                type="tel"
                className={fieldClassName(Boolean(form.formState.errors.phone))}
                {...form.register('phone')}
              />
              {form.formState.errors.phone ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.phone.message}</p>
              ) : null}
            </label>
          </div>

          <label className="mt-8 block sm:mt-10">
            <Label htmlFor="contact-message" className="text-xl font-medium text-[#113C8D]">
              {messageLabel} <span className="text-[#C63737]">*</span>
            </Label>
            <Textarea
              id="contact-message"
              rows={4}
              className={cn(
                'mt-3 min-h-[120px] resize-none rounded-none border-0 border-b-2 bg-transparent px-0 pb-2 text-lg text-[#113C8D] shadow-none outline-none placeholder:text-[#8A9AC0] focus-visible:ring-0',
                form.formState.errors.message ? 'border-[#C63737]' : 'border-[#5D86D8]',
              )}
              {...form.register('message')}
            />
            {form.formState.errors.message ? (
              <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.message.message}</p>
            ) : null}
          </label>

          <Button
            type="submit"
            className="mt-9 inline-flex h-14 min-w-64 cursor-pointer items-center justify-center rounded-full bg-[#0E3A84] px-10 text-xl font-semibold text-white transition-colors hover:bg-[#0B3274] sm:h-16 sm:min-w-72"
          >
            {submitLabel}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </div>
    </section>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type ContactFormMapCopy = {
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submitLoadingLabel: string;
  mapTitle: string;
  validation: {
    nameRequired: string;
    nameMin: string;
    emailRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    messageRequired: string;
    messageMin: string;
  };
  feedback: {
    successMessage: string;
    errorMessage: string;
  };
};

type ContactFormMapSectionProps = {
  copy: ContactFormMapCopy;
};

export function ContactFormMapSection({ copy }: ContactFormMapSectionProps) {
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, copy.validation.nameRequired).min(2, copy.validation.nameMin),
        email: z.string().trim().min(1, copy.validation.emailRequired).email(copy.validation.emailInvalid),
        phone: z
          .string()
          .trim()
          .optional()
          .or(z.literal(''))
          .refine((value) => !value || /^\+?[0-9()\-\s.]{9,20}$/.test(value), copy.validation.phoneInvalid),
        message: z.string().trim().min(1, copy.validation.messageRequired).min(10, copy.validation.messageMin),
      }),
    [copy],
  );

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

  const mapSrc =
    'https://www.google.com/maps?q=T%C3%B2a%20nh%C3%A0%20Hoa%20C%C6%B0%C6%A1ng%2C%20ng%C3%B5%2011%20Th%C3%A1i%20H%C3%A0%2C%20%C4%90%E1%BB%91ng%20%C4%90a%2C%20H%C3%A0%20N%E1%BB%99i&output=embed';

  const onSubmit = async (values: FormValues) => {
    setSubmitMessage('');
    setSubmitStatus('idle');
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

    const payload = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    };

    try {
      console.log('[ContactFormMapSection] Submit payload:', payload);

      const response = await fetch('/api/career-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('[ContactFormMapSection] Submit response:', result);

      if (!response.ok) {
        setSubmitStatus('error');
        setSubmitMessage(result?.message || copy.feedback.errorMessage);
        return;
      }

      setSubmitStatus('success');
      setSubmitMessage(copy.feedback.successMessage);
      form.reset();
    } catch (error) {
      console.error('[ContactFormMapSection] Submit error:', error);
      setSubmitStatus('error');
      setSubmitMessage(copy.feedback.errorMessage);
    }
  };

  return (
    <section className="bg-[#F3F5F8] pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#F3F5F8] lg:grid-cols-2">
        <div className="px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <h2 className="text-4xl leading-[1.12] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl">
            {copy.title}
          </h2>

          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
            <div>
              <label htmlFor="contact-name" className="text-xl leading-[1.2] font-medium text-[#113C8D]">
                {copy.nameLabel}
              </label>
              <Input
                id="contact-name"
                placeholder={copy.namePlaceholder}
                className={cn(
                  'mt-3 h-16 rounded-lg border-[#E1E3E8] bg-[#E6E6E8] px-6 text-base text-[#123C86] placeholder:text-[#8D93A1] sm:h-18',
                  form.formState.errors.name ? 'border-[#C63737] focus-visible:ring-[#C63737]/40' : '',
                )}
                {...form.register('name')}
              />
              {form.formState.errors.name ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.name.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-email" className="text-xl leading-[1.2] font-medium text-[#113C8D]">
                {copy.emailLabel}
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder={copy.emailPlaceholder}
                className={cn(
                  'mt-3 h-16 rounded-lg border-[#E1E3E8] bg-[#E6E6E8] px-6 text-base text-[#123C86] placeholder:text-[#8D93A1] sm:h-18',
                  form.formState.errors.email ? 'border-[#C63737] focus-visible:ring-[#C63737]/40' : '',
                )}
                {...form.register('email')}
              />
              {form.formState.errors.email ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-phone" className="text-xl leading-[1.2] font-medium text-[#113C8D]">
                {copy.phoneLabel}
              </label>
              <Input
                id="contact-phone"
                type="tel"
                placeholder={copy.phonePlaceholder}
                className={cn(
                  'mt-3 h-16 rounded-lg border-[#E1E3E8] bg-[#E6E6E8] px-6 text-base text-[#123C86] placeholder:text-[#8D93A1] sm:h-18',
                  form.formState.errors.phone ? 'border-[#C63737] focus-visible:ring-[#C63737]/40' : '',
                )}
                {...form.register('phone')}
              />
              {form.formState.errors.phone ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.phone.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xl leading-[1.2] font-medium text-[#113C8D]">
                {copy.messageLabel}
              </label>
              <Textarea
                id="contact-message"
                placeholder={copy.messagePlaceholder}
                rows={5}
                className={cn(
                  'mt-3 min-h-[150px] rounded-lg border-[#E1E3E8] bg-[#E6E6E8] px-6 py-4 text-base text-[#123C86] placeholder:text-[#8D93A1] sm:min-h-[170px]',
                  form.formState.errors.message ? 'border-[#C63737] focus-visible:ring-[#C63737]/40' : '',
                )}
                {...form.register('message')}
              />
              {form.formState.errors.message ? (
                <p className="mt-2 text-sm text-[#C63737]">{form.formState.errors.message.message}</p>
              ) : null}
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-14 rounded-lg bg-[#0F3A86] px-8 text-xl font-medium text-white hover:bg-[#0D3274] sm:h-15"
            >
              {form.formState.isSubmitting ? copy.submitLoadingLabel : copy.submitLabel}
            </Button>

            {submitMessage ? (
              <p className={cn('text-sm', submitStatus === 'error' ? 'text-[#C63737]' : 'text-[#0D7A3B]')}>
                {submitMessage}
              </p>
            ) : null}
          </form>
        </div>

        <div className="min-h-[420px] lg:min-h-full">
          <iframe
            title={copy.mapTitle}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0 sm:h-[520px] lg:h-full lg:min-h-[840px]"
          />
        </div>
      </div>
    </section>
  );
}

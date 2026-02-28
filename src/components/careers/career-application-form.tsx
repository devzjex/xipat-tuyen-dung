'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

type CareerApplicationFormCopy = {
  title: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  cvLabel: string;
  cvButtonLabel: string;
  cvNoFileText: string;
  portfolioLabel: string;
  portfolioPlaceholder: string;
  coverLetterLabel: string;
  coverLetterPlaceholder: string;
  submitLabel: string;
  submitSuccessTitle: string;
  submitSuccessDescription: string;
  validation: {
    fullNameRequired: string;
    fullNameMin: string;
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    phoneInvalid: string;
    cvRequired: string;
    cvInvalidType: string;
    cvMaxSize: string;
    portfolioInvalid: string;
    coverLetterRequired: string;
    coverLetterMin: string;
  };
};

type CareerApplicationFormProps = {
  copy: CareerApplicationFormCopy;
  careerTitle: string;
  careerEmail: string;
};

const allowedCvExtensions = ['pdf', 'doc', 'docx'];
const maxCvSizeInBytes = 5 * 1024 * 1024;

export function CareerApplicationForm({ copy, careerTitle, careerEmail }: CareerApplicationFormProps) {
  const [submitMessage, setSubmitMessage] = useState('');
  const { toast } = useToast();

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().trim().min(1, copy.validation.fullNameRequired).min(2, copy.validation.fullNameMin),
        email: z.string().trim().min(1, copy.validation.emailRequired).email(copy.validation.emailInvalid),
        phone: z
          .string()
          .trim()
          .min(1, copy.validation.phoneRequired)
          .regex(/^\+?[0-9()\-\s.]{9,20}$/, copy.validation.phoneInvalid),
        cvFile: z
          .custom<File | undefined>((value) => value instanceof File, copy.validation.cvRequired)
          .refine((file) => Boolean(file), copy.validation.cvRequired)
          .refine((file) => {
            if (!file) {
              return false;
            }
            const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
            return allowedCvExtensions.includes(extension);
          }, copy.validation.cvInvalidType)
          .refine((file) => {
            if (!file) {
              return false;
            }
            return file.size <= maxCvSizeInBytes;
          }, copy.validation.cvMaxSize),
        portfolioUrl: z
          .string()
          .trim()
          .optional()
          .or(z.literal(''))
          .refine((value) => !value || z.url().safeParse(value).success, copy.validation.portfolioInvalid),
        coverLetter: z
          .string()
          .trim()
          .min(1, copy.validation.coverLetterRequired)
          .min(20, copy.validation.coverLetterMin),
      }),
    [copy],
  );

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      cvFile: undefined,
      portfolioUrl: '',
      coverLetter: '',
    },
  });

  const cvFile = useWatch({ control: form.control, name: 'cvFile' });
  const fileName = cvFile?.name || copy.cvNoFileText;

  const fieldClassName = (hasError: boolean) =>
    cn(
      'h-14 rounded-xl border bg-white px-4 text-base text-[#113C8D] placeholder:text-[#8B8B93] transition-colors',
      hasError
        ? 'border-[#C63737] focus-visible:ring-[#C63737]/40'
        : 'border-[#D9E1F2] focus-visible:ring-[#113C8D]/25',
    );

  const onSubmit = async (values: FormValues) => {
    setSubmitMessage('');
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

    const validValues = parsed.data;
    const payload = {
      careerTitle,
      careerEmail,
      fullName: validValues.fullName,
      email: validValues.email,
      phone: validValues.phone,
      portfolioUrl: validValues.portfolioUrl || null,
      coverLetter: validValues.coverLetter,
      cvFile: validValues.cvFile
        ? {
            name: validValues.cvFile.name,
            size: validValues.cvFile.size,
            type: validValues.cvFile.type,
          }
        : null,
      submittedAt: new Date().toISOString(),
    };

    try {
      console.log('[CareerApplicationForm] Submit payload:', payload);

      const response = await fetch('/api/career-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('[CareerApplicationForm] Submit response:', result);

      if (!response.ok) {
        setSubmitMessage(result?.message || 'Submit failed. Please try again.');
        return;
      }

      setSubmitMessage('');
      toast({
        title: (
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0D7A3B]" />
            {copy.submitSuccessTitle}
          </span>
        ),
        description: copy.submitSuccessDescription,
      });
      form.reset();
    } catch (error) {
      console.error('[CareerApplicationForm] Submit error:', error);
      setSubmitMessage('Submit failed. Please try again.');
    }
  };

  return (
    <section
      id="career-application-form"
      className="mt-12 scroll-mt-28 border-t border-[#113C8D]/30 pt-10 sm:mt-14 sm:pt-12 lg:mt-16"
    >
      <Card className="mx-auto max-w-[1200px] border-none box-shadow-none rounded-none shadow-none bg-transparent">
        <CardHeader className="pb-4 sm:px-8 sm:pt-8">
          <CardTitle className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl">
            {copy.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="sm:px-8 sm:pb-8">
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7">
            <div className="space-y-2.5">
              <Label htmlFor="fullName" className="text-lg font-semibold text-[#113C8D]">
                {copy.fullNameLabel} <span className="text-[#C63737]">*</span>
              </Label>
              <Input
                id="fullName"
                required
                placeholder={copy.fullNamePlaceholder}
                className={fieldClassName(Boolean(form.formState.errors.fullName))}
                {...form.register('fullName')}
              />
              {form.formState.errors.fullName ? (
                <p className="text-sm text-[#C63737]">{form.formState.errors.fullName.message}</p>
              ) : null}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-lg font-semibold text-[#113C8D]">
                  {copy.emailLabel} <span className="text-[#C63737]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder={copy.emailPlaceholder}
                  className={fieldClassName(Boolean(form.formState.errors.email))}
                  {...form.register('email')}
                />
                {form.formState.errors.email ? (
                  <p className="text-sm text-[#C63737]">{form.formState.errors.email.message}</p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="phone" className="text-lg font-semibold text-[#113C8D]">
                  {copy.phoneLabel} <span className="text-[#C63737]">*</span>
                </Label>
                <Input
                  id="phone"
                  required
                  placeholder={copy.phonePlaceholder}
                  className={fieldClassName(Boolean(form.formState.errors.phone))}
                  {...form.register('phone')}
                />
                {form.formState.errors.phone ? (
                  <p className="text-sm text-[#C63737]">{form.formState.errors.phone.message}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="cvFile" className="text-lg font-semibold text-[#113C8D]">
                {copy.cvLabel} <span className="text-[#C63737]">*</span>
              </Label>
              <div
                className={cn(
                  'flex min-h-14 flex-wrap items-center gap-3 rounded-xl border bg-white px-3 py-2 transition-colors',
                  form.formState.errors.cvFile
                    ? 'border-[#C63737] focus-within:ring-2 focus-within:ring-[#C63737]/30'
                    : 'border-[#D9E1F2] focus-within:ring-2 focus-within:ring-[#113C8D]/25',
                )}
              >
                <label
                  htmlFor="cvFile"
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#113C8D] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0E3278]"
                >
                  {copy.cvButtonLabel}
                </label>
                <Input
                  id="cvFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  {...form.register('cvFile')}
                  onChange={(event) => {
                    const selected = event.target.files?.[0];
                    form.setValue('cvFile', selected, { shouldValidate: true });
                  }}
                />
                <p className="text-sm text-[#667A9D] sm:text-base">{fileName}</p>
              </div>
              {form.formState.errors.cvFile ? (
                <p className="text-sm text-[#C63737]">{form.formState.errors.cvFile.message}</p>
              ) : null}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="portfolioUrl" className="text-lg font-semibold text-[#113C8D]">
                {copy.portfolioLabel}
              </Label>
              <Input
                id="portfolioUrl"
                placeholder={copy.portfolioPlaceholder}
                className={fieldClassName(Boolean(form.formState.errors.portfolioUrl))}
                {...form.register('portfolioUrl')}
              />
              {form.formState.errors.portfolioUrl ? (
                <p className="text-sm text-[#C63737]">{form.formState.errors.portfolioUrl.message}</p>
              ) : null}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="coverLetter" className="text-lg font-semibold text-[#113C8D]">
                {copy.coverLetterLabel} <span className="text-[#C63737]">*</span>
              </Label>
              <Textarea
                id="coverLetter"
                required
                placeholder={copy.coverLetterPlaceholder}
                className={cn(
                  'min-h-[152px] rounded-xl border bg-white px-4 py-3 text-base text-[#113C8D] transition-colors placeholder:text-[#8B8B93]',
                  form.formState.errors.coverLetter
                    ? 'border-[#C63737] focus-visible:ring-[#C63737]/40'
                    : 'border-[#D9E1F2] focus-visible:ring-[#113C8D]/25',
                )}
                {...form.register('coverLetter')}
              />
              {form.formState.errors.coverLetter ? (
                <p className="text-sm text-[#C63737]">{form.formState.errors.coverLetter.message}</p>
              ) : null}
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                size="lg"
                className="h-13 min-w-48 cursor-pointer rounded-full bg-[#113C8D] px-8 text-xl font-semibold text-white hover:bg-[#0E3278] sm:h-14 sm:min-w-56"
                disabled={form.formState.isSubmitting}
              >
                {copy.submitLabel}
              </Button>
            </div>

            {submitMessage ? <p className="text-base text-[#C63737]">{submitMessage}</p> : null}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

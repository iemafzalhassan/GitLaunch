import { z } from 'zod';

// Base form validation schema
export const formValidationSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  githubUsername: z.string()
    .min(1, 'GitHub username is required')
    .max(39, 'GitHub username must be less than 39 characters')
    .regex(/^[a-zA-Z0-9-]+$/, 'GitHub username can only contain letters, numbers, and hyphens'),
  
  role: z.enum(['student', 'professional', 'freelancer'], {
    required_error: 'Please select a role',
  }),
  
  domain: z.string()
    .min(1, 'Domain is required')
    .max(100, 'Domain must be less than 100 characters'),
  
  companyName: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  companyUrl: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  collegeName: z.string()
    .max(100, 'College name must be less than 100 characters')
    .optional(),
  
  bio: z.string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters'),
  
  techStack: z.string()
    .min(1, 'Please select at least one technology')
    .max(1000, 'Tech stack is too long'),
  
  socials: z.object({
    linkedin: z.string()
      .max(50, 'LinkedIn username must be less than 50 characters')
      .optional(),
    twitter: z.string()
      .max(15, 'Twitter handle must be less than 15 characters')
      .optional(),
    website: z.string()
      .url('Please enter a valid URL')
      .optional()
      .or(z.literal('')),
    email: z.string()
      .email('Please enter a valid email address')
      .optional(),
  }),
  
  statsTheme: z.string()
    .min(1, 'Please select a theme'),
  
  techIconsStyle: z.enum(['dark', 'light']),
  
  iconService: z.enum(['skillicons', 'devicon', 'techicons']),
  
  showTrophies: z.boolean(),
  showStreak: z.boolean(),
  showContribution: z.boolean(),
  
  quote: z.string()
    .min(1, 'Quote is required')
    .max(200, 'Quote must be less than 200 characters'),
});

export type FormValidationSchema = z.infer<typeof formValidationSchema>;

// Partial schema for real-time validation
export const partialFormValidationSchema = formValidationSchema.partial();

// Validation functions
export function validateFormField(field: keyof FormValidationSchema, value: any): string | null {
  try {
    const fieldSchema = formValidationSchema.shape[field];
    if (fieldSchema) {
      fieldSchema.parse(value);
    }
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || 'Invalid value';
    }
    return 'Validation error';
  }
}

export function validateFormData(data: Partial<FormValidationSchema>): { isValid: boolean; errors: Record<string, string> } {
  try {
    formValidationSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation error' } };
  }
}

// URL validation helpers
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidGitHubUsername(username: string): boolean {
  return /^[a-zA-Z0-9-]+$/.test(username) && username.length <= 39;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

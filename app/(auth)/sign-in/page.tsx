'use client';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInwithEmail } from "@/lib/actions/auth.actions";

const signIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
        const result = await signInwithEmail(data);
        if(result.success) router.push('/');
    } catch (e) {
        console.error(e);
        toast.error('Sign in failed', {
            description: e instanceof Error ? e.message : 'Failed to sign in.'
        });
    }
} 

  return (
    <>
      <h1 className='form-title'>Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^\w+@\w+\.\w+$/,
            message: "Email address is required",
            minLength: 2
          }}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your strong password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />
        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Signing In' : 'Sign In'}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  )
}

export default signIn
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DefaultValues, FieldValues, Path, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ZodTypeAny } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ROUTES from '@/constants/route'
import { toast } from 'sonner'

type ActionResponse = {
    success: boolean
    status?: number
    error?: {
        message?: string
    }
}

interface AuthFormProps {
    schema: ZodTypeAny
    defaultValues: DefaultValues<FieldValues>
    onSubmit: (data: FieldValues) => Promise<ActionResponse>
    formType: 'SIGN_IN' | 'SIGN_UP'
}

const AuthForm = ({ schema, defaultValues, formType, onSubmit }: AuthFormProps) => {
    const router = useRouter()
    const resolver = zodResolver(schema as any) as Resolver<FieldValues>

    const form = useForm<FieldValues>({
        resolver,
        defaultValues
    })

    const handleSubmit: SubmitHandler<FieldValues> = async data => {
        const result = await onSubmit(data)

        if (result?.success) {
            toast('Success', {
                description: formType === 'SIGN_IN' ? 'Signed in successfully' : 'Signed up successfully'
            })

            router.push(ROUTES.HOME)
            return
        }

        const errorTitle = result?.status ? `Error ${result.status}` : 'Error'
        toast(errorTitle, {
            description: result?.error?.message ?? 'Something went wrong, please try again.'
        })
    }

    const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Sign Up'

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='mt-10 space-y-6'>
                {Object.keys(defaultValues ?? {}).map(fieldName => (
                    <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName as Path<FieldValues>}
                        render={({ field: controlledField }) => (
                            <FormItem className='flex w-full flex-col gap-2.5'>
                                <FormLabel className='paragraph-medium text-dark400_light700'>
                                    {fieldName === 'email'
                                        ? 'Email Address'
                                        : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        required
                                        type={fieldName === 'password' ? 'password' : 'text'}
                                        {...controlledField}
                                        className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <Button
                    disabled={form.formState.isSubmitting}
                    className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!'
                >
                    {form.formState.isSubmitting
                        ? buttonText === 'Sign In'
                            ? 'Signing In...'
                            : 'Signing Up...'
                        : buttonText}
                </Button>

                {formType === 'SIGN_IN' ? (
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link href={ROUTES.SIGN_UP} className='paragraph-semibold primary-text-gradient'>
                            Sign up
                        </Link>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <Link href={ROUTES.SIGN_IN} className='paragraph-semibold primary-text-gradient'>
                            Sign in
                        </Link>
                    </p>
                )}
            </form>
        </Form>
    )
}

export default AuthForm
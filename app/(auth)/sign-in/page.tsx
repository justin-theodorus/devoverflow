'use client'

import AuthForm from '@/components/forms/AuthForm'
import { SignInSchema } from '@/lib/validations'

function SignIn() {
    return (
        <AuthForm
            formType='SIGN_IN'
            schema={SignInSchema}
            defaultValues={{ email: '', password: '' }}
            onSubmit={async () => ({ success: true })}
        />
    )
}

export default SignIn
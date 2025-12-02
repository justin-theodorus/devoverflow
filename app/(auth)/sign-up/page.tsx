'use client'

import AuthForm from '@/components/forms/AuthForm'
import { SignUpSchema } from '@/lib/validations'

function SignUp() {
    return (
        <AuthForm
            formType='SIGN_UP'
            schema={SignUpSchema}
            defaultValues={{ email: '', password: '', name: '', username: '' }}
            onSubmit={async () => ({ success: true })}
        />
    )
}

export default SignUp
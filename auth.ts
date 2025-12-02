import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (!googleClientId || !googleClientSecret) {
  throw new Error('Missing Google OAuth env vars')
}

if (!githubClientId || !githubClientSecret) {
  throw new Error('Missing GitHub OAuth env vars')
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: githubClientId,
      clientSecret: githubClientSecret
    }),
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    })
  ]
})
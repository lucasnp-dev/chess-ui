import { User } from '@/@types/db/user'
import { signJwtAccessToken } from '@/lib/jwt'
import { api, messages } from '@/lib/utils'
import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const userResponse = await axios({
            method: 'POST',
            url: `${api}/login`,
            data: {
              email: credentials?.email,
              password: credentials?.password,
            },
          })

          if (userResponse.status !== 200) {
            throw new Error(messages.internal_error)
          }

          const { user }: { user: User } = userResponse.data

          const data = {
            id: user.id,
            email: user.email,
          }

          return {
            ...data,
            acessToken: signJwtAccessToken(data),
          }
        } catch (err) {
          console.log(err)

          if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data.message)
          }

          throw new Error(messages.internal_error)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user }
    },

    async session({ session, token }: any) {
      session.user = token as any
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

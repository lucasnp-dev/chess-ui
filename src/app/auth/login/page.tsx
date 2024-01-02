'use client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AuthCardHeader from '@/components/auth-card-header'
import { LoginSchema, LoginSchemaType } from '@/lib/zod/auth'
import AuthCardFooter from '@/components/auth-card-footer'
import useLoading from '@/hooks/useLoading'
import axios from 'axios'
import { api, messages } from '@/lib/utils'
import useUtils from '@/hooks/useUtils'
import useAlert from '@/hooks/useAlert'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Login() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const { showLoading, hideLoading } = useLoading()
  const { handleRequestError, handleSignInError } = useUtils()
  const { alertSuccess } = useAlert()
  const session = useSession()

  const onSubmit = async (data: LoginSchemaType) => {
    console.log(data)

    showLoading()

    try {
      const login = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (!login) {
        throw new Error(messages.internal_error)
      }

      if (login.error) {
        handleSignInError(login)
        return
      }

      alertSuccess({
        title: messages.success,
        text: messages.login_successful,
      })
    } catch (err: unknown) {
      console.log(err)
      handleRequestError(err)
    } finally {
      hideLoading()
    }
  }

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <div>
      <AuthCardHeader
        title="Welcome back"
        description="Sign in to your account to continue"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="name@example.com" />
                </FormControl>
                <FormDescription>Your best email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription>A strong password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>

      <AuthCardFooter />
    </div>
  )
}

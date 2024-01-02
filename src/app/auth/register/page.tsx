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
import { RegisterSchema, RegisterSchemaType } from '@/lib/zod/auth'
import AuthCardFooter from '@/components/auth-card-footer'
import useLoading from '@/hooks/useLoading'
import axios from 'axios'
import { api } from '@/lib/utils'
import useAlert from '@/hooks/useAlert'
import { useRouter } from 'next/navigation'
import useUtils from '@/hooks/useUtils'

export default function Register() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })

  const { showLoading, hideLoading } = useLoading()
  const { alertSuccess } = useAlert()
  const { handleRequestError } = useUtils()
  const router = useRouter()

  const onSubmit = async (data: RegisterSchemaType) => {
    showLoading()
    try {
      const register = await axios({
        method: 'post',
        url: `${api}/users`,
        data,
      })

      console.log(register)

      if (register.status !== 201) {
        throw new Error('Erro interno. Tente novamente, ou peça suporte.')
      }

      alertSuccess({
        title: 'Sucesso',
        text: 'Conta criada com sucesso',
      }).then(() => router.push('/auth/login'))
    } catch (err: unknown) {
      console.log(err)
      handleRequestError(err)
    } finally {
      hideLoading()
    }
  }

  return (
    <div>
      <AuthCardHeader title="Welcome" description="Create your account" />

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

          <FormField
            name="repeat"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirm</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription>Repeat your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </Form>

      <AuthCardFooter />
    </div>
  )
}

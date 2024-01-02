import { Button } from './ui/button'
import { Separator } from '@/components/ui/separator'
import { FcGoogle } from 'react-icons/fc'

export default function AuthCardFooter() {
  return (
    <div>
      <Separator className="my-6" />

      <Button
        type="button"
        className="w-full gap-2 dark:bg-white bg-zinc-100 text-black"
      >
        <FcGoogle /> Continue with Google
      </Button>
    </div>
  )
}

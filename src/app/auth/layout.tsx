import { ChildrenType } from '@/@types'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa6'

export default function AuthLayout({ children }: ChildrenType) {
  return (
    <main className="min-h-screen flex items-center justify-center relative px-4">
      <div className="absolute lg:top-8 lg:left-8 top-1 left-1">
        <Link
          href="/"
          className={buttonVariants({ variant: 'ghost', className: 'gap-2' })}
        >
          <FaAngleLeft /> Back
        </Link>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  )
}

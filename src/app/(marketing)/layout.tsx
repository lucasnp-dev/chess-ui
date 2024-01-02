import { ChildrenType } from '@/@types'
import { Footer } from '@/components/footer'
import { Menu } from '@/components/menu'

export default function MarketingLayout({ children }: ChildrenType) {
  return (
    <div className="flex min-h-screen flex-col">
      <Menu />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

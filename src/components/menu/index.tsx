'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { navDashboard } from '@/configs/dashboard'
import Link from 'next/link'
import { Logo } from '../logo'
import { ThemeToggle } from '../theme-toggle'
import { buttonVariants } from '../ui/button'

export function Menu() {
  return (
    <header className="sticky top-0 z-50 bg-background py-1 px-4 border-b bg-opacity-70 backdrop-blur-sm flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            {navDashboard.map((item) => (
              <NavigationMenuItem key={item.label}>
                <Link href={item.to} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-2 items-center">
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: 'secondary' })}
        >
          Login
        </Link>
      </div>
    </header>
  )
}

import { Logo } from './logo'

export default function AuthCardHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="text-center mb-10">
      <Logo />
      <h1 className="text-xl font-bold mt-4">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

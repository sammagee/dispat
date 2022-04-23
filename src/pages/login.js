import AppLogo from '@/components/AppLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Input from '@/components/Input'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Login = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset))
    } else {
      setStatus(null)
    }
  }, [])

  const submitForm = async event => {
    event.preventDefault()

    login({ email, password, setErrors, setStatus })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <AppLogo className="w-12 h-12 text-gray-500 fill-current" />
            </a>
          </Link>
        }>
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              className="block w-full mt-1"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              className="block w-full mt-1"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-end mt-4 space-x-4">
            <Link href="/register">
              <a className="flex-shrink-0 text-sm text-gray-600 underline hover:text-gray-900">
                Need an account?
              </a>
            </Link>

            <Button className="w-full" variant="primary">
              Login
            </Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Login

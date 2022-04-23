import AppLogo from '@/components/AppLogo'
import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Input from '@/components/Input'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useState } from 'react'

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()

    register({ name, email, password, password_confirmation, setErrors })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <AppLogo className="w-20 h-20 text-gray-500 fill-current" />
            </a>
          </Link>
        }>
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              className="block w-full mt-1"
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Email Address */}
          <div className="mt-4">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              className="block w-full mt-1"
              onChange={event => setEmail(event.target.value)}
              required
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
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              value={password_confirmation}
              className="block w-full mt-1"
              onChange={event => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4 space-x-4">
            <Link href="/login">
              <a className="flex-shrink-0 text-sm text-gray-600 underline hover:text-gray-900">
                Already registered?
              </a>
            </Link>

            <Button className="w-full ml-4" variant="primary">
              Register
            </Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Register

import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import AppLogo from '../AppLogo'
import NoSSR from '../NoSSR'
import UserDropdown from './UserDropdown'

const AppLayout = ({ header, children }) => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Heading */}
      <header className="flex items-center justify-between w-full h-16 pl-4 pr-6 border-b border-gray-300">
        <Link href="/">
          <a>
            <AppLogo className="w-10 h-10 text-gray-800" />
          </a>
        </Link>

        <div className="flex items-center space-x-6">
          {header}

          <NoSSR>{user && <UserDropdown user={user} />}</NoSSR>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex flex-1">{children}</main>
    </div>
  )
}

export default AppLayout

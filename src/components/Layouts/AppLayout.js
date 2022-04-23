import { useAuth } from '@/hooks/auth'
import clsx from 'clsx'
import Link from 'next/link'
import AppLogo from '../AppLogo'
import NoSSR from '../NoSSR'
import UserDropdown from './UserDropdown'

const AppLayout = ({ header, children, viewingUsers }) => {
  const { user } = useAuth({ middleware: 'auth' })

  const getInitials = user => {
    const nameArr = user.name.split(' ')

    return `${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`
  }

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

          {viewingUsers?.length > 0 && (
            <div className="flex -space-x-3">
              {viewingUsers
                .filter(u => u.id !== user.id)
                .slice(0, 3)
                .map((u, i) => (
                  <div
                    key={u.id}
                    className={clsx(
                      'inline-flex relative items-center justify-center w-10 h-10 text-sm font-medium text-gray-700 border-4 rounded-full ring-2 ring-gray-200 select-none',
                      {
                        'text-green-900 bg-green-300 border-green-500 z-20':
                          i === 0,
                        'text-blue-900 bg-blue-300 border-blue-500 z-10':
                          i === 1,
                        'text-red-900 bg-red-300 border-red-500 z-0': i === 2,
                      },
                    )}
                    title={u.name}>
                    {getInitials(u)}
                  </div>
                ))}
            </div>
          )}

          <NoSSR>{user && <UserDropdown user={user} />}</NoSSR>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex flex-1">{children}</main>
    </div>
  )
}

export default AppLayout

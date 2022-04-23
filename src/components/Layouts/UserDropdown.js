import { useAuth } from '@/hooks/auth'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

export default function UserDropdown({ user }) {
  const nameArr = user?.name.split(' ')
  const initials = `${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`

  const { logout } = useAuth()

  return (
    <div className="relative inline-flex items-center text-left">
      <Menu>
        <Menu.Button className="w-10 h-10 overflow-hidden text-sm font-medium text-gray-700 bg-white border-4 border-gray-300 rounded-full">
          <span>{initials}</span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded shadow-lg top-full ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    'group flex items-center w-full px-4 py-3 text-sm font-medium',
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                  )}
                  onClick={logout}>
                  Log out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

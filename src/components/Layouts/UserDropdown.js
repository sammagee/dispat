import { Menu } from '@headlessui/react'

export default function UserDropdown({ user }) {
    return (
        <div className="relative inline-flex items-center text-left">
            <Menu>
                <Menu.Button className="w-10 h-10 overflow-hidden border-4 border-gray-300 rounded-full">
                    <img src={user?.avatar} alt={`${user?.name}'s avatar`} />
                </Menu.Button>
            </Menu>
        </div>
    )
}

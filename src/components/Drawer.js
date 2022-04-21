import { Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'

export default function Drawer({ children, open, setOpen }) {
  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', close)

    return () => window.removeEventListener('keydown', close)
  }, [setOpen])

  return (
    <Transition
      as={Fragment}
      show={open}
      enter="transform transition duration-300 ease-in-out"
      enterFrom="opacity-0 translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full">
      <div className="w-[calc(100%-3rem)] max-w-sm fixed right-0 h-screen overflow-y-auto bg-white z-40 inset-y-0 shadow-2xl border-l border-gray-100">
        <header className="flex items-center justify-end w-full h-16 px-6">
          <button
            className="inline-flex items-center justify-center text-gray-500 bg-gray-100 rounded-full h-7 w-7 hover:bg-gray-200 hover:text-gray-600"
            onClick={() => setOpen(false)}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </header>

        <div className="p-6">{children}</div>
      </div>
    </Transition>
  )
}

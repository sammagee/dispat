import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Button from './Button'

export default function Modal({
  children,
  close,
  open,
  title,
  description,
  submitText,
  onSubmit,
  cancelText = 'Cancel',
}) {
  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()

    onSubmit(event)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={close}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-100/75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <form
              onSubmit={handleSubmit}
              className="relative inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white border rounded shadow-lg group">
              <button
                className="absolute inline-flex items-center justify-center w-6 h-6 text-gray-500 bg-white border rounded-full opacity-0 -top-2 -right-2 group-hover:opacity-100 hover:bg-gray-300"
                onClick={close}>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </Dialog.Title>

              {description && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              )}

              <div className="mt-4">{children}</div>

              <footer className="flex flex-row-reverse mt-4">
                <Button type="submit" variant="primary" className="ml-2">
                  {submitText}
                </Button>

                <Button type="button" variant="secondary" onClick={close}>
                  {cancelText}
                </Button>
              </footer>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

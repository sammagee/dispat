import clsx from 'clsx'
import { forwardRef } from 'react'

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        'w-full h-10 px-4 text-sm font-medium text-gray-800 border rounded',
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input

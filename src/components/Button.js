import clsx from 'clsx'

export default function Button({ children, variant, className, ...props }) {
  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700',
    secondary: 'text-gray-700 hover:bg-gray-200 hover:text-gray-800',
  }[variant]

  return (
    <button
      className={clsx(
        'inline-flex justify-center px-4 h-10 items-center text-sm font-medium tracking-wide uppercase rounded',
        variantClasses,
        className,
      )}
      {...props}>
      {children}
    </button>
  )
}

import clsx from 'clsx'

export default function Item({ children, disabled = false, invert = false }) {
  console.log(disabled)
  return (
    <div
      className={clsx(
        'flex items-center h-12 px-6 rounded select-none',
        invert ? 'bg-gray-300' : 'bg-white',
        disabled ? 'cursor-default' : 'cursor-grab',
      )}>
      {children}
    </div>
  )
}

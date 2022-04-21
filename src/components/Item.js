import clsx from 'clsx'

export default function Item({ children, disabled = false, invert = false }) {
  return (
    <div
      className={clsx(
        'flex items-center h-12 px-6 rounded select-none relative group-1',
        invert ? 'bg-gray-300' : 'bg-white',
        disabled ? 'cursor-default' : 'cursor-grab',
      )}>
      {children}
    </div>
  )
}

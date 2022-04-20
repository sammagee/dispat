import clsx from 'clsx'

export default function Item({ children, invert = false }) {
    return (
        <div
            className={clsx(
                'flex items-center h-12 px-6 rounded select-none',
                invert ? 'bg-gray-300' : 'bg-white',
            )}>
            {children}
        </div>
    )
}

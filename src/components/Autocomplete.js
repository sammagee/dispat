import { Combobox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

export default function Autocomplete({ button, items, onChange, placeholder }) {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  const filteredItems =
    query === ''
      ? items
      : items.filter(item =>
          item.display
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  const handleChange = value => {
    setSelected(value)
    setQuery('')
    onChange(value)
  }

  return (
    <Combobox value={selected} onChange={handleChange}>
      <div className="relative w-full max-w-[14rem] flex">
        <Combobox.Button as={Fragment}>{button}</Combobox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}>
          <Combobox.Options className="absolute right-0 z-50 w-56 mt-1 overflow-auto text-base bg-white rounded shadow-lg top-full max-h-60">
            <Combobox.Input
              className="sticky top-0 z-10 w-full h-12 px-4 text-sm leading-5 text-gray-900 border-b border-gray-100 focus:outline-none"
              placeholder={placeholder}
              onChange={event => setQuery(event.target.value)}
            />

            {filteredItems?.length === 0 && query !== '' ? (
              <div className="relative flex items-center justify-center h-12 px-4 text-sm text-gray-600 cursor-default select-none">
                Nothing found.
              </div>
            ) : (
              filteredItems?.map(item => (
                <Combobox.Option
                  key={item.value}
                  className={({ active }) =>
                    clsx(
                      'cursor-pointer select-none relative h-12 flex items-center justify-between text-sm px-4',
                      active ? 'text-gray-700 bg-gray-200' : 'text-gray-600',
                    )
                  }
                  value={item}>
                  {({ selected, active }) => (
                    <>
                      <span className="block font-medium truncate">
                        {item.display}
                      </span>

                      {item.append && (
                        <span
                          className={clsx(
                            'inline-flex items-center justify-center flex-shrink-0 pl-4 font-mono text-sm font-medium text-gray-500 border-l',
                            active ? 'border-gray-300' : 'border-gray-200',
                          )}>
                          {item.append}
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

import Job from '@/components/Job'
import AppLayout from '@/components/Layouts/AppLayout'
import useEvents from '@/hooks/events'
import useWhiteboard from '@/hooks/whiteboard'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import Head from 'next/head'
import { useState } from 'react'
import '../lib/echo'

export default function Home() {
  const { boards, createJob, removeBoard, refetch } = useWhiteboard()
  const [selectedBoard, setSelectedBoard] = useState(0)

  useEvents({ callback: refetch })

  return (
    <AppLayout>
      <Head>
        <title>Dispat</title>
      </Head>

      <div className="relative flex flex-col flex-1 w-full">
        {boards ? (
          <Tab.Group selectedIndex={selectedBoard} onChange={setSelectedBoard}>
            <Tab.List className="relative z-10 px-6 mt-6 overflow-x-auto">
              <div className="flex space-x-2">
                {boards.map((board, index) => (
                  <Tab
                    as={'div'}
                    key={board.id}
                    className={({ selected }) =>
                      clsx(
                        'relative px-6 pr-10 h-12 flex items-center group rounded-t text-sm font-medium cursor-pointer focus:outline-none',
                        selected
                          ? 'bg-gray-100 shadow text-gray-800'
                          : 'text-gray-600 hover:bg-gray-300',
                      )
                    }>
                    {({ selected }) => (
                      <>
                        <span className="select-none">{board.name}</span>

                        <button
                          className={clsx(
                            'absolute right-3 inline-flex items-center justify-center w-4 h-4 text-gray-500 rounded-full  ',
                            selected
                              ? 'opacity-100 hover:bg-gray-200 hover:text-gray-600'
                              : 'opacity-0 group-hover:opacity-100 hover:bg-gray-300',
                          )}
                          onClick={() =>
                            removeBoard(
                              board.id,
                              selectedBoard,
                              setSelectedBoard,
                            )
                          }>
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </Tab>
                ))}
              </div>
            </Tab.List>

            <div className="absolute z-0 w-full h-5 shadow top-[4.5rem]" />

            <Tab.Panels className="relative z-20 flex flex-1">
              <div className="absolute inset-y-0 left-0 z-10 w-6 bg-gradient-radial-to-r from-gray-100 via-transparent" />

              {boards.map(board => (
                <Tab.Panel
                  key={board.id}
                  className="relative flex flex-1 w-full p-6 overflow-x-auto bg-gray-100 focus:outline-none snap-x snap-mandatory">
                  <div className="flex justify-start flex-1 space-x-6 snap-x snap-mandatory">
                    {board.jobs.map(job => (
                      <Job key={job.id} job={job} refetch={refetch} />
                    ))}

                    <button
                      className="relative flex items-center justify-center flex-shrink-0 w-12 space-x-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => createJob(board.id)}>
                      <div className="absolute flex items-center justify-center flex-1 space-x-1 transform rotate-90 w-36">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium tracking-wide uppercase">
                          Add Job
                        </span>
                      </div>
                    </button>
                  </div>
                </Tab.Panel>
              ))}

              <div className="absolute inset-y-0 right-0 z-10 w-6 bg-gradient-radial-to-l from-gray-100 via-transparent" />
            </Tab.Panels>
          </Tab.Group>
        ) : (
          <div className="grid flex-1 place-items-center">
            <svg
              className="w-8 h-8 mr-3 -ml-1 text-gray-300 animate-spin"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

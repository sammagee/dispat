import Drawer from '@/components/Drawer'
import Item from '@/components/Item'
import Job from '@/components/Job'
import AppLayout from '@/components/Layouts/AppLayout'
import useEcho from '@/hooks/echo'
import useLocomotives from '@/hooks/locomotives'
import useWhiteboard from '@/hooks/whiteboard'
import useWorkers from '@/hooks/workers'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import Head from 'next/head'
import { useState } from 'react'
import '../lib/echo'

export default function Home() {
    const { boards, removeBoard, refetch } = useWhiteboard()
    const { locomotives } = useLocomotives()
    const { workers } = useWorkers()
    useEcho({
        channel: 'board',
        event: 'board.deleted',
        callback: e => {
            console.log(e)
            refetch()
        },
    })
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedBoard, setSelectedBoard] = useState(0)

    return (
        <AppLayout header={<EditButton onClick={() => setDrawerOpen(true)} />}>
            <Head>
                <title>Dispat</title>
            </Head>

            <div className="relative flex flex-col flex-1 w-full">
                <Tab.Group
                    selectedIndex={selectedBoard}
                    onChange={setSelectedBoard}>
                    <Tab.List className="relative z-10 px-6 mt-6 overflow-x-auto">
                        <div className="flex space-x-2">
                            {boards?.map(board => (
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
                                            <span>{board.name}</span>

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
                        {boards?.map(board => (
                            <Tab.Panel
                                key={board.id}
                                className={clsx(
                                    'bg-gray-100 p-6 flex-1 overflow-x-auto w-full',
                                    'focus:outline-none',
                                )}>
                                <div className="flex space-x-6">
                                    {board.jobs.map(job => (
                                        <Job key={job.id} job={job} />
                                    ))}
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>

                <Drawer open={drawerOpen} setOpen={setDrawerOpen}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="pb-3 mb-3 text-sm font-medium tracking-wide text-gray-700 uppercase border-b border-gray-300">
                                Locomotives
                            </h3>
                            <div className="p-6 space-y-2 bg-gray-200 rounded overflow-y-auto max-h-[30rem]">
                                {locomotives?.length > 0 ? (
                                    locomotives.map(locomotive => (
                                        <Item key={locomotive.id}>
                                            <div className="flex items-center justify-between flex-1">
                                                <p className="font-medium text-gray-900">
                                                    {locomotive.name}
                                                </p>
                                                <span className="inline-flex items-center justify-center pl-6 text-sm font-medium text-gray-700 border-l border-gray-200">
                                                    {locomotive.direction[0].toUpperCase()}
                                                </span>
                                            </div>
                                        </Item>
                                    ))
                                ) : (
                                    <Item invert>
                                        <p className="flex-1 text-sm font-medium text-center text-gray-700">
                                            No locomotives added.
                                        </p>
                                    </Item>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="pb-3 mb-3 text-sm font-medium tracking-wide text-gray-700 uppercase border-b border-gray-300">
                                Workers
                            </h3>
                            <div className="p-6 space-y-2 bg-gray-200 rounded overflow-y-auto max-h-[30rem]">
                                {workers?.length > 0 ? (
                                    workers.map(worker => (
                                        <Item key={worker.id}>
                                            <div className="flex items-center justify-between flex-1">
                                                <p className="font-medium text-gray-900">
                                                    {worker.first_name}{' '}
                                                    {worker.last_name}
                                                </p>
                                                <span className="inline-flex items-center justify-center pl-6 text-sm font-medium text-gray-700 border-l border-gray-200">
                                                    {worker.role[0].toUpperCase()}
                                                </span>
                                            </div>
                                        </Item>
                                    ))
                                ) : (
                                    <Item invert>
                                        <p className="flex-1 text-sm font-medium text-center text-gray-700">
                                            No workers added.
                                        </p>
                                    </Item>
                                )}
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        </AppLayout>
    )
}

function EditButton({ onClick }) {
    return (
        <button
            className="flex items-center px-4 space-x-1 font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-400 h-9"
            onClick={onClick}>
            <svg
                className="w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                />
            </svg>

            <span>Edit</span>
        </button>
    )
}

import Item from './Item'

export default function Job({ job }) {
    return (
        <div className="w-full p-4 bg-gray-200 min-w-[16rem] max-w-sm rounded space-y-6">
            <h2 className="text-lg font-medium text-gray-600">{job.name}</h2>

            <div>
                <h3 className="pb-3 mb-3 text-sm font-medium tracking-wide text-gray-700 uppercase border-b border-gray-300">
                    Locomotives
                </h3>

                <div className="space-y-2">
                    {job.locomotives.length > 0 ? (
                        job.locomotives.map(locomotive => (
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
                    Assignees
                </h3>

                <div className="space-y-2">
                    {job.assignees.length > 0 ? (
                        job.assignees.map(assignee => (
                            <Item key={assignee.id}>
                                <div className="flex items-center justify-between flex-1">
                                    <p className="font-medium text-gray-900">
                                        {assignee.first_name}{' '}
                                        {assignee.last_name}
                                    </p>
                                    <span className="inline-flex items-center justify-center pl-6 text-sm font-medium text-gray-700 border-l border-gray-200">
                                        {assignee.role[0].toUpperCase()}
                                    </span>
                                </div>
                            </Item>
                        ))
                    ) : (
                        <Item invert>
                            <p className="flex-1 text-sm font-medium text-center text-gray-700">
                                No assignees added.
                            </p>
                        </Item>
                    )}
                </div>
            </div>
        </div>
    )
}

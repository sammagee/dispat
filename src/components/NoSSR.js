import dynamic from 'next/dynamic'
import { Fragment } from 'react'

function NoSSR(props) {
    return <Fragment>{props.children}</Fragment>
}

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
})

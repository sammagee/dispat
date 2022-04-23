import Head from 'next/head'

export default function GuestLayout({ children }) {
  return (
    <div>
      <Head>
        <title>Dispat</title>
      </Head>

      <div className="font-sans antialiased text-gray-900">{children}</div>
    </div>
  )
}

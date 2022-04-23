export default function AuthCard({ logo, children }) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
      <div>{logo}</div>

      <div className="w-full max-w-sm px-6 py-4 mt-6 overflow-hidden bg-white border rounded shadow">
        {children}
      </div>
    </div>
  )
}

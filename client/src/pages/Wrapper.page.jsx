export default function Wrapper({ children }) {
  return <div className='relative w-full overflow-hidden bg-neutral-900 h-svh font-geist text-gray-50'>
    {children}
  </div>
}

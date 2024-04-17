export default function ErrorMessage({ children }) {
  return (
    <div className='h-4 mt-1 text-xs font-medium text-red-400'>{children}</div>
  );
}

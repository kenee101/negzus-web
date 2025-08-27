export default function Spinner({ size = 'md', fullPage = true }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const containerClasses = fullPage
    ? 'min-h-screen bg-black flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div
        className={`inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] text-emerald-400 motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]}`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

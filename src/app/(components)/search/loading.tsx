export default function SearchLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#fbfcfd]">
      <div className="border-b border-gray-100 bg-white"><div className="container py-6"><div className="mb-4 h-4 w-40 rounded bg-gray-200" /><div className="h-12 max-w-2xl rounded-xl bg-gray-100" /></div></div>
      <div className="container flex gap-8 py-8">
        <aside className="hidden w-64 shrink-0 rounded-2xl border border-gray-100 bg-white p-6 lg:block"><div className="mb-6 h-5 w-28 rounded bg-gray-200" />{Array.from({ length: 8 }).map((_, index) => <div key={index} className="mb-4 h-4 rounded bg-gray-100" style={{ width: `${68 + (index % 3) * 12}%` }} />)}<div className="my-6 border-t border-gray-100" /><div className="mb-4 h-5 w-24 rounded bg-gray-200" /><div className="grid grid-cols-2 gap-3"><div className="h-10 rounded bg-gray-100" /><div className="h-10 rounded bg-gray-100" /></div></aside>
        <main className="min-w-0 flex-1"><div className="mb-6 flex justify-between"><div className="h-11 w-24 rounded-lg bg-gray-200" /><div className="h-11 w-48 rounded-lg bg-gray-200" /></div><div className="mb-5 h-4 w-36 rounded bg-gray-200" /><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="overflow-hidden rounded-lg border border-gray-100 bg-white"><div className="aspect-square bg-gray-100" /><div className="space-y-3 p-4"><div className="h-3 w-1/3 rounded bg-gray-100" /><div className="h-5 w-3/4 rounded bg-gray-200" /><div className="h-4 w-1/2 rounded bg-gray-100" /><div className="h-6 w-1/3 rounded bg-gray-200" /></div></div>)}</div></main>
      </div>
    </div>
  )
}

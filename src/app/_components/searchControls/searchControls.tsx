"use client"

import { FormEvent, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { FaFilter, FaList, FaSearch, FaTh, FaTimes } from "react-icons/fa"
import type { CategoryType } from "@/types/allCategory.types"
import type { GetAllBrandsTypes } from "@/types/GetAllBrands.types"

type Props = { categories: CategoryType[]; brands: GetAllBrandsTypes[] }

export default function SearchControls({ categories, brands }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const categoryIds = searchParams.getAll("category")
  const brandIds = searchParams.getAll("brand")

  const changeParams = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString())
    update(params)
    router.push(`${pathname}${params.size ? `?${params.toString()}` : ""}`)
  }

  const toggleValue = (key: "category" | "brand", value: string) => changeParams((params) => {
    // Selecting a sidebar filter starts a new browse rather than intersecting it
    // with a previous free-text search (for example: "dell" + Men's Fashion).
    params.delete("q")
    const values = params.getAll(key)
    params.delete(key)
    values.filter((item) => item !== value).forEach((item) => params.append(key, item))
    if (!values.includes(value)) params.append(key, value)
  })

  const clearAll = () => router.push(pathname)
  const activeFilters = [...categoryIds, ...brandIds, searchParams.get("min"), searchParams.get("max")].filter(Boolean).length

  const filters = (
    <div className="space-y-6">
      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-gray-800">Categories</h2>{categoryIds.length > 0 && <span className="text-xs font-medium text-[#7f5539]">{categoryIds.length} selected</span>}</div>
        <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
          {categories.map((category) => <label key={category._id} className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 hover:text-[#7f5539]"><input checked={categoryIds.includes(category._id)} onChange={() => toggleValue("category", category._id)} type="checkbox" className="h-4 w-4 accent-[#7f5539]" />{category.name}</label>)}
        </div>
      </section>
      <hr className="border-gray-100" />
      <section><h2 className="mb-3 font-bold text-gray-800">Price range</h2><div className="grid grid-cols-2 gap-3"><label className="text-xs text-gray-500">Min (EGP)<input defaultValue={searchParams.get("min") ?? ""} onBlur={(event) => changeParams((params) => event.target.value ? params.set("min", event.target.value) : params.delete("min"))} type="number" min="0" placeholder="0" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7f5539]" /></label><label className="text-xs text-gray-500">Max (EGP)<input defaultValue={searchParams.get("max") ?? ""} onBlur={(event) => changeParams((params) => event.target.value ? params.set("max", event.target.value) : params.delete("max"))} type="number" min="0" placeholder="No limit" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7f5539]" /></label></div><div className="mt-3 flex flex-wrap gap-2">{[500, 1000, 5000, 10000].map((price) => <button key={price} onClick={() => changeParams((params) => params.set("max", String(price)))} className="rounded-full bg-[#7f553912] px-3 py-1.5 text-xs font-medium text-[#7f5539] hover:bg-[#7f553930]">Under {price >= 1000 ? `${price / 1000}K` : price}</button>)}</div></section>
      <hr className="border-gray-100" />
      <section><h2 className="mb-3 font-bold text-gray-800">Brands</h2><div className="max-h-52 space-y-2 overflow-y-auto pr-1">{brands.map((brand) => <label key={brand._id} className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 hover:text-[#7f5539]"><input checked={brandIds.includes(brand._id)} onChange={() => toggleValue("brand", brand._id)} type="checkbox" className="h-4 w-4 accent-[#7f5539]" />{brand.name}</label>)}</div></section>
      {activeFilters > 0 && <button onClick={clearAll} className="w-full rounded-lg border border-[#7f553944] py-2.5 text-sm font-medium text-[#7f5539] hover:bg-[#7f553912]">Clear all filters</button>}
    </div>
  )

  return <>
    <button onClick={() => setIsFiltersOpen(true)} className="fixed bottom-5 right-5 z-20 rounded-full bg-[#7f5539] p-4 text-white shadow-lg lg:hidden" aria-label="Open filters"><FaFilter /></button>
    {isFiltersOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden"><aside className="ml-auto h-full w-[86%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-lg font-bold">Filters</h2><button onClick={() => setIsFiltersOpen(false)} className="text-xl text-gray-500"><FaTimes /></button></div>{filters}</aside></div>}
    <aside className="hidden w-64 shrink-0 self-start rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:block">{filters}</aside>
  </>
}

export function SearchHeader() {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const q = searchParams.get("q") ?? ""
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const term = new FormData(event.currentTarget).get("q")?.toString().trim() ?? ""; const params = new URLSearchParams(searchParams.toString()); term ? params.set("q", term) : params.delete("q"); router.push(`${pathname}${params.size ? `?${params}` : ""}`) }
  return <div className="border-b border-gray-100 bg-white"><div className="container py-6"><nav className="mb-4 text-sm text-gray-500"><Link href="/" className="hover:text-[#7f5539]">Home</Link> <span className="mx-2 text-gray-300">/</span><span className="font-medium text-gray-800">Search Results</span></nav><form onSubmit={submit} className="relative max-w-2xl"><FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input key={q} name="q" defaultValue={q} placeholder="Search products, categories or brands..." className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#7f5539] focus:ring-2 focus:ring-[#7f553922]" /></form></div></div>
}

export function ResultToolbar({ categories, brands }: Props) {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const view = searchParams.get("view") === "list" ? "list" : "grid"
  const update = (key: string, value: string) => { const params = new URLSearchParams(searchParams.toString()); value ? params.set(key, value) : params.delete(key); router.push(`${pathname}?${params}`) }
  const remove = (key: "q" | "min" | "max" | "category" | "brand", value?: string) => { const params = new URLSearchParams(searchParams.toString()); if (value) { const values = params.getAll(key); params.delete(key); values.filter((item) => item !== value).forEach((item) => params.append(key, item)) } else params.delete(key); router.push(`${pathname}${params.size ? `?${params}` : ""}`) }
  const categoryFilters = searchParams.getAll("category").map((id) => ({ id, name: categories.find((category) => category._id === id)?.name })).filter((item): item is { id: string; name: string } => Boolean(item.name))
  const brandFilters = searchParams.getAll("brand").map((id) => ({ id, name: brands.find((brand) => brand._id === id)?.name })).filter((item): item is { id: string; name: string } => Boolean(item.name))
  const hasFilters = categoryFilters.length || brandFilters.length || searchParams.get("min") || searchParams.get("max") || searchParams.get("q")
  return <><div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div className="flex rounded-lg border border-gray-200 bg-white p-1"><button onClick={() => update("view", "grid")} className={`rounded-md p-2 ${view === "grid" ? "bg-[#7f5539] text-white" : "text-gray-500"}`} aria-label="Grid view"><FaTh /></button><button onClick={() => update("view", "list")} className={`rounded-md p-2 ${view === "list" ? "bg-[#7f5539] text-white" : "text-gray-500"}`} aria-label="List view"><FaList /></button></div><label className="flex items-center gap-2 text-sm text-gray-500">Sort by:<select defaultValue={searchParams.get("sort") ?? ""} onChange={(event) => update("sort", event.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#7f5539]"><option value="">Relevance</option><option value="price">Price: Low to High</option><option value="-price">Price: High to Low</option><option value="rating">Rating: High to Low</option><option value="title">Name: A to Z</option><option value="-title">Name: Z to A</option></select></label></div>{hasFilters ? <div className="mb-6 flex flex-wrap items-center gap-2"><span className="text-sm text-gray-500"><FaFilter className="mr-1 inline" />Active:</span>{searchParams.get("q") && <FilterChip label={`Search: ${searchParams.get("q")}`} onRemove={() => remove("q")} />}{categoryFilters.map((filter) => <FilterChip key={filter.id} label={filter.name} onRemove={() => remove("category", filter.id)} />)}{brandFilters.map((filter) => <FilterChip key={filter.id} label={filter.name} onRemove={() => remove("brand", filter.id)} />)}{searchParams.get("min") && <FilterChip label={`From ${searchParams.get("min")} EGP`} onRemove={() => remove("min")} />}{searchParams.get("max") && <FilterChip label={`Under ${searchParams.get("max")} EGP`} onRemove={() => remove("max")} />}<button onClick={() => router.push(pathname)} className="ml-2 text-xs text-gray-500 underline hover:text-[#7f5539]">Clear all</button></div> : null}</>
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-[#7f553918] px-3 py-1.5 text-xs font-medium text-[#7f5539]">{label}<button onClick={onRemove} className="text-sm leading-none hover:text-red-600" aria-label={`Remove ${label}`}><FaTimes /></button></span>
}

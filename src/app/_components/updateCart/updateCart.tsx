'use client'
import { UpdateCartApi } from '@/api/cartApi/UpdateCart'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { LuLoader } from 'react-icons/lu'
import { Slide, toast } from 'react-toastify'

export default function UpdateCart({ id, count }: { id: string, count: number }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function UpdateCartBtn(count: number) {
        try {
            setLoading(true)
            const { data } = await UpdateCartApi(id, count)
            router.refresh()
        } catch (error) {
            toast.error("Failed to update the count Pls Try Again", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    backgroundColor: "#D40000",
                    color: "#000000",
                    borderRadius: "12px",
                },
                icon: <span className="text-black text-xl font-bold">✓</span>,
                transition: Slide,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
            <button
                disabled={count <= 1 || loading}
                onClick={() => UpdateCartBtn(count - 1)}
                className="h-8 cursor-pointer w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Decrease quantity"
            >
                <FaMinus />
            </button>

            <span className="w-12 flex justify-center font-bold text-gray-900">{loading ? <LuLoader className='animate-spin' /> : count}</span>
            <button
                disabled={loading}
                onClick={() => UpdateCartBtn(count + 1)}
                className="h-8 w-8 cursor-pointer rounded-lg bg-[#7f5539] shadow-sm flex items-center justify-center text-white hover:bg-[#5b3d29] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Increase quantity"
            >
                <FaPlus />
            </button>
        </div>
    )
}

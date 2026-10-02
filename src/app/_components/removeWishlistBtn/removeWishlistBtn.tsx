"use client"
import { RemoveFromWishlist } from '@/api/wishlistApi/Removewishlist'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Slide, toast } from 'react-toastify'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { LuLoader } from 'react-icons/lu'

export default function RemoveWishlistBtn({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function deleteWishlist() {
        try {
            setLoading(true)

            const response = await RemoveFromWishlist(id)
            if (response.status == "success") {
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        backgroundColor: "#7f5539",
                        color: "#000000",
                        borderRadius: "12px",
                    },
                    icon: <span className="text-black text-xl font-bold">✓</span>,
                    transition: Slide,
                })
                router.refresh()
            } else {
                toast.error(response.message, {
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
            }
        } catch (error) {
            toast.error("Failed to Delete Pls Try Again", {
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
        <button
            disabled={loading}
            onClick={() => deleteWishlist()}
            className="w-10 h-10 cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
            title="Remove item"
            aria-label="Remove from cart">
            {loading ? <LuLoader className='animate-spin' /> : <FaTrash className='text-sm' />}
        </button>
    )
}

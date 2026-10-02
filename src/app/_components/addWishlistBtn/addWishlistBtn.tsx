'use client'
import { AddToWishList } from '@/api/wishlistApi/Addtowishlist'
import { RemoveFromWishlist } from '@/api/wishlistApi/Removewishlist'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Slide, toast } from 'react-toastify'

export default function AddWishlistBtn({ id, wishlistProductIds=[], variant = 'icon', }: { id: string, wishlistProductIds: string[], variant?: 'icon' | 'full' }) {
    const router = useRouter()
    const { data: session } = useSession()
    const isInWishlist = wishlistProductIds.includes(id)
    async function remove() {
        if (!session) {
            router.push('/login')
            toast.error("Login First", {
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
            return
        }
        try {
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
            toast.error("Login First", {
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


    }

    async function Add() {
        if (!session) {
            router.push('/login')
            toast.error("Login First", {
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
            return
        }
        try {
            const response = await AddToWishList(id)
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
            toast.error("Login First", {
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
    }

    if (variant === 'full') {
        return isInWishlist ? (
            <button onClick={() => remove()} className='w-[90%] border-2 py-3 px-4 rounded-xl font-medium cursor-pointer flex items-center justify-center gap-2 border-red-200 text-red-700 bg-red-50'>
                <FaHeart /> In Wishlist
            </button>
        ) : (

            <button onClick={() => Add()} className='w-[90%] border-2 py-3 px-4 rounded-xl font-medium cursor-pointer transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-[#7f5539] hover:text-[#7f5539]'>
                <FaRegHeart />  Add To Wishlist
            </button>
        )
    }
    return (
        <>
            {isInWishlist ? (
                <button onClick={() => remove()} className='bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-red-500 hover:text-red-700 cursor-pointer'><FaHeart /></button>

            ) : (
                <button onClick={() => Add()} className='bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500 cursor-pointer'><FaRegHeart /></button>

            )}
        </>
    )
}

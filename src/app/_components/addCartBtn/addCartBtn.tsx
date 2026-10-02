'use client'
import { AddToCart } from '@/api/cartApi/AddToCart'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Slide, toast } from 'react-toastify'
import { LuLoader } from "react-icons/lu";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface AddCartBtnProps {
    id: string;
    children?: React.ReactNode;
    className?: string;
}
export default function AddCartBtn({ id, children, className }: AddCartBtnProps) {

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()

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
            setLoading(true)
            const response = await AddToCart(id)
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
        } finally {
            setLoading(false)
        }
    }
    return (
        <button disabled={loading} onClick={() => Add()} className={
            className ||
            'h-10 w-10 rounded-full flex items-center justify-center transition bg-[#7f5539] text-white hover:bg-[#5b3d29] cursor-pointer disabled:opacity-70'
        }>{loading ? <LuLoader className='animate-spin' /> : children ? children : <FaPlus />} </button>
    )
}

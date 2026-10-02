'use client'
import { ClearCart } from '@/api/cartApi/ClearCart'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { FaTrash } from 'react-icons/fa'
import { LuLoader } from 'react-icons/lu'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Slide, toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function ClearCartBtn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    function sweetAlert() {
        const iconHtml = renderToString(<MdOutlineShoppingCart className="w-8 h-8 text-red-500 bg-red-100" />);
        Swal.fire({
            html: `
        <div class="flex flex-col items-center justify-center pt-2">
            <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                ${iconHtml}
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Clear your Cart?</h3>
            <p class="text-sm text-gray-400 font-normal">
                All items will be removed from your cart. This action cannot be undone.
            </p>
        </div>
    `,
            showCancelButton: true,
            confirmButtonText: 'Yes, Clear',
            cancelButtonText: 'Keep Shopping',
            reverseButtons: false,
            customClass: {
                popup: 'rounded-2xl p-6 max-w-md',
                confirmButton: 'cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2.5 rounded-xl shadow-none mx-2 outline-none border-0',
                cancelButton: 'cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl shadow-none mx-2 outline-none border-0'
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart()
            }
        });
    }

    async function clearCart() {
        try {
            setLoading(true)

            const response = await ClearCart()
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
            toast.error("Failed To Clear Your Cart Pls Try Again", {
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
            onClick={() => sweetAlert()}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer">
            {loading ? <LuLoader className='animate-spin' /> : <><FaTrash /><span>Clear all items</span></>}
        </button>
    )
}

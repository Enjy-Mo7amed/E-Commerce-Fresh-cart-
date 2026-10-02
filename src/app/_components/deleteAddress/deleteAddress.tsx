"use client"
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation"
import { FiLoader } from "react-icons/fi"
import { useState } from "react"
import { Slide, toast } from "react-toastify"
import { RemoveAddress } from "@/api/addressApi/Removeaddress.api";
import Swal from 'sweetalert2'
import { FaTrashAlt } from 'react-icons/fa'
import { renderToString } from 'react-dom/server'

export default function DeleteAddress({ id }: { id: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    function sweetAlert() {
        const iconHtml = renderToString(<FaTrashAlt className="w-8 h-8 text-red-500" />);
        Swal.fire({
            html: `
        <div class="flex flex-col items-center justify-center pt-2">
            <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            ${iconHtml}
            </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Remove Item?</h3>
                <p class="text-sm text-gray-400 font-normal">
                Are you sure you want to delete this address?
            </p>
        </div>
        `,

            showCancelButton: true,
            confirmButtonText: 'Remove',
            cancelButtonText: 'Cancel',
            reverseButtons: false,
            customClass: {
                popup: 'rounded-2xl p-6 max-w-md',
                confirmButton: 'cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2.5 rounded-xl shadow-none mx-2 outline-none border-0',
                cancelButton: 'cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl shadow-none mx-2 outline-none border-0'
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                Delete()
            }
        });
    }

    const Delete = async () => {
        setLoading(true)
        try {
            const response = await RemoveAddress(id)
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
                    style: { backgroundColor: "#7f5539", color: "#000000", borderRadius: "12px" },
                    icon: <span className="text-black text-xl font-bold">✓</span>,
                    transition: Slide,
                })
                router.refresh()
            } else {
                toast.error(response.message || "Something went wrong", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: { backgroundColor: "#D40000", color: "#000000", borderRadius: "12px" },
                    icon: <span className="text-black text-xl font-bold">✓</span>,
                    transition: Slide,
                })
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: { backgroundColor: "#D40000", color: "#000000", borderRadius: "12px" },
                icon: <span className="text-black text-xl font-bold">✓</span>,
                transition: Slide,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={() => sweetAlert()}
            className="w-9 h-9 cursor-pointer rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50"
            title="Delete address"
        >
            {loading ? <FiLoader className="animate-spin" /> : <FaTrash className="text-sm" />}

        </button>
    )
}

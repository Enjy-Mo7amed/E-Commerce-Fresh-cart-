'use client'
import { RemoveFromCart } from '@/api/cartApi/RemoveFromCart'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { FaTrashAlt } from 'react-icons/fa'
import { LuLoader } from 'react-icons/lu'
import { Slide, toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function RemoveCartBtn({ id, productTitle }: { id: string, productTitle: string }) {
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
          Remove <span class="font-semibold text-gray-600">${productTitle}</span> from your cart?
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
        deleteCart()
      }
    });
  }

  async function deleteCart() {
    try {
      setLoading(true)

      const response = await RemoveFromCart(id)
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
      onClick={() => sweetAlert()}
      className="h-10 w-10 rounded-xl  border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer"
      title="Remove item"
      aria-label="Remove from cart"
    >
      {loading ? <LuLoader className='animate-spin' /> : <FaTrashAlt />}
    </button>
  )
}

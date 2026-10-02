"use client"
import { FaPlus,FaPen} from "react-icons/fa6"
import { FiLoader } from "react-icons/fi"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddAddress } from "@/api/addressApi/AddAddress"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Slide, toast } from "react-toastify"
import { addressSchema, addressSchemaType } from "@/app/schema/address.schema"
import { AddressType } from "@/types/Getloggedaddresses.types"
interface AddressFormDialogProps {
    mode: 'add' | 'edit'
    address?: AddressType
}
export default function AddressBtn({ mode, address }: AddressFormDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const isEdit = mode === 'edit'


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<addressSchemaType>({
        resolver: zodResolver(addressSchema),
        mode: 'all',
        defaultValues: {
            name: address?.name ?? '',
            details: address?.details ?? '',
            phone: address?.phone ?? '',
            city: address?.city ?? '',
        },
    })

    const onSubmit = async (values: addressSchemaType) => {
        setLoading(true)
        try {
            const response = await AddAddress(values)

            if (response.status == "success") {
                toast.success(response.message , {
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
                reset()
                setOpen(false)
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
        <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger className={isEdit?"cursor-pointer w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-[#7f5539] flex items-center justify-center transition-colors" :"cursor-pointer w-fit flex relative justify-center shadow-sm items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group" } >
                {isEdit ? <FaPen className="text-sm" /> :
                <>
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                <span className="relative w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    <FaPlus className="text-xs" /> Add Address
                </span>
                </>
                }
            </DialogTrigger>

            <DialogContent className="max-w-lg  mx-auto rounded-2xl border-0 p-6 bg-white">
                <DialogHeader className="flex flex-row items-center justify-between p-0 mb-6">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        {isEdit ? "Edit Address" : "Add New Address"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Address Name
                        </label>
                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="e.g. Home, Office"
                            className="w-full px-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7f5539] focus:ring-2 focus:ring-[#7f553933] transition-all"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Address
                        </label>
                        <textarea
                            {...register("details")}
                            id="details"
                            rows={3}
                            placeholder="Street, building, apartment..."
                            className="w-full px-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7f5539] focus:ring-2 focus:ring-[#7f553933] transition-all resize-none"
                        />
                        {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <Input
                                {...register("phone")}
                                id="phone"
                                placeholder="01xxxxxxxxx"
                                className="w-full px-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7f5539] focus:ring-2 focus:ring-[#7f553933] transition-all"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                City
                            </label>
                            <Input
                                {...register("city")}
                                id="city"
                                placeholder="Cairo"
                                className="w-full px-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7f5539] focus:ring-2 focus:ring-[#7f553933] transition-all"
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                    </div>

                    <div className='flex gap-3 pt-2'>
                        <DialogClose
                            type="button"
                            className="w-1/2 py-3.5 px-6 cursor-pointer flex relative  justify-center shadow-sm  items-center overflow-hidden font-medium transition-all  bg-black  rounded-md group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out  bg-gray-500 rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full  bg-white rounded-md group-hover:translate-x-0" />
                            <span className="relative w-full flex justify-center items-center gap-2  font-medium text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-black"> Cancel</span>
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 py-3.5 px-6 h-full cursor-pointer flex relative  justify-center shadow-sm  items-center overflow-hidden   font-medium transition-all bg-[#7f5539] rounded-md group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out  bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29]  rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                            <span className="relative w-full flex items-center gap-2 justify-center  font-medium text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">{loading ? <FiLoader className="animate-spin" /> : (isEdit ? "Update Address" : "Add Address")}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
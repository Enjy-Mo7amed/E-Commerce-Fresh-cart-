"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FiLoader } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Slide, toast } from "react-toastify"
import { dataSchema, dataSchemaType } from "@/app/schema/updateData.schema"
import { UpdateUserDataApi } from "@/api/AuthApi/UpdateLoggeduserdata.api"
import { FaFloppyDisk } from "react-icons/fa6"
interface UserData {
    name: string
    email: string
}
export default function UpdateUserData({ userData }: { userData: UserData }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm < dataSchemaType > ({
        resolver: zodResolver(dataSchema),
        mode: 'all',
        defaultValues: {
            name: userData?.name ?? '',
            email: userData?.email ?? '',
        },
    })

    const onSubmit = async (values: dataSchemaType) => {
        setLoading(true)
        try {
            const response = await UpdateUserDataApi(values)
            console.log(response)
            if (response.message == "success") {
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
                reset({
                    name: response.user?.name ?? values.name,
                    email: response.user?.email ?? values.email,
                    phone: values.phone,
                })
                router.refresh()
            } else {
                toast.error(response.errors.msg, {
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
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <Input
                        {...register("name")}
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 h-full rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 h-full rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <Input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        className="w-full px-4 py-3 h-full rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="pt-2">
                    <Button type="submit" className="cursor-pointer w-fit h-full flex relative justify-center shadow-sm items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                        </span>
                        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                        <span className="relative w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                            {loading ? <FiLoader className="animate-spin" /> : <><FaFloppyDisk className="text-xs" /> Save Changes</>}
                        </span>
                    </Button>
                </div>
            </form>
        </>
    )
}

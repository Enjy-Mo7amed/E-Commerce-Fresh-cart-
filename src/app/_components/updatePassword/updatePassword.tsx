"use client"
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FiLoader } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Slide, toast } from "react-toastify"
import { updatePassSchema, updatePassSchemaType } from "@/app/schema/updatePass.schema"
import { UpdateUserPasswordApi } from "@/api/AuthApi/Updateuserpassword.api";
import { signOut } from "next-auth/react";

export default function UpdatePassword() {
    const [showpass, setShowpass] = useState(false)
    const [showrePass, setShowrePass] = useState(false)
    const [showCurrentPass, setshowCurrentPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm < updatePassSchemaType > ({
        resolver: zodResolver(updatePassSchema),
        mode: 'all',
    })
    const currentPasswordValue = watch("currentPassword")
    const passValue = watch("password")
    const repassValue = watch("rePassword")

    const onSubmit = async (values: updatePassSchemaType) => {
        setLoading(true)
        try {
            const response = await UpdateUserPasswordApi(values)
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
                reset()
                await signOut({ redirect: false })
                router.push("/login")
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
                    <label htmlFor="CurrentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                    </label>
                    <div className="relative">
                        <Input
                            {...register("currentPassword")}
                            id="CurrentPassword"
                            type={showCurrentPass ? "text" : "password"}
                            placeholder="Enter your current password"
                            className="w-full px-4 py-3 pr-12 h-full rounded-xl border border-gray-200 focus:border-[#B68E0C] focus:ring-2 focus:ring-[#7f5539] outline-none transition-all"
                        />
                        {currentPasswordValue && <span onClick={() => setshowCurrentPass(!showCurrentPass)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'>{showCurrentPass ? <FaEye /> : <FaEyeSlash />}</span>}
                    </div>
                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
                </div>

                <div>
                    <label htmlFor="NewPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                    </label>
                    <div className="relative">
                        <Input
                            {...register("password")}
                            id="NewPassword"
                            type={showpass ? "text" : "password"}
                            minLength={6}
                            placeholder="Enter your new password"
                            className="w-full px-4 py-3 pr-12 h-full rounded-xl border border-gray-200 focus:border-[#B68E0C] focus:ring-2 focus:ring-[#7f5539] outline-none transition-all"
                        />
                        {passValue && <span onClick={() => setShowpass(!showpass)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'>{showpass ? <FaEye /> : <FaEyeSlash />}</span>}
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="ConfirmNewPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <Input
                            {...register("rePassword")}
                            id="ConfirmNewPassword"
                            type={showrePass ? "text" : "password"}
                            placeholder="Confirm your new password"
                            className="w-full px-4 py-3 pr-12 h-full rounded-xl border border-gray-200 focus:border-[#B68E0C] focus:ring-2 focus:ring-[#7f5539] outline-none transition-all"
                        />
                        {repassValue && <span onClick={() => setShowrePass(!showrePass)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'>{showrePass ? <FaEye /> : <FaEyeSlash />}</span>}

                    </div>
                    {errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>}
                </div>

                <div className="pt-4">
                    <Button type="submit" className="cursor-pointer h-full w-fit flex relative justify-center shadow-sm items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#B68E0C] rounded-md group">
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#B68E0C] rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                        </span>
                        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#B68E0C] rounded group-hover:-ml-4 group-hover:-mb-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#6a5307] rounded-md group-hover:translate-x-0" />
                        <span className="relative w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                            {loading ? <FiLoader className="animate-spin" /> : <><FaLock className="text-sm" /> Change Password </>}
                        </span>
                    </Button>
                </div>
            </form>
        </>
    )
}

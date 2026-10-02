"use client"
import { FaArrowLeft, FaEnvelope, FaKey, FaLock } from 'react-icons/fa'
import { FaShieldHalved } from 'react-icons/fa6'
import Link from 'next/link';
import { useState } from 'react'
import { ForgotPasswording } from '@/api/AuthApi/ForgotPassword';
import { Slide, toast } from 'react-toastify'
import { FiLoader } from 'react-icons/fi'
import { ResetCodeing } from '@/api/AuthApi/ResetCode.api';
import { useRouter } from 'next/navigation'
import { FaCheck } from "react-icons/fa6";
import { ResetPassword } from '@/api/AuthApi/ResetPassword.api';

export default function ForgetPassword() {
    const [email, setEmail] = useState("")
    const [resetCode, setResetCode] = useState("")
    const [resetPass, setResetPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [loading, setLoading] = useState(false)
    const [change, setChange] = useState<"sent" | "verify" | "reset">("sent")
    const router = useRouter()

    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            setLoading(true)
            const response = await ForgotPasswording(email)
            if (response.statusMsg == "success") {
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
                setChange("verify")
            } else {
                toast.error("sumting went wrong", {
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
            toast.error("somthing went wrong", {
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

    async function resendCode() {
        try {
            setLoading(true)
            const response = await ForgotPasswording(email)
            if (response.statusMsg == "success") {
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
            } else {
                toast.error("somthing went wrong", {
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
            toast.error("somthing went wrong", {
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

    async function handelReset(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            setLoading(true)
            const response = await ResetCodeing(resetCode)
            if (response.status == "Success") {
                setChange("reset")
            } else {
                toast.error("somthing went wrong", {
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
            toast.error("somthing went wrong", {
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

    async function handelResetPassword(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            if (resetPass !== confirmPass) {
                toast.error("Passwords do not match", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    theme: "light",
                    style: { backgroundColor: "#D40000", color: "#000000", borderRadius: "12px" },
                    transition: Slide,
                })
                return
            }
            setLoading(true)
            const response = await ResetPassword(email, resetPass)
            if (response.token) {
                toast.success("password Changed Successfully", {
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
                router.push('/login')
            } else {
                toast.error("somthing went wrong", {
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
            toast.error("somthing went wrong", {
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
        <>
            <div
                className="container py-8"
                id="forgot-password-section"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    <div className="hidden lg:block">
                        <div className="text-center space-y-6">
                            <div className="w-full h-96 bg-linear-to-br from-amber-50 via-[#7f553969] to-amber-100 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
                                <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[#7f5539a5]" />
                                <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-[#7f553969]" />
                                <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-[#7f5539a5]" />

                                <div className="relative flex flex-col items-center gap-6 z-10">
                                    <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                                        <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center">
                                            <FaLock className=' text-[#7f5539] text-4xl' />
                                        </div>
                                    </div>

                                    <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                                        <FaEnvelope className='text-[#856048] text-xl' />
                                    </div>

                                    <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                                        <FaShieldHalved className='text-[#856048] text-xl' />
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-3 h-3 rounded-full bg-[#816654] animate-pulse" />
                                        <div className="w-3 h-3 rounded-full bg-[#815d45] animate-pulse [animation-delay:150ms]" />
                                        <div className="w-3 h-3 rounded-full bg-[#7f5539] animate-pulse [animation-delay:300ms]" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    Reset Your Password
                                </h2>

                                <p className="text-lg text-gray-600">
                                    Don't worry, it happens to the best of us. We'll help you get back
                                    into your account in no time.
                                </p>

                                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <FaEnvelope className='text-[#7f5539] mr-2' />
                                        Email Verification
                                    </div>

                                    <div className="flex items-center">
                                        <FaShieldHalved className='text-[#7f5539] mr-2' />
                                        Secure Reset
                                    </div>

                                    <div className="flex items-center">
                                        <FaLock className='text-[#7f5539] mr-2' />
                                        Encrypted
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-4">
                                    <span className="text-3xl font-bold text-[#7f5539]">
                                        Fresh<span className="text-gray-800">Cart</span>
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    Forgot Password?
                                </h1>

                                <p className="text-gray-600">
                                    No worries, we'll send you a reset code
                                </p>
                            </div>

                            <div className="flex items-center justify-center mb-8">
                                <div className="flex items-center">
                                    <div className={change == "sent" ? "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#7f5539] text-white ring-4 ring-amber-100" : "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#7f5539] text-white"}>
                                        {change == "sent" ? <FaEnvelope className=' text-xs' /> : <FaCheck className=' text-xs' />}
                                    </div>
                                    <div className={change == "sent" ? 'w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200' : "w-16 h-0.5 mx-2 transition-all duration-300 bg-[#7f5539]"} />
                                </div>

                                <div className="flex items-center">
                                    <div className={change == "sent" ? "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400" : change == "verify" ? "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#7f5539] text-white ring-4 ring-amber-100" : "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#7f5539] text-white"}>
                                        {change == "reset" ? <FaCheck className='text-xs' /> : <FaKey className='text-xs' />}
                                    </div>
                                    <div className={change == "reset" ? "w-16 h-0.5 mx-2 transition-all duration-300 bg-[#7f5539]" : "w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"} />
                                </div>

                                <div className="flex items-center">
                                    <div className={change == "sent" || change == "verify" ? "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400" : "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#7f5539] text-white ring-4 ring-amber-100"}>
                                        <FaLock className=' text-xs' />
                                    </div>
                                </div>
                            </div>

                            {change == "sent" ? <>
                                <form onSubmit={handelSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                id="email"
                                                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                                                placeholder="Enter your email address"
                                                type="email"
                                                name="email"
                                            />
                                            <FaEnvelope className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                                        </div>
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className=" cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                        </span>
                                        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                        </span>
                                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                        <span className="relative w-full flex items-center justify-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">{loading ? <><FiLoader className="animate-spin" /></> : <>Send Reset Code</>}</span>
                                    </button>

                                    <div className="text-center">
                                        <Link
                                            className="inline-flex items-center gap-2 text-sm text-[#7f5539] hover:text-[#5b3d29] font-medium transition-colors"
                                            href="/login"
                                        >
                                            <FaArrowLeft className='text-xs' />
                                            Back to Sign In
                                        </Link>
                                    </div>
                                </form>
                                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-gray-600">
                                        Remember your password?
                                        <Link
                                            className="text-[#7f5539] hover:text-[#7f5539] font-semibold transition-colors"
                                            href="/login"
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </>
                                : change == "verify" ? <>
                                    <form onSubmit={handelReset} className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="resetCode"
                                                className="block text-sm font-semibold text-gray-700 mb-2"
                                            >
                                                Verification Code
                                            </label>

                                            <div className="relative">
                                                <input id="resetCode"
                                                    onChange={(e) => setResetCode(e.target.value)}
                                                    value={resetCode}
                                                    autoComplete="off"
                                                    maxLength={6}
                                                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-center text-2xl tracking-[0.5em] font-mono"
                                                    placeholder="••••••"
                                                    type="text"
                                                    name="resetCode" />
                                                <FaShieldHalved className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500">
                                                Didn't receive the code?
                                                <button disabled={loading} type="button" onClick={() => resendCode()} className="text-[#7f5539] cursor-pointer hover:text-[#5b3d29] font-semibold transition-colors">Resend Code</button>
                                            </p>
                                        </div>
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className=" cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group disabled:opacity-50 disabled:cursor-not-allowed">
                                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                            </span>
                                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                            <span className="relative w-full flex items-center justify-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">{loading ? <><FiLoader className="animate-spin" /></> : <>Verify Code</>}</span>
                                        </button>

                                        <div className="text-center">
                                            <p
                                                onClick={() => setChange("sent")}
                                                className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#7f5539] hover:text-[#5b3d29] font-medium transition-colors"
                                            >
                                                <FaArrowLeft className='text-xs' />
                                                Change email address
                                            </p>
                                        </div>
                                    </form>
                                </> :
                                    <form onSubmit={handelResetPassword} className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="Newpassword"
                                                className="block text-sm font-semibold text-gray-700 mb-2"
                                            >
                                                New Password
                                            </label>

                                            <div className="relative">
                                                <input
                                                    onChange={(e) => setResetPass(e.target.value)}
                                                    value={resetPass}
                                                    id="Newpassword"
                                                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                                                    placeholder="Enter new password"
                                                    type="password"
                                                    name="newPassword"
                                                />
                                                <FaLock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="Confirmpassword"
                                                className="block text-sm font-semibold text-gray-700 mb-2"
                                            >
                                                Confirm Password
                                            </label>

                                            <div className="relative">
                                                <input
                                                    onChange={(e) => setConfirmPass(e.target.value)}
                                                    value={confirmPass}
                                                    autoComplete="new-password"
                                                    id="Confirmpassword"
                                                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                                                    placeholder="Confirm new password"
                                                    type="password"
                                                    name="confirmPassword"
                                                />
                                                <FaLock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                                            </div>
                                        </div>

                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group disabled:opacity-50 disabled:cursor-not-allowed">
                                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                            </span>
                                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                            <span className="relative w-full flex items-center justify-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">{loading ? <><FiLoader className="animate-spin" /></> : <>Reset Password</>}</span>
                                        </button>
                                    </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

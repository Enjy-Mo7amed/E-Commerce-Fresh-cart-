'use client'
import { loginSchema, loginSchemaType } from '@/app/schema/login.schema'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaClock, FaEye, FaEyeSlash, FaLock, FaShieldAlt, FaSpinner, FaStar, FaTruck, FaUsers } from 'react-icons/fa'
import { Slide, toast } from 'react-toastify'
import img from '../../../public/cart.png'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Login() {
  const [showpass, setShowpass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'all'
  })
  const passValue = form.watch("password")

  const handelLogin = async (values: loginSchemaType) => {
    setLoading(true)
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/"
      })
      if (response?.ok) {
        toast.success('Signed in successfully ', {
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
        router.push("/")
        router.refresh()
      } else {
        toast.error(response?.error, {
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
      toast.error('Failed To Login', {
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
      <title>Login</title>
      <main className='py-10'>

        <div className="container max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* left content */}
          <div className='hidden lg:block'>
            <div className="text-center space-y-6">
              <Image className='w-full h-96 object-cover rounded-2xl shadow-lg' width={500} height={500} src={img} alt='cart img' />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-lg text-gray-600">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center"><FaTruck className='text-[#7f5539] mr-2' /> Free Delivery</div>
                  <div className="flex items-center"><FaShieldAlt className='text-[#7f5539] mr-2' /> Secure Payment</div>
                  <div className="flex items-center"><FaClock className='text-[#7f5539] mr-2' /> 24/7 Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* right content */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-center text-3xl font-semibold mb-2"><span className='text-[#7f5539]'>Fresh</span>Cart <br />Welcome Back!
            </h2>
            <p className="text-center mb-5">Sign in to continue your fresh shopping experience</p>

            <form onSubmit={form.handleSubmit(handelLogin)} className="space-y-7">

              {/* email */}
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email Address<span className='text-red-700'>*</span></FieldLabel>
                    <Input
                      className='p-5 rel border border-gray-400 focus:border-[#7f5539] '
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your Email'
                      autoComplete='email'
                      type='email'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* passssssss */}
              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className='relative' data-invalid={fieldState.invalid}>
                    {passValue && <span onClick={() => setShowpass(!showpass)} className='absolute w-fit! right-3 top-10 cursor-pointer'>{showpass ? <FaEye /> : <FaEyeSlash />}</span>}
                    <FieldLabel htmlFor={field.name}>Password<span className='text-red-700'>*</span></FieldLabel>
                    <Input
                      className='p-5 rel border border-gray-400 focus:border-[#7f5539] '
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your password'
                      autoComplete='new-password'
                      type={showpass ? "text" : "password"}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      <Link href={'/forgetpassword'}><button className="text-[#7f5539] max-w-fit hover:text-[#5b3d29] cursor-pointer">Forget Password?</button></Link>
                  </Field>
                )}
              />

              <div className="flex gap-2 items-center ">
                <Checkbox id="terms-checkbox" name="terms-checkbox" />
                <Label htmlFor="terms-checkbox" className='cursor-pointer'>Keep me Signed in</Label>
              </div>

              <button disabled={loading} type='submit' className=" cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                <span className="relative w-full flex items-center justify-center  font-semibold text-lg  text-white transition-colors duration-200 ease-in-out group-hover:text-white">{loading ? <FaSpinner className='animate-spin' /> : 'Sign In'}</span>
              </button>
            </form>

            <p className="border-t pt-5 border-gray-400/30 my-4 text-center">
              New to FreshCart?
              <Link href={'/register'} className='text-[#7f5539] hover:underline font-medium'>Create an account</Link>
            </p>
            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center gap-1"><FaLock /> SSL Secured</div>
              <div className="flex items-center gap-1"><FaUsers /> 50K+ Users</div>
              <div className="flex items-center gap-1"><FaStar /> 4.9 Rating</div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

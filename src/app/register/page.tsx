'use client'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaShieldAlt, FaSpinner, FaStar, FaUserPlus } from 'react-icons/fa'
import { FaTruckFast } from 'react-icons/fa6'
import img from '../../../public/review-author.webp'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, registerSchemaType } from '@/app/schema/register.schema'
import { FormField } from '@/types/FormField.types'
import { Slide, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [showpass, setShowpass] = useState(false)
  const [showrePass, setShowrePass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'all'
  })
  const passValue = form.watch("password")
  const repassValue = form.watch("rePassword")

  const handelRegister = async (values: registerSchemaType) => {
    setLoading(true)
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (data.message == "success") {
        toast.success('Registerd successfully ', {
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
        toast.error(data.message, {
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
      toast.error('Error', {
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

  const formFelids: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', Autocomplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', Autocomplete: 'email' },
  ]

  return (
    <>
      <title>Sign Up</title>
      <main className='py-10'>

        <div className="container  max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* left content */}
          <div className='hidden md:block'>
            <h1 className="text-4xl font-bold">
              Welcome to <span className='text-[#7f5539]'>Fresh Cart</span></h1>
            <p className="text-xl mt-2 mb-4">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
            <ul className='*:flex *:items-start *:gap-4 space-y-6 my-8'>
              <li className='flex items-center gap-3'>
                <div className='h-12 w-12 text-lg bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                  <FaStar />
                </div>
                <div className=''>
                  <h4 className='font-semibold text-gray-900 text-lg'>Premium Quality</h4>
                  <p className='text-gray-600'>Premium quality products sourced from trusted suppliers.</p>
                </div>
              </li>

              <li className='flex items-center gap-3'>
                <div className='h-12 w-12 text-lg bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                  <FaTruckFast />
                </div>
                <div className=''>
                  <h4 className='font-semibold text-gray-900 text-lg'>Fast Delivery</h4>
                  <p className='text-gray-600'>Same-day delivery available in most areas</p>
                </div>
              </li>

              <li className='flex items-center gap-3'>
                <div className='h-12 w-12 text-lg bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                  <FaShieldAlt />
                </div>
                <div className=''>
                  <h4 className='font-semibold text-gray-900 text-lg'>Secure Shopping</h4>
                  <p className='text-gray-600'>Your data and payments are completely secure</p>
                </div>
              </li>
            </ul>
            <div className="bg-white shadow-sm p-4 rounded-md">
              <div className="flex items-center gap-4 mb-4">
                <Image width={500} height={500} className='size-12 rounded-full' src={img} alt="img review" />
                <div>
                  <h3>Engy Mohamed</h3>
                  <div className="flex gap-1 *:text-yellow-300">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <blockquote className='italic text-gray-600'>
                "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
              </blockquote>
            </div>
          </div>

          {/* right content */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-center text-3xl font-semibold mb-2">Create Your Account</h2>
            <p className="text-center">Start your fresh journey with us today</p>
            <form onSubmit={form.handleSubmit(handelRegister)} className="space-y-7">

              {/* name & email */}
              {formFelids.map((input) => <Controller
                key={input.name}
                name={input.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{input.label} <span className='text-red-700'>*</span></FieldLabel>
                    <Input
                      className='p-5 border border-gray-400 focus:border-[#7f5539] '
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={input.placeholder}
                      autoComplete={input.Autocomplete}
                      type={input.type}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />)}

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
                  </Field>
                )}
              />

              {/* repaaaaaaaaaas */}
              <Controller
                name='rePassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className='relative' data-invalid={fieldState.invalid}>
                    {repassValue && <span onClick={() => setShowrePass(!showrePass)} className='absolute w-fit! right-3 top-10 cursor-pointer'>{showrePass ? <FaEye /> : <FaEyeSlash />}</span>}
                    <FieldLabel htmlFor={field.name}>Confirm Password <span className='text-red-700'>*</span></FieldLabel>
                    <Input
                      className='p-5 border border-gray-400 focus:border-[#7f5539] '
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Confirm your password'
                      autoComplete='new-password'
                      type={showrePass ? "text" : "password"}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* phone */}
              <Controller
                name='phone'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number <span className='text-red-700'>*</span></FieldLabel>
                    <Input
                      className='p-5 border border-gray-400 focus:border-[#7f5539] '
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your Phone'
                      autoComplete='phone'
                      type='tel'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className="flex gap-2 items-center ">
                <Checkbox id="terms-checkbox" name="terms-checkbox" />
                <Label htmlFor="terms-checkbox" className='cursor-pointer text-[11px] sm:text-[15px]'>I agree to the  <Link href={'/terms'} className='text-[12px] sm:text-[16px] text-[#7f5539]'> Terms of Service</Link> and <Link href={'/privacy'} className='text-[12px] sm:text-[16px] text-[#7f5539]'>Privacy Policy</Link><span className='text-lg'>*</span></Label>
              </div>
              <button disabled={loading} type='submit' className=" cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                <span className="relative w-full flex items-center justify-center  font-semibold text-lg  text-white transition-colors duration-200 ease-in-out group-hover:text-white">{loading ? <FaSpinner className='animate-spin' /> : <span className='flex items-center gap-2'><FaUserPlus /> Create My Account</span>}</span>
              </button>
            </form>
            <p className="border-t pt-5 border-gray-400/30 my-4 text-center">
              Already have an account?
              <Link href={'/login'} className='text-[#7f5539] hover:underline font-medium'>Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

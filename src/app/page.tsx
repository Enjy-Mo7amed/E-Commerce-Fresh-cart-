import HomeSwiper from './_components/homeSwiper/homeSwiper';
import { TbReload } from "react-icons/tb";
import { FaApple, FaArrowRight, FaGooglePlay, FaLeaf, FaShieldAlt, FaTag, FaTruck } from "react-icons/fa";
import { MdEmail, MdHeadsetMic } from "react-icons/md";
import HomeCategories from './_components/homeCategories/homeCategories';
import { AllCategories } from "@/api/categoryApi/allCategory";
import HomeSection4 from './_components/homeSection4/homeSection4';
import Link from "next/link";
import AllProductsDesign from "@/app/_components/allProducts/allProducts";
import { AllProducts } from '@/api/allProducts';
import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist';
import { ProductType } from '@/types/allProducts.types';

export default async function Home() {
  const [data, productdata, wishlist] = await Promise.all([AllCategories(), AllProducts(), GetLoggedUserWishlist()])
  const wishlistProductIds: string[] = wishlist?.data?.map((item: ProductType) => item._id || item.id) ?? []

  return (
    <>
      <title>FreshCart</title>

      {/* swiiiiper */}
      <HomeSwiper />

      {/* section 2  */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                <FaTruck />
              </div>
              <div className=''>
                <h4 className='font-medium text-gray-900 text-sm'>Free Shipping</h4>
                <p className='text-xs text-gray-500'>On Orders over 500 EGP</p>
              </div>
            </div>
            <div className='flex items-center gap-4 bg-white p-4 rounded-xl  shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                <FaShieldAlt />
              </div>
              <div>
                <h4 className='font-medium text-gray-900 text-sm'>Secure Payment</h4>
                <p className='text-xs text-gray-500'>100% Secure transaction</p>
              </div>
            </div>
            <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center  justify-center shrink-0'>
                <TbReload />
              </div>
              <div className=''>
                <h4 className='font-medium text-gray-900 text-sm'>Easy Return</h4>
                <p className='text-xs text-gray-500'>14-day return policy</p>
              </div>
            </div>
            <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                <MdHeadsetMic />
              </div>
              <div className=''>
                <h4 className='font-medium text-gray-900 text-sm'>24/7 Support</h4>
                <p className='text-xs text-gray-500'>Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* categories section */}
      <HomeCategories data={data} />

      {/* section 4 */}
      <HomeSection4 />

      {/* Products section */}
      <section className="py-10">
        <div className="container">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-[#7f553969] to-[#5b3d29] rounded-full"></div>
            <h2 className='text-3xl font-bold text-gray-800'>Featured <span className='text-[#7f5539]'>Products</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <AllProductsDesign data={productdata} wishlistProductIds={wishlistProductIds} />
          </div>
        </div>
      </section>

      {/* last section */}
      <section className="py-16 bg-linear-to-b from-white to-gray-50">
        <div className="container">
          <div className="bg-linear-to-br relative from-amber-50 via-white to-amber-50 rounded-[2.5rem] border border-amber-500/50 shadow-2xl shadow-amber-500/10  overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-[#7f55392e] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-[#7f55392e] to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
            <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
              <div className="lg:col-span-3 space-y-6">

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 text-white text-2xl bg-linear-to-br from-[#7f553969] to-[#7f5539] rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30"><MdEmail /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#7f5539] uppercase tracking-wide">NEWSLETTER</h3>
                    <p className="text-xs text-gray-500">50,000+ subscribers</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">Get the Freshest Updates <span className="text-[#7f5539]"> Delivered Free</span></h2>
                  <p className="text-gray-500 mt-3 text-lg">Weekly recipes, seasonal offers & exclusive member perks.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-amber-100 px-4 py-2.5 rounded-full shadow-sm">
                    <div className="w-7 h-7 bg-[#7f553969] rounded-full flex items-center justify-center">
                      <FaLeaf />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Fresh Picks Weekly
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-[#7f553969] px-4 py-2.5 rounded-full shadow-sm">
                    <div className="w-7 h-7 bg-[#7f553969] rounded-full flex items-center justify-center">
                      <FaTruck />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Free Delivery Codes
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-[#7f553969] px-4 py-2.5 rounded-full shadow-sm">
                    <div className="w-7 h-7 bg-[#7f553969] rounded-full flex items-center justify-center">
                      <FaTag />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Members-Only Deals
                    </span>
                  </div>
                </div>

                <form className="pt-2" >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input type="email" name="email" required placeholder="you@example.com" className="w-full pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5b3d29] focus:ring-4 focus:ring-[#7f55394a] transition-all text-base shadow-sm" />
                    </div>

                    <button type="submit" className="cursor-pointer flex relative justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                      </span>
                      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                      <span className="relative w-full flex items-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">Subscribe <FaArrowRight className="text-xs" /></span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 pl-1">✨ Unsubscribe anytime. No spam, ever.</p>
                </form>
              </div>

              <div className="lg:col-span-2 lg:border-l lg:border-amber-100 lg:pl-8">
                <div className="h-full flex flex-col justify-center">
                  <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl"></div>
                    <div className="relative space-y-5">
                      <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-500/30">
                        📱 MOBILE APP
                      </div>
                      <h3 className="text-2xl font-bold leading-tight">Shop Faster on Our App</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Get app-exclusive deals & 15% off your first order.</p>
                      <div className="flex flex-col gap-3 pt-2">
                        <Link href={'/'} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]">
                          <FaApple />
                          <div className="text-left">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                              DOWNLOAD ON
                            </div>
                            <div className="text-sm font-semibold -mt-0.5">App Store</div>
                          </div>
                        </Link>

                        <Link href={'/'} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]">
                          <FaGooglePlay />
                          <div className="text-left">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                              GET IT ON
                            </div>
                            <div className="text-sm font-semibold -mt-0.5">Google play</div>
                          </div>
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 pt-2 text-sm">
                        <span>⭐⭐⭐⭐⭐</span>
                        <span className="text-gray-400">4.9 • 100K+ downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

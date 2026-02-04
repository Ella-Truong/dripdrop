'use client'

import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage({setUser}) {
    return (
        <div className="min-h-screen w-full">
            <Image
                src='/bg10.jpg'
                alt='Login background'
                fill
                className='object-cover'
            />
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="relative inset-0 flex items-center justify-center p-2 z-20 font-serif tracking-wider animate-fadeInUp min-h[calc(100vh-4rem-7rem)]">
                <div className="w-10/12 sm:max-w-md  sm:p-8 p-6 bg-white/30 rounded-3xl shadow-xl border border-pink-200 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-pink-400 mb-3 text-center">Welcome Back!</h1>
                    <p className="text-center text-pink-300 mb-6 animate-pulse">✨ Login to continue ✨</p>
                    <LoginForm setUser={setUser}/>
                    <p className="mt-4 text-center text-gray-300 text-sm">
                        Don't have an account?{' '}
                        <a href='/signup' className='text-pink-400 font-semibold hover:underline'>Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

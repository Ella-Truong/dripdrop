'use client'
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full">
            {/* Background Image */}
            <Image
                src='/login11.jpg'
                alt='Login background'
                fill
                className='object-cover'
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Login Card */}
            <div className="absolute inset-0 flex items-center justify-center p-2 z-20 font-serif tracking-wider animate-fadeInUp">
                <div className="w-full max-w-md p-8 bg-white/30 rounded-3xl shadow-xl border border-pink-200 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-pink-400 mb-3 text-center">Welcome Back!</h1>
                    <p className="text-center text-pink-300 mb-6 animate-pulse">✨ Login to continue ✨</p>
                    <LoginForm />
                    <p className="mt-4 text-center text-gray-300 text-sm">
                        Don't have an account?{' '}
                        <a href='/signup' className='text-pink-400 font-semibold hover:underline'>Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    )
}


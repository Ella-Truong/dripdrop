'use client'
import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";

export default function SignUpPage() {
    return (
        <div className="min-h-screen w-full">
            {/* Background Image */}
            <Image
                src='/bg10.jpg'
                alt='Sign Up background'
                fill
                className='object-cover'
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Sign-up Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-20 animate-fadeInUp">
                <div className="w-full max-w-md p-8 bg-white/30 rounded-3xl shadow-xl border border-pink-200 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-pink-400 mb-4 text-center">Welcome!</h1>
                    <p className="text-center text-pink-300 mb-6 animate-pulse">✨ Create your account to get started ✨</p>
                    
                    <SignUpForm />

                    <p className="mt-4 text-center text-gray-300 text-sm">
                        Already have an account?{' '}
                        <a href='/login' className='text-pink-400 font-semibold hover:underline'>Login</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

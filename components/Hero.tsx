'use client'
import React from 'react'
import { useCursor } from './CursorContext'

export default function Hero() {
    const { setCursorType } = useCursor()

    return (
        <section className="sticky top-0 z-0 flex flex-col items-center justify-center text-center min-h-[100vh] px-6 md:px-20 max-w-6xl mx-auto py-20 pointer-events-auto">
            <h1 className="text-5xl md:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-black mb-8 md:max-w-200">
                Designing with humans at the <span className="font-[family-name:var(--font-allura)] font-normal block md:inline text-6xl md:text-[5.5rem]">centre.</span>
            </h1>

            <p className="text-xl md:text-2xl text-black/70 font-semibold max-w-2xl leading-relaxed mb-12">
                Building 0→1 products that remove friction and drive product-led growth across <span className="text-black">EdTech</span>, <span className="text-black">AI</span>, <span className="text-black">SaaS</span>, and <span className="text-black">B2B</span> domains.
            </p>

            <button
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className="bg-black text-white px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10 z-10"
            >
                Available for full-time
            </button>
        </section>
    )
}

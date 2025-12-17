'use client'
import Image from 'next/image'
import { useCursor } from './CursorContext'

export default function Navbar() {
    const { setCursorType } = useCursor()

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-3 bg-white/60 backdrop-blur-2xl border-b border-black/[0.03]">
            <div
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className="flex items-center justify-center gap-2 cursor-pointer group"
            >
                <Image
                    src="https://vvkngtowfxhlrlogbanj.supabase.co/storage/v1/object/public/app/Group%202.png"
                    alt="Logo"
                    width={25}
                    height={25}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-lg md:text-xl font-bold tracking-tighter text-black">M. Abderrahmane</span>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                <button
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                    className="text-xs md:text-sm font-bold text-black hover:opacity-100 opacity-60 transition-all"
                >
                    Resume
                </button>
                <button
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                    className="text-xs md:text-sm font-bold px-6 py-2 border-2 border-black/10 text-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
                >
                    Contact
                </button>
            </div>
        </nav>
    )
}

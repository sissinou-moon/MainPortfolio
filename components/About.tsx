'use client'
import Image from 'next/image'
import { useCursor } from './CursorContext'

export default function About() {
    const { setCursorType } = useCursor()

    return (
        <section className="relative z-30 bg-white py-32 px-6 md:px-20 overflow-hidden">
            <div className="max-w-6xl mx-auto relative">
                {/* Floating Photos */}
                <div className="absolute bottom-20 -left-10 md:-left-10 w-40 md:w-30 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl -rotate-12 z-0 opacity-90 transition-transform duration-500 hover:rotate-0 hover:scale-110 cursor-none"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}>
                    <Image src="/photo1.jpg" alt="Work life" fill className="object-cover" />
                </div>

                <div className="absolute top-23 -right-5 md:right-15 w-44 md:w-30 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl rotate-6 z-0 opacity-90 transition-transform duration-500 hover:rotate-0 hover:scale-110 cursor-none"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}>
                    <Image src="/photo2.jpg" alt="Creative session" fill className="object-cover" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto text-center md:text-left pt-20 pb-10">
                    <div className='border border-black/10 rounded-full w-fit mx-auto h-9 py-1 px-4 bg-black/6'>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black inline-block mb-6">
                            who am i
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight text-black leading-tight">
                        A Little About <span className="font-[family-name:var(--font-allura)] font-normal text-6xl md:text-[6.5rem] ml-2">Me</span>
                    </h2>

                    <div className="space-y-8 text-lg md:text-xl text-black font-semibold leading-relaxed">
                        <p>
                            I’m Rimpa Roy, UX + Product Designer based in India with 4+ years of experience shaping user-centered digital products across EdTech + AI, SaaS, and B2B domains.
                        </p>
                        <p className="text-black/60 font-medium">
                            My journey into design began with a simple curiosity — how people think, feel, and interact with technology. Over time, that curiosity evolved into a deep passion for building experiences that simplify lives, empower users, and create lasting value.
                        </p>
                        <p className="text-black/60 font-medium">
                            I combine UX research, behavioral psychology, and product strategy to craft designs that are not just interactive, but also meaningful and data-driven. From leading 0→1 products to scaling design systems and improving workflows by 80%, I thrive at the intersection of design, usability, and business impact.
                        </p>
                    </div>
                    <Image src="/Signature.png" alt="Signature" width={100} height={100} className="object-contain mt-10" />
                </div>
            </div>
        </section>
    )
}

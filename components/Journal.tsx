'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, Clock, Star } from 'lucide-react'
import Image from 'next/image'
import { useCursor } from './CursorContext'

const journalItems = [
    {
        type: 'Design thinking',
        title: 'Solving real problems',
        description: 'If you want to take on real problems, you need to get out and talk to the people who are facing them.',
        images: [
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=400'
        ]
    },
    {
        type: 'Product',
        title: 'Designing for Developers',
        description: 'Working at the intersection of design and development taught me that clarity is the ultimate luxury.',
        images: [
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400'
        ]
    },
    {
        type: 'AI Systems',
        title: 'Neural Interfaces & UX',
        description: 'Exploring how neuroevolutionary algorithms like NEAT can shape the next generation of adaptive interfaces.',
        images: [
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600'
        ]
    },
    {
        type: 'UX Research',
        title: 'Data-Driven Design',
        description: 'How we used behavioral psychology and user data to improve product conversion rates by over 40% in six months.',
        images: [
            'https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
        ]
    }
]

export default function Journal() {
    const { setCursorType } = useCursor()

    return (
        <section className="relative z-30 bg-white py-24 px-6 md:px-20 border-t border-black/5 flex justify-center">
            <div className="max-w-7xl w-full">
                <div className="flex flex-col mb-16 text-center justify-center items-center">
                    <div className='border border-black/10 rounded-full w-fit mb-6 py-1.5 px-4 bg-black/[0.03] flex items-center justify-center font-bold text-[10px] uppercase tracking-[0.3em]'>
                        What i build
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6">
                        Scribbles From My <span className="font-[family-name:var(--font-allura)] font-normal italic text-6xl md:text-[5.5rem] ml-2">Journal</span>
                    </h2>
                    <p className="text-xl text-black/60 font-semibold max-w-2xl leading-relaxed">
                        Thoughts, reflections, and lessons from the messy, exciting world of design.
                    </p>
                </div>

                <div className='flex justify-center items-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center w-[70%]">
                        {journalItems.map((item, idx) => (
                            <JournalCard key={idx} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function JournalCard({ item }: { item: typeof journalItems[0] }) {
    const { setCursorType } = useCursor()
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => {
                setCursorType('read-more')
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setCursorType('default')
                setIsHovered(false)
            }}
            className="group relative border border-black/10 rounded-[2.5rem] p-10 transition-all duration-700 hover:shadow-2xl hover:shadow-black/[0.03] bg-white cursor-none flex flex-col h-full min-h-[500px]"
        >
            {/* Title and Huge Arrow */}
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight pr-4">{item.title}</h3>
                <motion.div
                    animate={{ x: isHovered ? 10 : 0, rotate: isHovered ? -10 : 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <ArrowRight className="w-12 h-12 text-black/80" strokeWidth={2.5} />
                </motion.div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40 mb-8">
                <div className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> 5 min read</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 10 Nov 2025</div>
                <div className="flex items-center gap-1.5 text-black"><Star className="w-4 h-4" /> {item.type}</div>
            </div>

            {/* Floating Stacks - Absolute Positioning Simulation within a container to not take flow space */}
            <div className="relative h-20 w-full mb-8 z-10">
                {item.images.map((img, iIdx) => (
                    <motion.div
                        key={iIdx}
                        className="absolute w-36 h-24 md:w-44 md:h-28 border-[6px] border-white shadow-xl rounded-2xl overflow-hidden"
                        style={{
                            left: '30%',
                            top: '50%',
                            x: '-50%',
                            y: '-50%'
                        }}
                        initial={false}
                        animate={{
                            x: isHovered ? (iIdx - 1) * 90 - 50 : (iIdx - 1) * 20 - 50,
                            rotate: isHovered ? (iIdx - 1) * 15 : (iIdx - 1) * 5,
                            y: '-50%',
                            zIndex: iIdx === 1 ? 10 : 5,
                            scale: isHovered ? 1.05 : 1
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    >
                        <Image src={img} alt="Preview" fill className="object-cover" />
                    </motion.div>
                ))}
            </div>

            {/* Description */}
            <div className="mt-auto">
                <p className="text-black/60 font-semibold leading-relaxed mb-8 text-lg md:text-xl line-clamp-3">
                    {item.description}
                </p>

                {/* Button */}
                <button className="bg-[#1a1c20] text-white px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10">
                    Learn now
                </button>
            </div>
        </div>
    )
}

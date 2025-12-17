'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useCursor } from './CursorContext'

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: "Lumina EdTech",
        description: "Personalized learning paths for students powered by adaptive AI models and real-time feedback systems.",
        gradient: "from-blue-200 to-indigo-100",
        link: "#"
    },
    {
        title: "Nebula Analytics",
        description: "Real-time data visualization dashboard for complex SaaS metrics and user behavior tracking.",
        gradient: "from-purple-200 to-pink-100",
        link: "#"
    },
    {
        title: "Vertex AI",
        description: "Generative design tool for architects and industrial designers seeking precision and automation.",
        gradient: "from-emerald-200 to-teal-100",
        link: "#"
    },
    {
        title: "Stratum B2B",
        description: "Enterprise workflow automation platform with seamless integrations and scalable architecture.",
        gradient: "from-orange-200 to-red-100",
        link: "#"
    }
]

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { setCursorType } = useCursor()

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.project-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative z-20 bg-white min-h-screen py-32 px-6 md:px-20 rounded-t-[4rem] shadow-[0_-30px_60px_rgba(0,0,0,0.05)]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-20 tracking-tighter text-black">Selected <span className="font-[family-name:var(--font-allura)] font-normal text-6xl md:text-[4.5rem] ml-2">Projects</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setCursorType('hover')}
                            onMouseLeave={() => setCursorType('default')}
                            className="project-card group cursor-pointer"
                        >
                            {/* Cover Image Area */}
                            <div className={`aspect-[16/10] w-full rounded-3xl bg-gradient-to-br ${project.gradient} mb-8 relative overflow-hidden transition-all duration-700 group-hover:scale-[1.03] shadow-sm group-hover:shadow-2xl`}>
                                <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity" />
                                {/* Overlay Icon */}
                                <div className="absolute top-6 right-6 bg-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <ArrowUpRight className="text-white w-6 h-6" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex items-start justify-between px-2">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-xl font-semibold text-black leading-tight max-w-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

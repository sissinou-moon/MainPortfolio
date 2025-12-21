'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Smartphone, Globe, Bot, Layers, Code2, Cpu, Sparkles, Terminal } from 'lucide-react'
import { useCursor } from './CursorContext'

const skills = {
    mobile: {
        title: "Mobile App Development",
        icon: Smartphone,
        description: "Crafting native-quality experiences with cross-platform efficiency.",
        techs: [
            { name: "Flutter", level: "Expert" },
            { name: "Dart", level: "Expert" },
            { name: "React Native", level: "6 Months Exp" },
        ]
    },
    web: {
        title: "Fullstack Web Dev",
        icon: Globe,
        description: "Building scalable, performant, and interactive web applications.",
        techs: [
            { name: "Next.js / React", level: "Advanced" },
            { name: "Node.js (TS/Express)", level: "Advanced" },
            { name: "GSAP", level: "Animations" },
            { name: "Vercel", level: "Deployment" },
            { name: "Railway + ngrok", level: "Infrastructure" },
        ]
    },
    ai: {
        title: "Artificial Intelligence",
        icon: Bot,
        description: "Integrating intelligent agents and RAG systems into products.",
        techs: [
            { name: "RAG / Pinecone", level: "Vector DB" },
            { name: "Deepseek / HF", level: "LLMs" },
            { name: "AI Agents", level: "System Design" },
            { name: "Chatbots", level: "Conversational" },
        ]
    }
}

export default function Skills() {
    const { setCursorType } = useCursor()
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section ref={containerRef} className="relative z-30 bg-[#f8f9fa] py-32 px-6 md:px-20 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-purple-50/50 to-transparent rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col mb-20 text-center items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='border border-black/10 rounded-full w-fit mb-6 py-1.5 px-4 bg-white shadow-sm flex items-center justify-center font-bold text-[10px] uppercase tracking-[0.3em]'
                    >
                        My Arsenal
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6"
                    >
                        Skills & <span className="font-[family-name:var(--font-allura)] font-normal text-6xl md:text-[5.5rem] ml-2 text-transparent bg-clip-text bg-gradient-to-br from-black to-black/60">Expertise</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-black/60 font-semibold max-w-2xl leading-relaxed"
                    >
                        A curated stack of technologies I use to bring creative visions to life.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Fullstack Card - White Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-12 lg:col-span-12 group relative bg-white text-black rounded-[2.5rem] p-10 border border-black/5 shadow-xl shadow-black/[0.02] flex flex-col md:flex-row justify-between overflow-hidden hover:shadow-2xl transition-all duration-700"
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        {/* Background Visual: Floating Glass Layers (Now in soft grey/blue) */}
                        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-40 pointer-events-none">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute right-10 top-1/2 w-64 h-80 bg-gradient-to-br from-black/[0.07] to-transparent border border-black/[0.00] rounded-3xl"
                                    style={{
                                        x: (i - 1) * 60,
                                        y: "-50%",
                                        rotateX: 45,
                                        rotateZ: -20,
                                        zIndex: 3 - i
                                    }}
                                    animate={{
                                        y: ["-52%", "-48%", "-52%"],
                                        rotateX: [40, 50, 40],
                                    }}
                                    transition={{
                                        duration: 4 + i,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative z-10 flex-1">
                            <div className="w-14 h-14 bg-black/[0.03] border border-black/10 rounded-2xl flex items-center justify-center mb-8 text-black group-hover:scale-110 transition-transform duration-500">
                                <Code2 size={28} />
                            </div>
                            <h3 className="text-4xl font-bold mb-4 tracking-tight">{skills.web.title}</h3>
                            <p className="text-black/50 text-xl font-medium mb-8 leading-relaxed max-w-xl">
                                {skills.web.description}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {skills.web.techs.map((tech, i) => (
                                    <span key={i} className="px-4 py-2 bg-black/[0.03] border border-black/5 hover:bg-black/[0.06] rounded-xl text-sm font-semibold text-black/70 transition-all cursor-default hover:text-black">
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Card - Abstract Liquid Flux */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-12 lg:col-span-6 group relative bg-white text-black rounded-[2.5rem] p-10 border border-black/5 shadow-xl shadow-black/[0.02] overflow-hidden hover:shadow-2xl transition-all duration-700"
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        {/* Abstract Background Visual: Liquid Flux & Particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15]">
                            {/* Morphing Liquid Blobs */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 0.9, 1.1, 1],
                                    rotate: [0, 90, 180, 270, 360],
                                    x: [0, 50, -30, 20, 0],
                                    y: [0, -40, 60, -20, 0]
                                }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-[20%] -right-[20%] w-[120%] h-[120%] bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent blur-[100px] rounded-[40%]"
                            />

                            {/* Floating Geometric Stream */}
                            <svg className="absolute inset-0 w-full h-full">
                                {[...Array(15)].map((_, i) => (
                                    <motion.rect
                                        key={i}
                                        width={Math.random() * 20 + 5}
                                        height={Math.random() * 20 + 5}
                                        rx="2"
                                        className="fill-blue-600/20"
                                        initial={{
                                            x: "-10%",
                                            y: `${Math.random() * 100}%`,
                                            rotate: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            x: "110%",
                                            rotate: 360,
                                            opacity: [0, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 5 + Math.random() * 10,
                                            repeat: Infinity,
                                            delay: i * 0.8,
                                            ease: "linear"
                                        }}
                                    />
                                ))}
                                {[...Array(10)].map((_, i) => (
                                    <motion.circle
                                        key={`c-${i}`}
                                        r={Math.random() * 4 + 2}
                                        className="fill-cyan-500/40"
                                        initial={{
                                            x: "110%",
                                            y: `${Math.random() * 100}%`,
                                            opacity: 0
                                        }}
                                        animate={{
                                            x: "-10%",
                                            opacity: [0, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 8 + Math.random() * 12,
                                            repeat: Infinity,
                                            delay: i * 1.2,
                                            ease: "linear"
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Dynamic Glow following mouse or pulse */}
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 transition-transform duration-500">
                                <Smartphone size={28} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 tracking-tight">{skills.mobile.title}</h3>
                            <p className="text-black/50 text-lg font-medium mb-10 leading-relaxed max-w-sm">
                                {skills.mobile.description}
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {skills.mobile.techs.map((tech, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-black/[0.02] border border-black/5 rounded-2xl group/item hover:bg-black/[0.04] transition-colors">
                                        <span className="font-bold text-black/80">{tech.name}</span>
                                        <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-600/10 px-3 py-1 rounded-full">
                                            {tech.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Card - Pulsing Neural Nexus */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-12 lg:col-span-6 group relative bg-white text-black rounded-[2.5rem] p-10 border border-black/5 shadow-xl shadow-black/[0.02] overflow-hidden hover:shadow-2xl transition-all duration-700"
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        {/* Pulsing Neural Background */}
                        <div className="absolute inset-0 opacity-[0.12] pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full"
                                />
                                <svg className="w-full h-full p-10" viewBox="0 0 200 200">
                                    {/* Data Streams */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.line
                                            key={i}
                                            x1="100" y1="100"
                                            x2={100 + Math.cos(i * (Math.PI / 6)) * 80}
                                            y2={100 + Math.sin(i * (Math.PI / 6)) * 80}
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-purple-600/40"
                                            strokeDasharray="4 4"
                                            initial={{ pathOffset: 0 }}
                                            animate={{ pathOffset: [0, 1] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                                        />
                                    ))}
                                    {/* Rotating Orbital Rings */}
                                    <motion.circle
                                        cx="100" cy="100" r="40"
                                        fill="none" stroke="currentColor" strokeWidth="0.5"
                                        className="text-purple-600/30"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        strokeDasharray="10 5"
                                    />
                                    <motion.circle
                                        cx="100" cy="100" r="60"
                                        fill="none" stroke="currentColor" strokeWidth="0.5"
                                        className="text-purple-600/20"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        strokeDasharray="5 15"
                                    />
                                    {/* Core Node */}
                                    <motion.circle
                                        cx="100" cy="100" r="12"
                                        className="fill-purple-600 shadow-xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-14 h-14 bg-purple-500/5 border border-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-600 group-hover:scale-110 transition-transform duration-500">
                                <Bot size={28} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 tracking-tight">{skills.ai.title}</h3>
                            <p className="text-black/50 text-lg font-medium mb-10 leading-relaxed">
                                {skills.ai.description}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2">
                                {skills.ai.techs.map((tech, i) => (
                                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-black/[0.02] border border-black/5 rounded-xl text-sm font-bold text-black/70 group-hover:text-black transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                                        {tech.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

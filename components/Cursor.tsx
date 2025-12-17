'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useCursor } from './CursorContext'

export default function Cursor() {
    const [points, setPoints] = useState<{ x: number, y: number }[]>([])
    const [isMoving, setIsMoving] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const { cursorType } = useCursor()

    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    const springConfig = { damping: 30, stiffness: 500 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true)

            const x = e.clientX
            const y = e.clientY

            mouseX.set(x)
            mouseY.set(y)

            setPoints(prev => {
                const newPoints = [...prev, { x, y }]
                if (newPoints.length > 12) newPoints.shift()
                return newPoints
            })

            setIsMoving(true)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setIsMoving(false)
                setPoints([])
            }, 1000)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
            setIsMoving(false)
            setPoints([])
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [mouseX, mouseY, isVisible])

    const pathData = points.length > 1
        ? `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`
        : ''

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
                <motion.path
                    d={pathData}
                    stroke="black"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isMoving ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </svg>

            <motion.div
                className="fixed top-0 left-0 flex items-center justify-center"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            >
                <motion.div
                    animate={{
                        width: cursorType === 'hover' ? 60 : cursorType === 'read-more' ? 80 : 6,
                        height: cursorType === 'hover' ? 60 : cursorType === 'read-more' ? 80 : 6,
                        backgroundColor: cursorType === 'hover' ? 'rgba(0,0,0,0.05)' : cursorType === 'read-more' ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,1)',
                        border: cursorType === 'hover' ? '1px solid rgba(0,0,0,0.1)' : 'none',
                    }}
                    className="rounded-full relative flex items-center justify-center overflow-hidden"
                >
                    <AnimatePresence>
                        {cursorType === 'read-more' && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-[10px] text-white font-bold uppercase tracking-tighter"
                            >
                                Read more
                            </motion.span>
                        )}
                        {cursorType === 'hover' && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-1 h-1 bg-black rounded-full" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    )
}

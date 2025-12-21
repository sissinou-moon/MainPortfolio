'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useCursor } from './CursorContext'

export default function Connect() {
    const { setCursorType } = useCursor()
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl");
        if (!gl) return;

        // Vertex shader
        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        // Fragment shader (Electric Noise adapted to one-pass WebGL)
        const fragmentShaderSource = `
            precision mediump float;
            uniform vec2 iResolution;
            uniform float iTime;

            #define time iTime*0.15
            #define tau 6.2831853

            mat2 makem2(in float theta){float c = cos(theta);float s = sin(theta);return mat2(c,-s,s,c);}
            float hash(vec2 p){return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453);}
            float noise(in vec2 x){
                vec2 i = floor(x);
                vec2 f = fract(x);
                float a = hash(i);
                float b = hash(i+vec2(1.,0.));
                float c = hash(i+vec2(0.,1.));
                float d = hash(i+vec2(1.,1.));
                vec2 u = f*f*(3.-2.*f);
                return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
            }

            float fbm(in vec2 p){	
                float z=2.;
                float rz = 0.;
                for (float i=1.; i<6.; i++){
                    rz += abs((noise(p)-0.5)*2.)/z;
                    z *= 2.;
                    p *= 2.;
                }
                return rz;
            }

            float dualfbm(in vec2 p){
                vec2 p2 = p*.7;
                vec2 basis = vec2(fbm(p2-time*1.6), fbm(p2+time*1.7));
                basis = (basis-.5)*.9;
                p += basis;
                return fbm(p*makem2(time*0.2));
            }

            float circ(vec2 p) {
                float r = length(p);
                r = log(sqrt(r));
                return abs(mod(r*4.,tau)-3.14)*9.+.7;
            }

            void mainImage(out vec4 fragColor, in vec2 fragCoord){
                vec2 p = fragCoord.xy / iResolution.xy - 0.;
                p.x *= iResolution.x / iResolution.y;
                p *= 8.;
                
                float rz = dualfbm(p);

                p /= exp(mod(time*3.,3.14159));
                rz *= pow(abs((0.1-circ(p))),.9);

                vec3 col = vec3(.2,0.1,0.4)/rz;
                col = pow(abs(col),vec3(.99));
                fragColor = vec4(col,1.);
            }

            void main(){
                vec4 color;
                mainImage(color, gl_FragCoord.xy);
                gl_FragColor = color;
            }
        `;

        function compileShader(src: string, type: number) {
            const shader = gl!.createShader(type)!;
            gl!.shaderSource(shader, src);
            gl!.compileShader(shader);
            if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
                console.error(gl!.getShaderInfoLog(shader));
            }
            return shader;
        }

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionLocation = gl.getAttribLocation(program, "position");
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1,
                1, -1,
                -1, 1,
                -1, 1,
                1, -1,
                1, 1,
            ]),
            gl.STATIC_DRAW
        );
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const iResolution = gl.getUniformLocation(program, "iResolution");
        const iTime = gl.getUniformLocation(program, "iTime");

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            const glInstance = gl;
            if (!glInstance) return;

            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                glInstance.viewport(0, 0, glInstance.drawingBufferWidth, glInstance.drawingBufferHeight);
            }

            const currentTime = (Date.now() - startTime) / 1000.0;
            glInstance.useProgram(program);
            glInstance.uniform2f(iResolution, canvas.width, canvas.height);
            glInstance.uniform1f(iTime, currentTime);

            glInstance.drawArrays(glInstance.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        }

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative w-full h-[410px] overflow-hidden flex items-center justify-center bg-black">
            {/* Electric Noise Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
            />

            {/* Subtle Overlay to make text more readable */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Let&apos;s build something</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Hiring? Let&apos;s <span className="font-[family-name:var(--font-allura)] font-normal text-6xl md:text-[6.5rem] ml-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Connect</span>
                    </h2>
                    <p className="text-white/40 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
                        I&apos;m currently looking for new opportunities to build amazing things.
                    </p>

                    <button
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                        className="group relative bg-white text-black px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                    >
                        <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        Start a conversation
                    </button>
                </motion.div>
            </div>
            <div className="h-[100px]"></div>
        </section>
    )
}

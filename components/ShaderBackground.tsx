'use client'
import { useEffect, useRef } from 'react'

export default function ShaderBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl = canvas.getContext('webgl2')
        if (!gl) return

        // Vertex Shader
        const vsSource = `#version 300 es
      in vec4 position;
      void main() {
        gl_Position = position;
      }
    `

        // Fragment Shader
        const fsSource = `#version 300 es
      precision highp float;
      uniform vec3 iResolution;
      uniform float iTime;
      out vec4 fragColor;

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        
        vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

        // ---- ZOOM
        float zoom = 1.5;
        uv *= zoom;

        // ---- SHOW ONLY BOTTOM PART
        uv.y -= 1.2;

        // ---- DEPTH / PERSPECTIVE
        float d = 1.0 / max(abs(uv.y), 0.001);
        vec2 pv = vec2(uv.x * d, d);

        // ---- SLOW ANIMATION
        float speed = 0.5;        // lower = slower
        pv.y += iTime * speed;

        pv *= 3.5;

        // ---- IQ FILTERED GRID
        pv += 0.1;
        const float N = 64.0;
        vec2 w = fwidth(pv) + 0.001;
        vec2 a = pv + 0.5 * w;
        vec2 b = pv - 0.5 * w;
        vec2 i = (floor(a) + min(fract(a) * N, 1.0)
                - floor(b) - min(fract(b) * N, 1.0)) / (N * w);

        float g = i.x + i.y - i.x * i.y;

        // ---- COLORS
        vec3 background = vec3(1.0);  // white
        vec3 gridColor  = vec3(0.82); // light grey
        vec3 col = mix(background, gridColor, g);

        fragColor = vec4(col, 1.0);
      }
    `

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)
            if (!shader) return null
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }
            return shader
        }

        const vertexShader = createShader(gl.VERTEX_SHADER, vsSource)
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource)
        if (!vertexShader || !fragmentShader) return

        const program = gl.createProgram()
        if (!program) return
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
            return
        }

        const positionAttributeLocation = gl.getAttribLocation(program, 'position')
        const resolutionUniformLocation = gl.getUniformLocation(program, 'iResolution')
        const timeUniformLocation = gl.getUniformLocation(program, 'iTime')

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        const positions = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

        const vao = gl.createVertexArray()
        gl.bindVertexArray(vao)
        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

        const startTime = performance.now()

        let animationFrameId: number;

        const render = () => {
            // Resize
            const displayWidth = canvas.clientWidth
            const displayHeight = canvas.clientHeight
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth
                canvas.height = displayHeight
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
            }

            gl.useProgram(program)
            gl.bindVertexArray(vao)

            gl.uniform3f(resolutionUniformLocation, canvas.width, canvas.height, 1.0)
            gl.uniform1f(timeUniformLocation, (performance.now() - startTime) / 1000)

            gl.drawArrays(gl.TRIANGLES, 0, 6)
            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 bg-white"
        />
    )
}

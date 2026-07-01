import { useEffect, useRef, useCallback } from 'react'

const CELL_SIZE = 52
const DECAY = 0.025

export const InteractiveGrid = ({
    sectionRef,
    color = '24, 144, 255',
    radius = 220,
    maxIntensity = 0.72,
}) => {
    const canvasRef = useRef(null)
    const mouse = useRef({ x: -999, y: -999, inside: false })
    const cells = useRef([])
    const rafRef = useRef(null)

    const initCells = useCallback((w, h) => {
        const grid = []
        const cols = Math.ceil(w / CELL_SIZE) + 1
        const rows = Math.ceil(h / CELL_SIZE) + 1
        for (let r = 0; r < rows; r++)
            for (let c = 0; c < cols; c++)
                grid.push({ x: c * CELL_SIZE, y: r * CELL_SIZE, intensity: 0 })
        cells.current = grid
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const section = sectionRef.current
        if (!canvas || !section) return

        const ctx = canvas.getContext('2d')
        let w, h

        const resize = () => {
            w = section.offsetWidth
            h = section.offsetHeight
            canvas.width = w
            canvas.height = h
            initCells(w, h)
        }

        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(section)

        const onMove = (e) => {
            const rect = section.getBoundingClientRect()
            mouse.current.x = e.clientX - rect.left
            mouse.current.y = e.clientY - rect.top
            mouse.current.inside = true
        }
        const onLeave = () => { mouse.current.inside = false }

        section.addEventListener('mousemove', onMove, { passive: true })
        section.addEventListener('mouseleave', onLeave)

        const draw = () => {
            ctx.clearRect(0, 0, w, h)
            const { x: mx, y: my, inside } = mouse.current

            cells.current.forEach(cell => {
                if (inside) {
                    const dx = cell.x + CELL_SIZE / 2 - mx
                    const dy = cell.y + CELL_SIZE / 2 - my
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < radius) {
                        const target = maxIntensity * Math.pow(1 - dist / radius, 2)
                        if (target > cell.intensity) cell.intensity = target
                    }
                }
                cell.intensity = Math.max(0, cell.intensity - DECAY * 0.016 * 60)

                if (cell.intensity > 0.004) {
                    ctx.strokeStyle = `rgba(${color}, ${cell.intensity})`
                    ctx.lineWidth = 1.2
                    ctx.beginPath()
                    ctx.moveTo(cell.x + CELL_SIZE, cell.y)
                    ctx.lineTo(cell.x + CELL_SIZE, cell.y + CELL_SIZE)
                    ctx.moveTo(cell.x, cell.y + CELL_SIZE)
                    ctx.lineTo(cell.x + CELL_SIZE, cell.y + CELL_SIZE)
                    ctx.stroke()
                }
            })

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(rafRef.current)
            ro.disconnect()
            section.removeEventListener('mousemove', onMove)
            section.removeEventListener('mouseleave', onLeave)
        }
    }, [initCells, sectionRef, color, radius, maxIntensity])

    return (
        <canvas
            ref={canvasRef}
            className="interactive-grid-canvas"
            aria-hidden="true"
        />
    )
}
// GuatemalaMap.jsx — v2 (mapa con vida: pulsos, conexiones, glow, mouse tracking)

import { useEffect, useRef, useState, useMemo } from 'react'

const GT_PATH = `
  M 195 18 L 248 18 L 248 55 L 280 55 L 280 95
  C 295 100, 305 112, 308 128
  C 310 142, 304 155, 292 162
  C 298 172, 298 185, 290 195
  C 282 205, 268 208, 256 204
  C 250 218, 238 228, 224 230
  C 230 245, 226 262, 214 272
  C 222 282, 224 296, 216 308
  C 224 318, 224 332, 214 342
  C 206 352, 194 355, 184 350
  C 178 362, 168 370, 156 370
  C 148 380, 136 384, 126 378
  C 130 392, 124 405, 112 410
  C 102 414, 92 408, 88 398
  C 78 400, 68 394, 65 384 
  C 56 386, 48 378, 48 368
  C 40 366, 35 358, 36 350
  C 28 345, 25 335, 28 326
  C 20 318, 19 306, 25 297
  C 18 288, 19 276, 27 268
  C 22 258, 24 246, 33 238
  C 28 226, 32 213, 43 206
  C 38 192, 44 177, 57 170
  C 53 155, 60 139, 74 132
  C 70 116, 78 100, 93 92
  C 90 75, 100 60, 116 53
  C 113 36, 124 22, 140 18
  C 150 14, 162 14, 170 18 C 175 16, 180 16, 185 17 Z
`

const ACCENT_ZONES = {
    dev: [[210, 50], [230, 55], [200, 70], [245, 75], [215, 90], [260, 90], [225, 40], [195, 55], [240, 100], [218, 65]],
    automation: [[150, 170], [170, 190], [130, 200], [160, 220], [180, 160], [110, 210], [145, 230], [95, 195], [165, 140], [125, 180]],
    ai: [[100, 300], [80, 330], [120, 310], [90, 360], [60, 340], [105, 280], [70, 370], [115, 340], [55, 310], [95, 395]],
}

// Puntos clave desde donde emiten pulsos
const PULSE_ORIGINS = {
    dev: [[220, 60], [240, 85]],
    automation: [[155, 185], [135, 215]],
    ai: [[90, 320], [105, 355]],
}

// Conexiones entre puntos de cada zona
const CONNECTIONS = {
    dev: [[210, 50, 240, 100], [230, 55, 215, 90], [245, 75, 260, 90]],
    automation: [[150, 170, 160, 220], [170, 190, 145, 230], [130, 200, 95, 195]],
    ai: [[100, 300, 90, 360], [80, 330, 115, 340], [60, 340, 55, 310]],
}

const SERVICE_COLORS = {
    dev: '#1890FF',
    automation: '#10B981',
    ai: '#A78BFA',
}

const VIEWBOX_W = 320
const VIEWBOX_H = 440
const GRID_SPACING = 8

export const GuatemalaMap = ({ activeService }) => {
    const svgRef = useRef(null)
    const clipId = useRef(`gt-${Math.random().toString(36).slice(2, 7)}`).current
    const [mousePos, setMousePos] = useState(null)
    const [tick, setTick] = useState(0)

    // Tick para animar pulsos
    useEffect(() => {
        const id = setInterval(() => setTick(t => (t + 1) % 100), 50)
        return () => clearInterval(id)
    }, [])

    const points = useMemo(() => {
        const pts = []
        for (let x = 0; x <= VIEWBOX_W; x += GRID_SPACING) {
            for (let y = 0; y <= VIEWBOX_H; y += GRID_SPACING) {
                const jx = x + Math.sin(x * y * 0.01) * 1.8
                const jy = y + Math.cos((x + y) * 0.01) * 1.8
                pts.push({
                    x: jx, y: jy,
                    delay: ((x * 7 + y * 13) % 30) / 10,
                    baseR: 2.2 + ((x + y) % 3) * 0.4,
                })
            }
        }
        return pts
    }, [])

    const getZone = (px, py) => {
        for (const [service, coords] of Object.entries(ACCENT_ZONES)) {
            for (const [zx, zy] of coords) {
                if (Math.hypot(px - zx, py - zy) < 11) return service
            }
        }
        return null
    }

    const handleMouseMove = (e) => {
        const svg = svgRef.current
        if (!svg) return
        const rect = svg.getBoundingClientRect()
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * VIEWBOX_W,
            y: ((e.clientY - rect.top) / rect.height) * VIEWBOX_H,
        })
    }

    const activeColor = SERVICE_COLORS[activeService]

    // Pulsos animados: 2 ondas por origen, desfasadas
    const pulseRings = PULSE_ORIGINS[activeService]?.flatMap(([px, py], pi) =>
        [0, 0.5].map((offset, oi) => {
            const progress = ((tick / 100) + offset) % 1
            const r = 4 + progress * 28
            const opacity = (1 - progress) * 0.6
            return { px, py, r, opacity, key: `pulse-${pi}-${oi}` }
        })
    ) ?? []

    return (
        <div className="gt-map">
            {/* Glow ambiental detrás del SVG */}
            <div
                className="gt-map__glow"
                style={{ background: `radial-gradient(ellipse 60% 50% at 50% 45%, ${activeColor}22 0%, transparent 70%)` }}
            />

            <svg
                ref={svgRef}
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                className="gt-map__svg"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos(null)}
            >
                <defs>
                    <clipPath id={clipId}>
                        <path d={GT_PATH} />
                    </clipPath>
                </defs>

                {/* Puntos del grid dentro del clip */}
                <g clipPath={`url(#${clipId})`}>
                    {points.map((p, i) => {
                        const zone = getZone(p.x, p.y)
                        const isActive = zone === activeService
                        let r = p.baseR
                        let fill = 'rgba(161,165,179,0.5)'

                        if (isActive) fill = activeColor
                        if (mousePos) {
                            const dist = Math.hypot(p.x - mousePos.x, p.y - mousePos.y)
                            if (dist < 36) {
                                r = p.baseR + (1 - dist / 36) * 3.5
                                if (!isActive) fill = `${activeColor}88`
                            }
                        }

                        return (
                            <circle
                                key={i}
                                cx={p.x} cy={p.y} r={r}
                                style={{ fill, transition: 'fill 0.5s ease' }}
                                className="gt-map__dot"
                            />
                        )
                    })}
                </g>

                {/* Conexiones entre puntos de la zona activa */}
                {CONNECTIONS[activeService]?.map(([x1, y1, x2, y2], i) => (
                    <line
                        key={`conn-${i}`}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={activeColor}
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                        strokeDasharray="3 4"
                        className="gt-map__connection"
                    />
                ))}

                {/* Pulsos de actividad */}
                {pulseRings.map(({ px, py, r, opacity, key }) => (
                    <circle
                        key={key}
                        cx={px} cy={py} r={r}
                        fill="none"
                        stroke={activeColor}
                        strokeWidth="1.2"
                        strokeOpacity={opacity}
                    />
                ))}

                {/* Contorno sutil */}
                <path d={GT_PATH} fill="none" stroke="rgba(161,165,179,0.15)" strokeWidth="1" />
            </svg>
        </div>
    )
}
import { useState, useRef } from 'react'
import { GuatemalaMap } from './GuatemalaMap.jsx'
import { InteractiveGrid } from '../../../shared/components/layout/InteractiveGrid.jsx'

const SERVICES = [
    {
        key: 'dev',
        color: '#1890FF',
        rgbColor: '24, 144, 255',
        number: '01',
        title: 'Desarrollo a la Medida',
        text: 'Construimos sistemas web y aplicaciones móviles diseñados exactamente para las reglas y procesos de tu negocio. Sin plantillas ni soluciones genéricas — cada línea de código responde a un objetivo real de tu operación. El resultado: software que tu equipo adopta rápido y que crece contigo.',
        cta: 'Saber más',
    },
    {
        key: 'automation',
        color: '#10B981',
        rgbColor: '16, 185, 129',
        number: '02',
        title: 'Automatización de Procesos',
        text: 'Identificamos los cuellos de botella de tu operación y los convertimos en flujos automáticos. Conectamos tus herramientas, eliminamos tareas repetitivas y liberamos a tu equipo para enfocarse en decisiones que realmente importan. Desde reportes hasta pipelines completos de datos.',
        cta: 'Saber más',
    },
    {
        key: 'ai',
        color: '#A78BFA',
        rgbColor: '167, 139, 250',
        number: '03',
        title: 'Implementación de IA',
        text: 'Integramos modelos de lenguaje y agentes de inteligencia artificial directamente en tus procesos existentes. No vendemos IA genérica — configuramos soluciones entrenadas para los problemas específicos de tu negocio, desde atención al cliente hasta análisis avanzado de datos.',
        cta: 'Saber más',
    },
]

export const ServicesSection = () => {
    const [current, setCurrent] = useState(0)
    const panelRef = useRef(null)
    const active = SERVICES[current]

    const next = () => setCurrent(i => (i + 1) % SERVICES.length)
    const prev = () => setCurrent(i => (i - 1 + SERVICES.length) % SERVICES.length)

    return (
        <section className="services">

            {/* ---- Izquierda — encabezado + mapa ---- */}
            <div className="services__left">

                {/* Encabezado mejorado */}
                <div className="services__header">
                    <div className="services__eyebrow-row">
                        <div className="services__eyebrow-line" />
                        <span className="services__eyebrow">Nuestros pilares</span>
                    </div>
                    <h2 className="services__heading">
                        Tres formas de{' '}
                        <span className="services__heading--accent">transformar</span>
                        <br />tu operación
                    </h2>
                    <p className="services__heading-sub">
                        Soluciones diseñadas para empresas que quieren crecer
                        sin que la tecnología sea un obstáculo.
                    </p>
                </div>

                {/* Mapa centrado */}
                <div className="services__map-wrapper">
                    <GuatemalaMap activeService={active.key} />
                </div>

            </div>

            {/* ---- Derecha — panel oscuro con grilla interactiva ---- */}
            <div className="services__right" ref={panelRef}>

                <InteractiveGrid
                    sectionRef={panelRef}
                    color={active.rgbColor}
                    radius={200}
                    maxIntensity={0.65}
                />

                <div
                    className="services__panel-glow"
                    style={{ background: `radial-gradient(circle, ${active.color}22 0%, transparent 65%)` }}
                    aria-hidden="true"
                />

                {/* Card premium */}
                <div
                    className="services__card"
                    style={{ '--accent': active.color, '--accent-rgb': active.rgbColor }}
                >
                    {/* Línea lateral de color */}
                    <div className="services__card-bar" style={{ background: active.color }} />

                    {/* Número decorativo de fondo */}
                    <span className="services__card-watermark">{active.number}</span>

                    {/* Contenido */}
                    <div className="services__card-body">
                        <h3 className="services__card-title">{active.title}</h3>
                        <p className="services__card-text">{active.text}</p>
                        <button className="services__card-cta" style={{ color: active.color }}>
                            {active.cta} →
                        </button>
                    </div>
                </div>

                {/* Navegación */}
                <div className="services__nav">
                    <button
                        className="services__arrow"
                        style={{ '--accent': active.color }}
                        onClick={prev}
                    >‹</button>

                    <div className="services__dots">
                        {SERVICES.map((s, i) => (
                            <button
                                key={s.key}
                                className={`services__dot ${i === current ? 'services__dot--active' : ''}`}
                                style={i === current ? { background: s.color, width: '20px' } : {}}
                                onClick={() => setCurrent(i)}
                            />
                        ))}
                    </div>

                    <button
                        className="services__arrow"
                        style={{ '--accent': active.color }}
                        onClick={next}
                    >›</button>
                </div>

            </div>

        </section>
    )
}
// AboutSection.jsx — TKT-003 (v3)
// Scroll-snap interno | Crossfade slideshow | Floating glow title

import { useState, useEffect, useRef } from 'react'

const ROTATING_WORDS = [
    'solución',
    'automatización',
    'innovación',
    'proceso',
    'implementación',
]

const BLOCKS = [
    {
        id: '01',
        title: '¿Qué es Environment?',
        text: 'Environment IA es una startup tecnológica guatemalteca dedicada al desarrollo de software e innovación digital. Creamos soluciones a la medida que conectan tecnología con los objetivos reales de cada negocio.',
        cta: 'Conoce nuestra historia',
    },
    {
        id: '02',
        title: 'Nuestra misión',
        text: 'Transformar la complejidad operativa de las empresas en procesos automáticos, ágiles e inteligentes. Creemos que la tecnología debe ser un aliado accesible, no un privilegio exclusivo de las grandes corporaciones.',
        cta: 'Ver nuestros valores',
    },
    {
        id: '03',
        title: 'El problema que resolvemos',
        text: 'Las empresas pierden horas valiosas en tareas manuales, sistemas desconectados y procesos que no escalan. Nosotros eliminamos esos cuellos de botella con automatización real e inteligencia artificial aplicada.',
        cta: 'Ver soluciones',
    },
    {
        id: '04',
        title: 'Por qué existimos',
        text: 'Existimos porque vimos de cerca cómo negocios con enorme potencial perdían competitividad por no tener acceso a tecnología de calidad. Environment nació para cambiar eso; desde Guatemala, para el mundo.',
        cta: 'Cotizar mi proyecto',
    },
]

const FOUNDERS = [
    {
        src: '/images/team/founder-1.jpg',
        alt: 'Emilio Barrera',
        name: 'Emilio Barrera',
    },
    {
        src: '/images/team/founder-2.jpg',
        alt: 'Edgar Catalán',
        name: 'Edgar Catalán',
    },
    {
        src: '/images/team/founders-together.jpg',
        alt: 'Emilio Barrera y Edgar Catalán',
        name: 'El equipo',
    },
]

export const AboutSection = () => {
    // Efecto de palabras rotativas en el título
    const [wordIndex, setWordIndex] = useState(0)
    const [wordVisible, setWordVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setWordVisible(false)
            setTimeout(() => {
                setWordIndex(i => (i + 1) % ROTATING_WORDS.length)
                setWordVisible(true)
            }, 350)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    // Segmento scroll-snap interno
    const [activeBlock, setActiveBlock] = useState(0)
    const scrollRef = useRef(null)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const handleScroll = () => {
            const itemHeight = el.scrollHeight / BLOCKS.length
            const index = Math.round(el.scrollTop / itemHeight)
            setActiveBlock(Math.min(index, BLOCKS.length - 1))
        }
        el.addEventListener('scroll', handleScroll, { passive: true })
        return () => el.removeEventListener('scroll', handleScroll)
    }, [])

    // Presentacion de founder
    const [founderIndex, setFounderIndex] = useState(0)
    const [founderVisible, setFounderVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setFounderVisible(false)
            setTimeout(() => {
                setFounderIndex(i => (i + 1) % FOUNDERS.length)
                setFounderVisible(true)
            }, 500)
        }, 3500)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="about">

            {/* Columna izquierda */}
            <div className="about__left">

                {/* Título flotante con halo */}
                <div className="about__title-block">
                    <div className="about__halo" aria-hidden="true" />
                    <span className="about__eyebrow">environment</span>
                    <h2 className="about__heading">
                        Detrás de cada{' '}
                        <span className={`about__word-pill ${wordVisible ? 'about__word-pill--visible' : 'about__word-pill--hidden'}`}>
                            {ROTATING_WORDS[wordIndex]}
                        </span>
                        <br />hay un propósito real
                    </h2>
                </div>

                {/* Carrusel scroll-snap interno */}
                <div className="about__scroll-track" ref={scrollRef}>
                    {BLOCKS.map((block, i) => (
                        <div
                            key={block.id}
                            className={`about__block ${activeBlock === i ? 'about__block--active' : ''}`}
                        >
                            <div className="about__block-line" />
                            <div className="about__block-content">
                                <span className="about__block-num">{block.id}</span>
                                <h3 className="about__block-title">{block.title}</h3>
                                <p className="about__block-text">{block.text}</p>
                                <button className="about__block-cta">{block.cta} ↗</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots indicadores */}
                <div className="about__dots" aria-hidden="true">
                    {BLOCKS.map((_, i) => (
                        <span
                            key={i}
                            className={`about__dot ${activeBlock === i ? 'about__dot--active' : ''}`}
                        />
                    ))}
                </div>

            </div>

            {/* Columna derecha — slideshow founders */}
            <div className="about__right">
                <div className="about__slideshow">

                    {/* Frame único con crossfade */}
                    <div className="about__slide-frame">
                        {FOUNDERS.map((f, i) => (
                            <img
                                key={f.src}
                                src={f.src}
                                alt={f.alt}
                                className={`about__slide-img ${i === founderIndex
                                        ? founderVisible
                                            ? 'about__slide-img--visible'
                                            : 'about__slide-img--fading'
                                        : 'about__slide-img--hidden'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Nombre del founder activo */}
                    <div className={`about__slide-caption ${founderVisible ? 'about__slide-caption--visible' : 'about__slide-caption--hidden'}`}>
                        <span className="about__founder-name">
                            {FOUNDERS[founderIndex].name}
                        </span>
                    </div>

                    {/* Dots del slideshow */}
                    <div className="about__slide-dots">
                        {FOUNDERS.map((_, i) => (
                            <button
                                key={i}
                                className={`about__slide-dot ${i === founderIndex ? 'about__slide-dot--active' : ''}`}
                                onClick={() => {
                                    setFounderVisible(false)
                                    setTimeout(() => {
                                        setFounderIndex(i)
                                        setFounderVisible(true)
                                    }, 300)
                                }}
                                aria-label={`Ver ${FOUNDERS[i].name}`}
                            />
                        ))}
                    </div>

                </div>
            </div>

        </section>
    )
}
export const HeroSection = () => {
    return (
        <section className="hero">

            <div className="hero__grid" aria-hidden="true" />
            <div className="hero__glow" aria-hidden="true" />

            {/* Columna izquierda */}
            <div className="hero__left">
                <h1 className="hero__title">
                    Automatizamos tus procesos y escalamos tu negocio con{' '}
                    <span className="hero__title--accent">
                        Inteligencia Artificial
                    </span>{' '}
                    y Software a la medida
                </h1>

                <p className="hero__description">
                    Transformamos la complejidad operativa de tu empresa en procesos
                    automáticos, ágiles e inteligentes eliminando el trabajo manual
                    que hace perder tiempo y dinero.
                </p>

                <div className="hero__actions">
                    <button className="btn btn--primary">Cotiza gratis</button>
                    <button className="btn btn--ghost">Ver soluciones</button>
                </div>

            </div>

            {/* Columna derecha — imagen del equipo */}
            <div className="hero__right">
                <div className="hero__image-wrapper">
                    <img
                        src="/images/team/founders.jpg"
                        alt="Equipo Environment IA"
                        className="hero__image"
                    />
                </div>
            </div>

        </section>
    )
}

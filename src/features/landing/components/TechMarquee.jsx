// TechMarquee.jsx — v3 (logos corregidos, Java inline SVG)

// Java SVG inline — logo oficial (taza de café), dominio público
const JavaIcon = () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="#ED8B00">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
    </svg>
)

const TECHS = [
    { name: 'Git', slug: 'git', color: 'F05032', icon: null },
    { name: 'Docker', slug: 'docker', color: '2496ED', icon: null },
    { name: 'Java', slug: null, color: null, icon: 'java' },
    { name: 'Spring Boot', slug: 'springboot', color: '6DB33F', icon: null },
    { name: 'React', slug: 'react', color: '61DAFB', icon: null },
    { name: 'Node.js', slug: 'nodedotjs', color: '339933', icon: null },
    { name: 'Python', slug: 'python', color: '3776AB', icon: null },
    { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1', icon: null },
    { name: 'MySQL', slug: 'mysql', color: '4479A1', icon: null },
    { name: 'MongoDB', slug: 'mongodb', color: '47A248', icon: null },
    { name: 'React Native', slug: 'react', color: '61DAFB', icon: null },
    { name: 'OpenAI', slug: 'openai', color: 'ffffff', icon: null },
    { name: 'Gemini', slug: 'googlegemini', color: '8E75B2', icon: null },
]

const SERVICE_COLORS = ['#1890FF', '#10B981', '#A78BFA']
const LOOP_TECHS = [...TECHS, ...TECHS]

export const TechMarquee = () => {
    return (
        <section className="tech-marquee">
            <div className="tech-marquee__fade tech-marquee__fade--left" />
            <div className="tech-marquee__fade tech-marquee__fade--right" />

            <div className="tech-marquee__track">
                {LOOP_TECHS.map((tech, i) => (
                    <div className="tech-marquee__item" key={`${tech.slug ?? tech.name}-${i}`}>
                        {tech.icon === 'java'
                            ? <JavaIcon />
                            : (
                                <img
                                    src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                                    alt={tech.name}
                                    className="tech-marquee__icon"
                                    loading="lazy"
                                />
                            )
                        }
                        <span className="tech-marquee__label">{tech.name}</span>
                        <div
                            className="tech-marquee__divider"
                            style={{ background: SERVICE_COLORS[i % SERVICE_COLORS.length] }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
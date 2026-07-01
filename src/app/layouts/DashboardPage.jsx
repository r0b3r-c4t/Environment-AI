import { DashboardContainer } from '../../shared/components/layout/DashboardContainer.jsx'
import { Navbar } from '../../shared/components/layout/Navbar.jsx'
import { HeroSection } from '../../features/landing/components/HeroSection.jsx'
import { AboutSection } from '../../features/landing/components/AboutSection.jsx'
import { TechMarquee } from '../../features/landing/components/TechMarquee.jsx'
import { ServicesSection } from '../../features/landing/components/ServicesSection.jsx'

export default function DashboardPage() {
    return (
        <DashboardContainer>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <TechMarquee />
            <ServicesSection />
        </DashboardContainer>
    )
}
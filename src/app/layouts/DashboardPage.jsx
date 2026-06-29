import { DashboardContainer } from '../../shared/components/layout/DashboardContainer.jsx'
import { Navbar } from '../../shared/components/layout/Navbar.jsx'
import { HeroSection } from '../../features/landing/components/HeroSection.jsx'

export default function DashboardPage() {
    return (
        <DashboardContainer>
            <Navbar />
            <HeroSection />
        </DashboardContainer>
    )
}
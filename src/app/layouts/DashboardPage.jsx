import { DashboardContainer } from '../../shared/components/layout/DashboardContainer.jsx';
import { Navbar } from '../../shared/components/layout/Navbar.jsx';
import { Outlet } from 'react-router-dom';

export default function DashboardPage(){
    return (
        <DashboardContainer>
            <Navbar />
            main content
            <Outlet />
        </DashboardContainer>
    )
}
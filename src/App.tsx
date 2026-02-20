import { useStore } from './store/store';
import { DashboardLayout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { Segments } from './pages/Segments';
import { Campaigns } from './pages/Campaigns';
import { CampaignCreate } from './pages/CampaignCreate';
import { Templates } from './pages/Templates';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

function DashboardPage() {
  const currentPage = useStore(s => s.currentPage);

  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'customers':
    case 'customers-import':
      return <Customers />;
    case 'segments':
    case 'segments-create':
      return <Segments />;
    case 'campaigns':
      return <Campaigns />;
    case 'campaigns-create':
      return <CampaignCreate />;
    case 'templates':
      return <Templates />;
    case 'analytics':
      return <Analytics />;
    case 'integrations':
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

export function App() {
  const currentPage = useStore(s => s.currentPage);

  if (currentPage === 'landing') {
    return <Landing />;
  }

  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}

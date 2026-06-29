import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatusBar } from '@/components/layout/StatusBar';
import { OfficeSidebar } from '@/components/layout/OfficeSidebar';
import { OfficePage } from '@/pages/OfficePage';
import { EmployeePage } from '@/pages/EmployeePage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen" style={{ backgroundColor: '#111B26' }}>
        <StatusBar />
        <div className="flex flex-1 overflow-hidden">
          <OfficeSidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<OfficePage />} />
              <Route path="/employee/:id" element={<EmployeePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

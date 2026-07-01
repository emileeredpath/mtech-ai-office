import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SandyInterface } from '@/components/SandyInterface';
import { OfficePage } from '@/pages/OfficePage';
import { EmployeePage } from '@/pages/EmployeePage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SandyInterface />} />
        <Route path="/office" element={<OfficePage />} />
        <Route path="/employee/:id" element={<EmployeePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

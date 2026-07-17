import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function App() {
  return (
    <BrowserRouter basename="/ai-office">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

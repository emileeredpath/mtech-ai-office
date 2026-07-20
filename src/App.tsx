import { useTheme } from '@/contexts/ThemeContext';
import { SandyInterface } from '@/components/SandyInterface';

export default function App() {
  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <SandyInterface />
    </div>
  );
}

interface WallProps {
  position: 'back' | 'left' | 'right';
  width?: number;
  height?: number;
}

export function Wall({ position, width = 100, height = 100 }: WallProps) {
  const getWallStyle = () => {
    switch (position) {
      case 'back':
        return {
          position: 'absolute' as const,
          top: 0,
          left: 0,
          width: '100%',
          height: '45%',
          background: 'linear-gradient(180deg, #e8dcc8 0%, #dcc8b8 50%, #d0bca8 100%)',
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.1), inset -2px 0 10px rgba(0,0,0,0.05)',
          zIndex: 0,
        };
      case 'left':
        return {
          position: 'absolute' as const,
          top: 0,
          left: 0,
          width: '3%',
          height: '100%',
          background: 'linear-gradient(90deg, #c9baa8 0%, #d4c5b9 100%)',
          boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.15)',
          zIndex: 1,
        };
      case 'right':
        return {
          position: 'absolute' as const,
          top: 0,
          right: 0,
          width: '3%',
          height: '100%',
          background: 'linear-gradient(90deg, #d4c5b9 0%, #c9baa8 100%)',
          boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.15)',
          zIndex: 1,
        };
    }
  };

  return <div style={getWallStyle()} />;
}

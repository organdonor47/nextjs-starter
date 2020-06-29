import { useEffect, useState } from 'react';

export const useKeyDown = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (keys.includes(key)) {
      return;
    }

    setKeys([...keys, key]);
  };

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    const d = keys.indexOf(key, 0);

    setKeys([...keys.slice(0, d), ...keys.slice(d + 1)]);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('keyup', handleKeyUp, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
      document.removeEventListener('keyup', handleKeyUp, false);
    };
  }, [keys]);

  return keys;
};

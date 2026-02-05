import { useLayoutEffect, useState } from 'react';
import bouquet from './bouquet.png';
import roses from './roses.png';

export default function Flowers() {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    const updateCount = () => {
      const imgWidth = 200;
      const columns = Math.ceil(window.innerWidth / imgWidth);
      setCount(columns);
    };

    updateCount();
  }, []);

  const flowerList = Array.from({ length: count }, (_, i) =>
    i % 2 === 0 ? bouquet : roses
  );

  return (
    <div className='images'>
      {flowerList.map((src, index) => (
        <img key={index} src={src} alt="Flower" />
      ))}
    </div>
  );
}

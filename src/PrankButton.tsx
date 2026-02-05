import { useState } from "react";

interface ButtonPosition {
  top: string;
  left: string;
}

interface Props {
  noCount: number,
  setNoCount: React.Dispatch<React.SetStateAction<number>>
}

export default function PrankButton({ noCount, setNoCount }: Props) {
  const [position, setPosition] = useState<ButtonPosition | null>(null);

  const moveButton = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;

    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setNoCount(noCount + 1);
  };

  return (
    <button className="button"
      onMouseEnter={() => {
        if (!position) {
          return;
        }
        moveButton()
      }}
      onClick={moveButton}
      style={
        position ?
          {
            position: 'absolute',
            top: position.top,
            left: position.left,
            transition: 'all 0.1s ease',
            padding: '10px 20px',
            cursor: 'pointer'
          }
          : { position: 'relative' }
      }
    >
      no &#128148;
    </button>
  );
}

import { useState } from 'react';
import './App.css'
import PrankButton from './PrankButton';
import Flowers from './Flowers';
import { Step } from './constants';
import CatNod from './catnod.gif'

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
}

function App() {
  const [step, setStep] = useState<Step>(Step.pageLoad);
  const [noCount, setNoCount] = useState(0);
  const days = Math.floor((new Date().getTime() - new Date("2024-6-9").getTime()) / 86400000);

  const [hearts, setHearts] = useState<Heart[]>([]);

  const explode = () => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      size: Math.random() * 20 + 10,
    }));

    setHearts(newHearts);

    setTimeout(() => setHearts([]), 1000);
  };

  return (
    <>
      <Flowers />

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle"
          style={{
            '--x': `${heart.x}px`,
            '--y': `${heart.y}px`,
            fontSize: `${heart.size}px`,
          } as React.CSSProperties}
        >
          &#128151;
        </span>
      ))}

      <div className='container'> {
        step == Step.pageLoad ?
          <button className='button' onClick={() => {
            setStep(Step.buttonClick)
          }}>
            will you be my valentine?
          </button>
          : step == Step.buttonClick ?
            <>
              <button className='button'
                style={{ scale: String(1 + noCount * 0.1) }}
                onClick={() => {
                  explode();
                  setStep(Step.yesClick);
                }}>
                yes
              </button>
              <PrankButton noCount={noCount} setNoCount={setNoCount} />
            </>
            : step == Step.yesClick ?
              <div className='gifContainer'>
                <div className='gifs'>
                  <img src={CatNod} />
                  <img src={CatNod} />
                  <img src={CatNod} />
                </div>
                <button className='button' onClick={() => {
                  setStep(Step.stats);
                }}>
                  stats
                </button>
              </div>
              :
              <div className='stats'>
                <p>
                  we've been together for: <b>{Math.floor((new Date().getTime() - new Date("2024-6-9").getTime()) / 86400000)} days! </b>

                </p>
                <p>
                  my heart has beaten for you <b>{(days * 100000).toLocaleString()}</b> times since we've been together
                </p>
                <p>
                  we've gone on <b>2</b> big girl trips together! &#x1F970;
                </p>
                {
                  noCount === 0 ?
                    <p>thanks for not rejecting me!!</p> :
                    <p>
                      you tried rejecting me <b>{noCount}</b> times... &#x1F624;
                    </p>
                }
                <button className='button' onClick={() => {
                  setStep(Step.pageLoad);
                  setNoCount(0);
                }}>
                  back
                </button>
              </div>
      }
      </div>
      <Flowers />
    </>
  )
}

export default App

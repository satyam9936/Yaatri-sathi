import React, { useState, useEffect } from "react";
import "./RailwayMap.css";

export default function RailwayMap() {
  const [trainPosition, setTrainPosition] = useState({ x: 50, y: 400, rotation: 0 });
  const [currentTrack, setCurrentTrack] = useState(1);
  const [isMoving, setIsMoving] = useState(false);

  // Track definitions (matching your UI)
  const trackSegments = {
    1: { // Horizontal bottom
      start: { x: 50, y: 400 },
      end: { x: 1450, y: 400 },
      next: 2,
      rotation: 0
    },
    2: { // Diagonal connector
      start: { x: 1450, y: 400 },
      end: { x: 1500, y: 340 },
      next: 3,
      rotation: -80
    },
    3: { // Horizontal upper
      start: { x: 1500, y: 340 },
      end: { x: 1850, y: 340 },
      next: 1, // loop back
      rotation: 0
    }
  };

  useEffect(() => {
    if (!isMoving) return;

    const moveInterval = setInterval(() => {
      setTrainPosition(prevPos => {
        const track = trackSegments[currentTrack];
        const progress = 0.01; // Speed

        // Direction vector
        const dx = track.end.x - track.start.x;
        const dy = track.end.y - track.start.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        const dirX = dx / length;
        const dirY = dy / length;

        const newX = prevPos.x + dirX * progress * length;
        const newY = prevPos.y + dirY * progress * length;

        const distToEnd = Math.sqrt(
          Math.pow(newX - track.end.x, 2) + Math.pow(newY - track.end.y, 2)
        );

        if (distToEnd < 5) {
          const nextTrack = track.next;
          setCurrentTrack(nextTrack);
          return {
            x: trackSegments[nextTrack].start.x,
            y: trackSegments[nextTrack].start.y,
            rotation: trackSegments[nextTrack].rotation
          };
        }

        return { x: newX, y: newY, rotation: track.rotation };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isMoving, currentTrack]);

  const startTrain = () => {
    setIsMoving(true);
    setTrainPosition({ x: 50, y: 400, rotation: 0 });
    setCurrentTrack(1);
  };

  const stopTrain = () => {
    setIsMoving(false);
  };

  return (
    <div className="railway-map">
      {/* === Control Panel === */}
      <div className="main-simulation">
      <div className="control-panel">
        <button onClick={startTrain} className="start-btn">Start Train</button>
        <button onClick={stopTrain} className="stop-btn">Stop Train</button>
        <div className="status">Current Track: {currentTrack}</div>
      </div>

      <div className="railway-inner">
        {/* === Stations (top section) === */}
        <div className="station" style={{ top: 60, left: 600 }}>Prabhadevi</div>
        <div className="station" style={{ top: 60, left: 800 }}>Dadar</div>
        <div className="station" style={{ top: 60, left: 1000 }}>mtg rd</div>
        <div className="station" style={{ top: 60, left: 1250 }}>Mahim Junction</div>

        {/* === 5 Parallel Horizontal Tracks (shifted right) === */}
        <div id = "1" className="track horizontal" style={{ top: 80, left: 500, width: 1100 }}></div>
        <div id = "2" className="track horizontal" style={{ top: 100, left: 500, width: 1100 }}></div>
        <div id = "3" className="track horizontal" style={{ top: 120, left: 500, width: 1100 }}></div>
        <div id = "4" className="track horizontal" style={{ top: 140, left: 500, width: 1100 }}></div>
        <div id = "5" className="track horizontal" style={{ top: 160, left: 500, width: 1100 }}></div>

        {/* === Switches (shifted right) === */}
        <div className="track diagonal" style={{ top: 140, left: 1220, width: 39, transform: "rotate(-30deg)" }}></div>
        <div className="switch" style={{ top: 140, left: 1220 }}>SW1</div>

        <div className="track diagonal" style={{ top: 140, left: 1380, width: 39, transform: "rotate(-30deg)" }}></div>
        <div className="switch" style={{ top: 140, left: 1380 }}>SW2</div>

        <div className="track diagonal" style={{ top: 160, left: 1140, width: 40, transform: "rotate(-30deg)" }}></div>
        <div className="switch" style={{ top: 160, left: 1140 }}>SW3</div>

        <div className="track diagonal" style={{ top: 160, left: 1300, width: 40, transform: "rotate(-30deg)" }}></div>
        <div className="switch" style={{ top: 160, left: 1300 }}>SW4</div>

        <div id = "6" className="track horizontal" style={{ top: 180, left: 1500, width: 100 }}></div>

        {/*from */}

        {/* === NEW SECTION: Byculla → Currey Road → Sandhurst === */}
        <div className="station" style={{ top: 240, left: 190 }}>Byculla</div>
        <div className="station" style={{ top: 240, left: 260 }}>Chich Pokli</div>
        <div className="station" style={{ top: 240, left: 390 }}>Currey Road</div>
        <div className="station" style={{ top: 265, left: 70 }}>Sandhurst Road</div>
        <div className="station" style={{ top: 285, left: 70 }}>Railway Station</div>
        <div className="station" style={{ top: 340, left: 750 }}>Parel</div>


        {/* Long horizontal track */}
        <div id = "7" className="track horizontal" style={{ top: 260, left: 50, width: 1560 }}></div>

        {/* Switch*/}<div className="track diagonal" style={{ top: 320, left: 850, width: 77, transform: "rotate(-52deg)" }}></div>
        <div id = "8" className="track horizontal" style={{ top: 320, left: 600, width: 300 }}></div>

        <div id = "9" className="track horizontal" style={{ top: 340, left: 50, width: 1560 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 340, left: 915, width: 28, transform: "rotate(-122deg)" }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 340, left: 550, width: 105, transform: "rotate(-52deg)" }}></div>


        <div id = "10" className="track horizontal" style={{ top: 380, left: 50, width: 1560 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 380, left: 550, width: 50, transform: "rotate(-52deg)" }}></div>

        <div id = "11" className="track horizontal" style={{ top: 400, left: 50, width: 1560 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 400, left: 450, width: 28, transform: "rotate(-52deg)" }}></div>



        <div id = "12" className="track diagonal" style={{ top: 260, left: 48, width: 100, transform: "rotate(-240deg)" }}></div>
        <div id = "13" className="track diagonal" style={{ top: 340, left: 48, width: 100, transform: "rotate(-240deg)" }}></div>
        <div id = "14" className="track diagonal" style={{ top: 380, left: 48, width: 100, transform: "rotate(-240deg)" }}></div>
        <div id = "15" className="track diagonal" style={{ top: 400, left: 48, width: 100, transform: "rotate(-240deg)" }}></div>

        {/*to */}


        {/* dockyard -> vadhala road */}
        <div id = "18" className="track horizontal" style={{ top: 500, left: 1100, width: 250 }}></div>
        <div id = "17" className="track horizontal" style={{ top: 520, left: 1100, width: 270 }}></div>
        <div id = "18" className="track diagonal" style={{ top: 500, left: 1350, width: 362, transform: "rotate(-70deg)" }}></div>
        <div id = "28" className="track diagonal" style={{ top: 520, left: 1370, width: 368, transform: "rotate(-69deg)" }}></div>


        <div id = "18" className="track horizontal" style={{ top: 580, left: 50, width: 960 }}></div>
        <div id = "18" className="track diagonal" style={{ top: 580, left: 48, width: 100, transform: "rotate(-135deg)" }}></div>
        <div id = "18" className="track diagonal" style={{ top: 580, left: 1008, width: 123, transform: "rotate(-42deg)" }}></div>
        <div id = "21" className="track horizontal" style={{ top: 600, left: 410, width: 401 }}></div>
        <div id = "22" className="track horizontal" style={{ top: 600, left: 900, width: 111 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 600, left: 650, width: 29, transform: "rotate(-45deg)" }}></div>

        {/* Switch*/}<div className="track diagonal" style={{ top: 600, left: 411, width: 29, transform: "rotate(-139deg)" }}></div>

        {/* Switch*/}<div className="track diagonal" style={{ top: 620, left: 525, width: 59, transform: "rotate(-139deg)" }}></div>

        <div id = "29" className="track diagonal" style={{ top: 600, left: 1008, width: 122, transform: "rotate(-41deg)" }}></div>
        <div id = "30" className="track diagonal" style={{ top: 600, left: 810, width: 138, transform: "rotate(-290deg)" }}></div>
        <div id = "23" className="track horizontal" style={{ top: 620, left: 375, width: 428 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 620, left: 600, width: 29, transform: "rotate(-45deg)" }}></div>
        <div id = "31" className="track diagonal" style={{ top: 620, left: 800, width: 124, transform: "rotate(-290deg)" }}></div>
        <div id = "24" className="track horizontal" style={{ top: 640, left: 360, width: 333 }}></div>
        <div id = "25" className="track horizontal" style={{ top: 660, left: 50, width: 680 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 640, left: 460, width: 29, transform: "rotate(-45deg)" }}></div>
        <div id = "32" className="track diagonal" style={{ top: 660, left: 48, width: 100, transform: "rotate(-135deg)" }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 660, left: 709, width: 29, transform: "rotate(-135deg)" }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 660, left: 729, width: 57, transform: "rotate(-45deg)" }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 660, left: 420, width: 29, transform: "rotate(-45deg)" }}></div>

        <div id = "26" className="track horizontal" style={{ top: 700, left: 720, width: 150 }}></div>
        {/* Switch*/}<div className="track diagonal" style={{ top: 700, left: 720, width: 55, transform: "rotate(-135deg)" }}></div>
        <div id = "33" className="track diagonal" style={{ top: 700, left: 870, width: 105, transform: "rotate(-72deg)" }}></div>

        {/* === NEW SECTION: dockyard Road → reay Road → cotton green → Sewri → vadhala Road → King's Circle === */}
        <div className="station" style={{ top: 680, left: 60 }}>Dockyard Road</div>
        <div className="station" style={{ top: 680, left: 180 }}>Reay Road</div>
        <div className="station" style={{ top: 680, left: 260 }}>Cotton Green</div>
        <div className="station" style={{ top: 680, left: 360 }}>Sewri </div>
        <div className="station" style={{ top: 680, left: 600 }}>Vadhala Road</div>
        <div className="station" style={{ top: 530, left: 1200 }}>King's Circle </div>

      </div>
      </div>
    </div>
  );
}



// 19 18 20 27 5
import ReactPlayer from 'react-player/youtube'
import './App.css';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Pause, Play, Clipboard } from '@phosphor-icons/react';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLeftVideoUrl = searchParams.get("l") || "https://www.youtube.com/watch?v=n0iReP8TEII";
  const initialRightVideoUrl = searchParams.get("r") || "https://www.youtube.com/watch?v=g7O-7rF0Hqk";

  const [leftVideo, setLeftVideo] = useState(initialLeftVideoUrl);
  const [rightVideo, setRightVideo] = useState(initialRightVideoUrl);
  const [volumeLeft, setVolumeLeft] = useState(1);
  const [volumeRight, setVolumeRight] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [balance, setBalance] = useState(50); // 50 is the default (both videos at volume 1)

  useEffect(() => {
    if (leftVideo || rightVideo) {
      setSearchParams({ l: leftVideo, r: rightVideo });
    }
  }, [leftVideo, rightVideo, setSearchParams]);

  const handleBalanceChange = (e: { target: { value: any; }; }) => {
    const newBalance = e.target.value;
    setBalance(newBalance);
    const newVolumeLeft = 1 - newBalance / 100;
    const newVolumeRight = newBalance / 100;
    setVolumeLeft(newVolumeLeft);
    setVolumeRight(newVolumeRight);
  };

   const handleCopyClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="container">
      <div className="videos">
        <div className="video-container">
          <ReactPlayer
            url={leftVideo}
            volume={volumeLeft}
            playing={playing}
            className="video-player"
          />
          <input
            type="text"
            value={leftVideo}
            onChange={(e) => {
              setLeftVideo(e.target.value);
            }}
            className="video-url-input"
          />
        </div>
        <div className="video-container">
          <ReactPlayer
            url={rightVideo}
            volume={volumeRight}
            playing={playing}
            className="video-player"
          />
          <input
            type="text"
            value={rightVideo}
            onChange={(e) => {
              setRightVideo(e.target.value);
            }}
            className="video-url-input"
          />
        </div>
      </div>
      <div className="controls">
        <button onClick={() => setPlaying(!playing)}>
          {playing ? <Pause size={32} /> : <Play size={32} />}
        </button>

        <div className="balance-container">
          <label htmlFor="balance" className="balance-label">Balance</label>
          <div className="slider-container">
            <span>L</span>
            <input
              type="range"
              id="balance"
              min="0"
              max="100"
              value={balance}
              onChange={handleBalanceChange}
              className="balance-slider"
            />
            <span>
              R</span>
        </div>
        <div className="url-container">
        Share this mix!
        <input
          type="text"
          value={window.location.href}
          readOnly
          className="url-input"
        />
        <button onClick={handleCopyClick} className="copy-button">
          <Clipboard size={20} />
        </button>
      </div>
          </div>
        </div>
      </div>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { GameScene } from './scenes/game/GameScene.tsx';
import { Canvas, useFrame } from '@react-three/fiber';
import "./App.css";
import * as TWEEN from '@tweenjs/tween.js';

function Environment() {
    useFrame(() => {
        TWEEN.update();
    });

    return <Router>
        <Routes>
            <Route path="/" element={<GameScene />} />
        </Routes>
    </Router>
}

function App() {
  return (
      <div id="canvasContainer">
          <Canvas>
              <Environment />
          </Canvas>
      </div>
  )
}


export default App


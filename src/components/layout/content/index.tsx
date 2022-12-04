import { Routes, Route } from "react-router-dom";
import { GameProvider } from "../../../store/GameProvider";
import { ViewProvider } from "../../../store/ViewProvider";

import { Container } from "./style";

import Home from './../../../pages/home';
import About from './../../../pages/about';
import Game from "../../../pages/game";

const Content = () => {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={(
          <GameProvider>
            <ViewProvider>
              <Game />
            </ViewProvider>
          </GameProvider>
        )} />
      </Routes>
    </Container >
  );
};

export default Content;
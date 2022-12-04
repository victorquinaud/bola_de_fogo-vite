import { useContext } from "react";
import { Container } from "./style";
import { GameContext } from './../../../store/GameProvider';
import { ViewContext } from './../../../store/ViewProvider';

const EndGameButton = () => {
  const { endGame } = useContext(GameContext) as TGameResponse;
  const { setView } = useContext(ViewContext) as TViewResponse;

  return (
    <Container>
      <button onClick={() => {
        setView("start");
        endGame();
      }} >End Game</button>
    </Container>
  );
};

export default EndGameButton;
import { Container, Visible } from "./style";
import { useContext } from "react";
import { ViewContext } from "../../store/ViewProvider";

import Start from "./pages/start";
import Payment from "./pages/payment";
import Teams from "./pages/teams";
import History from "./pages/history";
import Menu from "./menu";
import EndGameButton from "./endGameButton";

const Game = () => {
  const { view } = useContext(ViewContext) as TViewResponse;

  return (
    <Container>
      <Visible label="start" view={view} >
        <Start />
      </Visible>

      <Visible label="payment" view={view} >
        <Payment />
      </Visible>

      <Visible label="teams" view={view} >
        <Teams />
      </Visible>

      <Visible label="history" view={view} >
        <History />
      </Visible>

      <EndGameButton />
      <Menu />
    </Container>
  );
};

export default Game;
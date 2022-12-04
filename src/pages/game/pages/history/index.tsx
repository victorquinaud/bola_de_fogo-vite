import { Container } from "./style";
import { useContext } from 'react';
import { GameContext } from './../../../../store/GameProvider';

const History = () => {
  const { game } = useContext(GameContext) as TGameResponse;
  const { history } = game;

  const matches: Match[] = history.map(match => match);

  return (
    <Container>
      <h2>History</h2>
    </Container>
  );
};

export default History;
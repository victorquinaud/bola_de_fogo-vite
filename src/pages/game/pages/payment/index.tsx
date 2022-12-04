import { useContext, useEffect, useState } from 'react';
import { GameContext } from './../../../../store/GameProvider';

import { Container } from "./style";

const Payment = () => {
  const { game, setGame } = useContext(GameContext) as TGameResponse;
  const [players, setPlayers] = useState<Player[]>(game.payment || []);

  useEffect(() => {
    setPlayers(players => {
      if (game.payment.length)
        return game.payment;
      else if (game.list.length)
        return game.list.map(name => ({ name, paymentStatus: false }))
      else
        return [];
    });
  }, [game.list, setPlayers]);

  useEffect(() => {
    if (game.list.length)
      setGame("payment", players);
  }, [players, setGame]);

  return (
    <Container>
      <h2>Payment</h2>
      <ul>
        {players?.map((player, index) =>
          <li key={player.name}>
            <label>{player.name}</label>
            <input
              type="checkbox"
              checked={player.paymentStatus}
              onChange={() => {
                setPlayers(players => {
                  players[index].paymentStatus = players[index].paymentStatus ? false : true;
                  return [...players];
                });
              }}
            />
          </li>)}
      </ul>
    </Container>
  );
};

export default Payment;
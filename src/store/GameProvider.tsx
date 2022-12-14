import { createContext, useEffect } from "react";
import usePersistedReducer from './../hooks/usePersistedReducer';

const createDate = () => {
  return new Date().toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const initialState = {
  date: createDate(),
  status: false,
  list: [],
  payment: [],
  teams: [],
  history: [],
  options: {
    vs: 4,
    randomStatus: false,
    random: "team" as Random
  }
}

export const GameContext = createContext<TGameResponse | null>(null);

export const GameProvider = ({ children }: React.PropsWithChildren) => {
  const { state: game, setState: setGame } = usePersistedReducer<TGame>("GAME", initialState);

  useEffect(() => {
    if (game.status) {
      // inser a modal to verify if the user wants to continue the last game in local storage
      if (!window.confirm("You have a running game. Do you want to continue it?"))
        setGame("ALL", initialState);
    }

    setGame("status", true);
  }, []);

  const endGame = () => {
    const gameStorage = localStorage.getItem("GAME");
    const historyStorage = localStorage.getItem("HISTORY");

    const gameValue: TGame = gameStorage && JSON.parse(gameStorage);
    let historyValue = historyStorage && JSON.parse(historyStorage);

    if (historyValue)
      historyValue = { ...historyValue, [gameValue.date]: { ...gameValue } };
    else
      historyValue = { [gameValue.date]: { ...gameValue } };

    localStorage.removeItem("GAME");
    localStorage.setItem("HISTORY", JSON.stringify(historyValue));
    setGame("ALL", initialState);
  }

  return (
    <GameContext.Provider value={{
      game,
      setGame,
      endGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

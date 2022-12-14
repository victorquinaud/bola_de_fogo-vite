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
        endGame();
    }

    setGame("status", true);
  }, []);

  function endGame() {
    const historyStorage = localStorage.getItem("HISTORY");
    let historyValue = historyStorage && JSON.parse(historyStorage);

    historyValue = { ...historyValue, [game.date]: { ...game } };

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

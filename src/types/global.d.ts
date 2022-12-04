import { Dispatch, MouseEvent, SetStateAction } from "react";

declare global {
  // src/store/GameProvider
  type Player = {
    name: string,
    paymentStatus?: boolean,
    team?: "blue" | "red" | null
  }

  type Match = {
    winner: Player[],
    looser: Player[]
  }

  type Options = {
    vs: number,
    randomStatus: boolean,
    random: "team" | "all" | null
  }

  type TGame = {
    date: Date<string> | null,
    status: boolean,
    list: string[],
    payment: Player[],
    teams: Player[],
    history: Match[],
    options: Options
  }

  type TGameResponse = {
    game: TGame,
    setGame(key: string, value: any): void,
    endGame(): void
  };

  enum StateKeys {
    status = "status",
    list = "list",
    players = "players",
    teams = "teams"
  }

  // src/store/ViewProvider
  type TView = "start" | "payment" | "teams" | "history";

  type TViewResponse = {
    view: TView
    setView: Dispatch<SetStateAction<TView>>
  };
}

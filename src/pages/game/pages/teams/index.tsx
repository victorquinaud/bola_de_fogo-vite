import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../store/GameProvider";
import { Container } from "./style";

type Teams = "blue" | "red" | null;
type Winner = "blue" | "red";

const getTeam = (teams: Player[], teamName: Teams) => {
  if (teamName) {
    return teams
      .filter(player => player.team === teamName);
  } else {
    return teams.filter(player => !player.team);
  }
}

const defineTeams = (players: Player[], { vs, randomStatus, random }: Options, winner: Teams) => {

  const winners = players.filter(player => player.team && player.team === winner)
  const loosers = players.filter(player => player.team && player.team !== winner)
  const rest = players.filter(player => !player.team)

  players = [...winners, ...rest, ...loosers]

  players = players.map((player, index) => {

    if (index < vs)
      player.team = winner ? winner : "blue";
    else if (index >= vs && index < (vs * 2))
      player.team = winner ? (winner === "blue" ? "red" : "blue") : "red";
    else
      player.team = null;

    return player;
  });

  return players;
}

const Teams = () => {
  const { game, setGame } = useContext(GameContext) as TGameResponse;

  const [teams, setTeams] = useState<Player[]>(game.teams || []);

  useEffect(() => {
    if (!teams.length)
      setTeams(defineTeams(
        (game.teams.length ? game.teams : game.list.map(name => ({ name, team: null }))),
        game.options, null)
      );
  }, [game.list, setTeams, defineTeams]);

  useEffect(() => {
    setGame("teams", teams);
  }, [teams]);

  const blue = getTeam(teams, "blue");
  const red = getTeam(teams, "red");
  const rest = getTeam(teams, null);

  const setHistory = (winner: Winner) => {
    const newHistory = [
      ...game.history,
      {
        winner: { [winner]: winner === "blue" ? blue : red },
        looser: { [winner === "blue" ? "red" : "blue"]: winner === "blue" ? red : blue }
      }
    ]

    setGame("history", newHistory);
  }

  const handdleTeams = (winner: Winner) => {
    setHistory(winner);
    const final = defineTeams(teams, game.options, winner);
    setTeams(final);
  }

  return (
    <Container>
      <h2>Teams</h2>

      {blue.map(player => (
        <li key={player.name}>
          <label>{player.name}</label>
          <span> - {player.team ? player.team : "null"}</span>
        </li>
      ))}

      {red.map(player => (
        <li key={player.name}>
          <label>{player.name}</label>
          <span> - {player.team ? player.team : "null"}</span>
        </li>
      ))}

      {rest.map(player => (
        <li key={player.name}>
          <label>{player.name}</label>
          <span> - {player.team ? player.team : "null"}</span>
        </li>
      ))}

      <button onClick={() => handdleTeams("blue")} >Winner Blue</button>
      <button onClick={() => handdleTeams("red")} >Winner Red</button>
    </Container>
  );
};

export default Teams;
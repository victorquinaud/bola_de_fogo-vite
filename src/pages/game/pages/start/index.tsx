import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../store/GameProvider";
import InputList from "./inputList";
import { Container } from "./style";

const Start = () => {
  const { game, setGame } = useContext(GameContext) as TGameResponse;

  const [list, setList] = useState<string[]>(game.list);
  const [vs, setVs] = useState(4);
  const [randomStatus, setRandomStatus] = useState(false);
  const [random, setRandom] = useState<"team" | "all" | "none">("none");

  useEffect(() => {
    setGame("list", list);
    setGame("options", { vs, randomStatus, random });
  }, [list, vs, randomStatus, random]);

  return (
    <Container>
      <h2>start</h2>

      <h3>list</h3>
      <InputList setList={setList} />

      <h3>vs</h3>
      <input type="number" value={vs} onChange={e => setVs(+e.target.value)} />

      <h3>random</h3>
      <input type="checkbox" name="randomStatus" checked={randomStatus}
        onChange={e => setRandomStatus(e.target.checked)} />
      <input type="radio" name="random" value={random} onChange={() => setRandom("team")} />
      <input type="radio" name="random" value={random} onChange={() => setRandom("all")} />

    </Container>
  );
};

export default Start;
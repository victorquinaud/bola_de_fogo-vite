import { useContext } from "react";
import { ViewContext } from "../../../store/ViewProvider";
import { Container } from "./style";

const Menu = () => {
  const { setView } = useContext(ViewContext)  as TViewResponse;

  return (
    <Container>
      <ul>
        <li><button onClick={() => setView("start")} >Start</button></li>
        <li><button onClick={() => setView("payment")} >Payment</button></li>
        <li><button onClick={() => setView("teams")} >Teams</button></li>
        <li><button onClick={() => setView("history")} >History</button></li>
      </ul>
    </Container>
  );
};

export default Menu;
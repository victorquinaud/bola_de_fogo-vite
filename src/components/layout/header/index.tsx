import { Container } from "./style";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <Container>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/about">About</Link>
      </ul>
    </Container>
  );
};

export default Header;
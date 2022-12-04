import styled from "styled-components";

type Props = {
  view: string,
  label: string
}

export const Visible = styled.div<Props>`
  display: ${({ view, label }) => view === label ? "hidden" : "none"};
  flex-grow: 1;
`;

export const Container = styled.div`
  ul {
    display: flex;
    justify-content: start;
  }

  display: flex;
  flex-direction: column;

  /* background-color: red; */
`;

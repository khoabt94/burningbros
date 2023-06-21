import styled from "styled-components";

const ResultsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;

  img {
    width: 100%;
  }
`;

export { Card, ResultsContainer };

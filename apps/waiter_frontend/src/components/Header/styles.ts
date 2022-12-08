import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #D73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 199%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      color: #fff;
      font-size: 32px;
    }

    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;

export { HeaderContainer, HeaderContent };

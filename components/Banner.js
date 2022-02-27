import styled from 'styled-components';
import { QUERIES } from '../constants';

const Banner = ({ buttonText, handleOnClick }) => {
  return (
    <Container>
      <Title>
        <Title1>Coffee</Title1> <Title2>Connoisseur</Title2>
      </Title>
      <SubTitle>Discover your local coffee shops!</SubTitle>
      <Button onClick={handleOnClick}>{buttonText}</Button>
    </Container>
  );
};

// by default this is a mobile breakpoint
/** 
  Breakpoints:
  ------------
  smallAndUp: min-width: 640px; //small device
  mediumAndUp: min-width: 768px; // medium device
  largeAndUp: min-width: 1024px; // large device
  extraLargeAndUp: min-width: 1280px; // extra large device
  twoExtraLargeAndUp: min-width: 1536px; // 2 x extra large device
**/
const Container = styled.div`
  position: relative;
  margin-bottom: 1rem;
  z-index: 2;

  @media ${QUERIES.largeAndUp} {
    text-align: left;
  }
`;

const Title = styled.h1`
  letter-spacing: -0.025em;
  font-weight: 800;
  color: var(--text-black);

  /* font-size: 3rem /* 48px */
  font-size: clamp(3rem, 3.5vw + 1.5rem, 4.6rem);
  /* line-height: 1; */

  @media ${QUERIES.smallAndUp} {
    /* font-size: 3rem; */
  }

  @media ${QUERIES.mediumAndUp} {
    /* font-size: 3.75rem /* 60px */
  }

  @media ${QUERIES.largeAndUp} {
    /* font-size: 4.5rem /* 72px */
  }
`;

const Title1 = styled.span`
  color: rgba(249, 250, 251, 1);
`;

const Title2 = styled.span`
  display: block;
  color: var(--text-purple);

  @media ${QUERIES.largeAndUp} {
    padding-left: 0.5rem;
  }

  @media ${QUERIES.extraLargeAndUp} {
    display: inline;
  }
`;

const SubTitle = styled.p`
  /* margin-top: 0.75rem; */
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  margin-top: 0.75rem;

  color: var(--text-white-100);

  @media ${QUERIES.smallAndUp} {
    /* margin-top: 1.25rem; */
    max-width: 36rem;
  }

  @media ${QUERIES.mediumAndUp} {
    /* margin-top: 1.25rem; */
  }

  @media ${QUERIES.largeAndUp} {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const Button = styled.button`
  background-color: var(--text-purple-dark);
  cursor: pointer;
  color: white;
  outline: 0;
  border: 0px;
  border-radius: 10px;

  padding-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  padding-left: 2.5rem /* 40px */;
  padding-right: 2.5rem /* 40px */;

  margin: 1.5rem 0;

  &:hover {
    background-color: var(--text-purple-dark);
  }

  @media ${QUERIES.mediumAndUp} {
    padding-top: 1rem /* 16px */;
    padding-bottom: 1rem /* 16px */;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    padding-left: 2.5rem /* 40px */;
    padding-right: 2.5rem /* 40px */;
  }
`;

export default Banner;

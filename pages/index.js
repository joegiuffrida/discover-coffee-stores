import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import Banner from '../components/Banner';
import Card from '../components/Card';
import { QUERIES } from '../constants';

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('hi banner button was clicked');
  };

  return (
    <Container>
      <Head>
        <title>Discover Coffee Near You</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Main>
        {/* <ImageWrapper>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </ImageWrapper> */}
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <CardLayout>
          <Card
            name="DarkHorse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffee-store/darkhorse-coffee"
          />
          <Card
            name="DarkHorse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffee-store/darkhorse-coffee"
          />
          <Card
            name="DarkHorse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffee-store/darkhorse-coffee"
          />
        </CardLayout>
      </Main>
    </Container>
  );
}

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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 4rem 4rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${QUERIES.mediumAndUp} {
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  display: none;

  @media ${QUERIES.mediumAndUp} {
    display: revert;
    position: absolute;
    top: 0px;
    left: 35%;
    z-index: 1;
  }
`;

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 1.5rem;

  @media ${QUERIES.smallAndUp} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${QUERIES.largeAndUp} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

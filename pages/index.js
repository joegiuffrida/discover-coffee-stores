import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import Banner from '../components/Banner';
import Card from '../components/Card';
import { QUERIES } from '../constants';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

export const getStaticProps = async () => {
  const coffeeStoreData = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores: coffeeStoreData,
    },
  };
};

export default function Home({ coffeeStores }) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  // const [userFetchedCoffeeStores, setUserFetchedCoffeeStores] = useState('');
  const [userFetchedCoffeeStoresError, setUserFetchedCoffeeStoresError] =
    useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { userCoffeeStores, latLong } = state;

  useEffect(async () => {
    if (latLong) {
      try {
        //set coffee stores
        const response = await fetch(
          `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
        );
        const fetchedCoffeeStores = await response.json();

        dispatch({
          type: ACTION_TYPES.SET_USER_COFFEE_STORES,
          payload: { userCoffeeStores: fetchedCoffeeStores },
        });
        setUserFetchedCoffeeStoresError('');
      } catch (error) {
        setUserFetchedCoffeeStoresError(error.message);
      }
    }
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    console.log('hi banner button was clicked');
    handleTrackLocation();
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
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && (
          <p>{`Something went wrong: ${locationErrorMsg}`}</p>
        )}
        {userFetchedCoffeeStoresError && (
          <p>{`Something went wrong: ${userFetchedCoffeeStoresError}`}</p>
        )}
        {/* rendering the coffee stores near the user after they click the view
        stores nearby button */}
        {userCoffeeStores.length > 0 && (
          <>
            <CoffeeStoresHeading>Stores near me</CoffeeStoresHeading>
            <CardLayout>
              {userCoffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    id={store.id}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                  />
                );
              })}
            </CardLayout>
          </>
        )}
        {/* rendering the default coffee stores */}
        {coffeeStores.length > 0 && (
          <>
            <CoffeeStoresHeading>Sacramento Stores</CoffeeStoresHeading>
            <CardLayout>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    id={store.id}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                  />
                );
              })}
            </CardLayout>
          </>
        )}
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
  min-height: 100%;
  padding: 4rem 4rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${QUERIES.mediumAndUp} {
    /* align-items: center; */
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

const CoffeeStoresHeading = styled.h2`
  font-weight: 800;
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: var(--text-white-100);
`;

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media ${QUERIES.smallAndUp} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${QUERIES.largeAndUp} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

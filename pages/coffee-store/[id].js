import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import { QUERIES } from '../../constants';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';
import { isEmpty, fetcher } from '../../utils';

export const getStaticProps = async ({ params }) => {
  const coffeeStoreData = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStoreData.find((coffeeStore) => {
    return coffeeStore.id === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
};

export const getStaticPaths = async () => {
  const coffeeStoreData = await fetchCoffeeStores();
  const paths = coffeeStoreData.map((coffeeStore) => ({
    params: {
      id: coffeeStore.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { userCoffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (userCoffeeStoreData) => {
    try {
      const { id, name, address, neighborhood, imgUrl, votes } =
        userCoffeeStoreData;
      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          address: address || '',
          neighborhood: neighborhood[0] || '',
          imgUrl,
          votes: 0,
        }),
      });

      const dbCoffeeStore = response.json();
      console.log({ dbCoffeeStore });
    } catch (error) {
      console.error(`Error creating coffee store: ${error}`);
    }
  };

  useEffect(() => {
    if (isEmpty(coffeeStore)) {
      if (userCoffeeStores.length > 0) {
        const findUserCoffeeStoreById = userCoffeeStores.find((coffeeStore) => {
          return coffeeStore.id === id;
        });
        if (findUserCoffeeStoreById) {
          setCoffeeStore(findUserCoffeeStoreById);
          handleCreateCoffeeStore(findUserCoffeeStoreById);
        }
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, initialProps.coffeeStore]);

  const { name, address, imgUrl, neighborhood } = coffeeStore;

  const [votingCount, setVotingCount] = useState(1);

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setVotingCount(data[0].votes);
    }
  }, [data]);

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

  const handleUpvoteButton = () => {
    console.log('you clicked the up vote button!');
    let count = votingCount + 1;
    setVotingCount(count);
  };

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <Container>
        <ColOne>
          <BackToHomeLinkWrapper>
            <Link href="/" passHref>
              <a>← Back to home</a>
            </Link>
          </BackToHomeLinkWrapper>
          <NameWrapper>
            <Name>{name}</Name>
          </NameWrapper>
          <ImageWrapper>
            <Image
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              width={600}
              height={360}
              alt={name}
            />
          </ImageWrapper>
        </ColOne>

        <ColTwo>
          {address && (
            <IconWrapper>
              <Image src="/static/icons/places.svg" width={24} height={24} />
              <Text>{address}</Text>
            </IconWrapper>
          )}

          {neighborhood && (
            <IconWrapper>
              <Image src="/static/icons/nearMe.svg" width={24} height={24} />
              <Text>{neighborhood}</Text>
            </IconWrapper>
          )}
          <IconWrapper>
            <Image src="/static/icons/star.svg" width={24} height={24} />
            <Text>{votingCount}</Text>
          </IconWrapper>
          <UpvoteButton onClick={handleUpvoteButton}>Up Vote!</UpvoteButton>
        </ColTwo>
      </Container>
    </Layout>
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

const Layout = styled.div`
  height: 100%;
  padding: 2rem;

  @media ${QUERIES.smallAndUp} {
    padding: 4rem;
  }

  @media ${QUERIES.largeAndUp} {
    height: 100vh;
  }
`;

const Container = styled.div`
  display: grid;

  @media ${QUERIES.smallAndUp} {
    width: 100%;
  }

  @media ${QUERIES.largeAndUp} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ColOne = styled.div`
  place-self: center;
`;

const BackToHomeLinkWrapper = styled.nav`
  font-size: 1.125rem;
  font-weight: 700;

  margin-bottom: 0.5rem;
`;

const NameWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Name = styled.h1`
  color: var(--text-white-100);
  font-size: 2.25rem;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  img {
    box-shadow: var(0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 #0000),
      0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 #0000,
      0 25px 50px -12px rgba(0, 0, 0, 0.25);

    border-radius: 0.75rem /* 12px */;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border-style: none;
  }
`;

const ColTwo = styled.div`
  border-radius: 1rem /* 16px */;
  padding: 1rem /* 16px */;
  display: flex;
  flex-direction: column;
  margin-left: 1rem /* 8px */;
  align-self: center;
  margin-top: 4rem /* 64px */;
  color: rgba(55, 59, 100, 1);

  /* glass filter effect */
  background: hsla(0 0% 100% / 0.4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid hsla(0 0% 100% / 0.2);

  &:hover {
    background: hsla(0 0% 100% / 0.7);
  }

  @media ${QUERIES.largeAndUp} {
    width: 75%;
  }
`;

const Text = styled.p`
  padding-left: 0.5rem /* 8px */;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  margin: 0;
  font-weight: 700;
`;

const IconWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem /* 16px */;
`;

const UpvoteButton = styled.button`
  width: fit-content;
  color: var(--text-white-100);
  margin-top: 1rem /* 16px */;
  margin-bottom: 1rem /* 16px */;
  padding-left: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;

  background-color: var(--text-purple-dark);
  cursor: pointer;
  color: white;
  outline: 0;
  border: 0px;

  font-size: 1rem;

  &:hover {
    background-color: var(--text-purple);
  }
`;

export default CoffeeStore;

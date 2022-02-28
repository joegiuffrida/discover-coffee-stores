import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import coffeeStoreData from '../../data/coffee-stores.json';

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      coffeeStore: coffeeStoreData.find((coffeeStore) => {
        return (
          coffeeStore.name.replace(/\s/g, '-').toLowerCase() ===
          params.id.replace(/\s/g, '-').toLowerCase()
        );
      }),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = coffeeStoreData.map((coffeeStore) => ({
    params: {
      id: coffeeStore.name.replace(/\s/g, '-').toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighbourhood, imgUrl } = coffeeStore;

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <Container>
        <ColOne>
          <BackToHomeLinkWrapper>
            <Link href="/" passHref>
              <a>Back to home</a>
            </Link>
          </BackToHomeLinkWrapper>
          <NameWrapper>
            <Name>{name}</Name>
          </NameWrapper>
          <ImageWrapper>
            <Image src={imgUrl} width={600} height={360} alt={name} />
          </ImageWrapper>
        </ColOne>

        <ColTwo>
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </ColTwo>
      </Container>
    </Layout>
  );
};

const Layout = styled.div``;

const Container = styled.div``;

const ColOne = styled.div``;

const BackToHomeLinkWrapper = styled.nav``;

const NameWrapper = styled.div``;

const Name = styled.h1``;

const ColTwo = styled.div``;

const ImageWrapper = styled.div``;

export default CoffeeStore;

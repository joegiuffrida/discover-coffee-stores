import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { QUERIES } from '../constants';

const Card = ({ id, name, imgUrl, websiteUrl, address, neighborhood }) => {
  // replace the spaces and / characters in the name with dashes, replace ' characters with nothing and make it lowercase. doing this so the path is the name of the coffee shop rather than just an id number
  const urlPath = name
    .replace(/[\s\/]/g, '-')
    .replace(/'/g, '')
    .toLowerCase();

  return (
    <div>
      <Link href={`/coffee-store/${urlPath}`} passHref>
        <CardLink>
          <Container>
            <CardHeaderWrapper>
              <CardHeader>{name}</CardHeader>
            </CardHeaderWrapper>
            <CardImageWrapper>
              <CardImage src={imgUrl} width={260} height={160} />
            </CardImageWrapper>
          </Container>
        </CardLink>
      </Link>
    </div>
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

const CardLink = styled.a`
  margin: auto;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: 0 0 transparent, 0 0 #0000, 0 0 transparent, 0 0 #0000,
    0 0 transparent;

  border-color: var(--text-white-100);
  border-radius: 0.75rem /* 12px */;
`;

const Container = styled.div`
  border-radius: 0.75rem /* 12px */;
  padding-top: 0.25rem /* 4px */;
  padding-bottom: 0.25rem /* 4px */;
  padding-bottom: 1.25rem /* 20px */;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;

  backdrop-filter: blur(10px);

  /* glass filter effect for cards */
  background: hsla(0 0% 100% / 0.4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid hsla(0 0% 100% / 0.2);

  &:hover {
    background: hsla(0 0% 100% / 0.7);
  }
`;

const CardHeaderWrapper = styled.div`
  margin-top: 0.75rem /* 12px */;
  margin-bottom: 0.75rem /* 12px */;
`;

const CardHeader = styled.h2`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  font-weight: 800;
  overflow: hidden;
  width: 16rem /* 256px */;

  @media ${QUERIES.mediumAndUp} {
    width: 16rem;
  }
`;

const CardImageWrapper = styled.div`
  color: var(--text-white-100);
`;

const CardImage = styled(Image)`
  border-radius: 0.75rem;
`;

export default Card;

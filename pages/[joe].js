import { useRouter } from 'next/router';
import Head from 'next/head';

const JoesPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{router.query.joe}</title>
      </Head>
      <h1>Page {router.query.joe}</h1>
    </div>
  );
};

export default JoesPage;

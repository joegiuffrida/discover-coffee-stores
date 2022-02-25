import { useRouter } from 'next/router';
import Link from 'next/link';

const CoffeeStore = () => {
  const router = useRouter();
  console.log({ router });
  return (
    <div>
      <nav>
        <Link href="/" passHref>
          <a>Back to home</a>
        </Link>
      </nav>
      coffee store page {router.query.id}
    </div>
  );
};

export default CoffeeStore;

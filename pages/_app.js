import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

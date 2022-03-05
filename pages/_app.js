import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/layout/Footer';
import StoreContextProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
      <Footer />
    </>
  );
}

export default MyApp;

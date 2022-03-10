import GlobalStyles from '../styles/GlobalStyles';

import StoreContextProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    </>
  );
}

export default MyApp;

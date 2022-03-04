import { createContext, useReducer } from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/layout/Footer';

// creating context to store latLong and coffee stores
export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_USER_COFFEE_STORES: 'SET_USER_COFFEE_STORES',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_USER_COFFEE_STORES: {
      return { ...state, userCoffeeStores: action.payload.userCoffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreContextProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    userCoffeeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

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

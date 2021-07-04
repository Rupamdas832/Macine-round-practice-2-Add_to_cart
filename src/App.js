import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ProductListing from './Page/ProductListing';
import Cart from './Page/Cart';
import Header from './Components/Header';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ProductListing} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

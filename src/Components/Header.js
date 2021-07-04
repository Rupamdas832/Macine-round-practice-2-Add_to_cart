import React from 'react';
import { ChakraProvider, Flex, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Flex
      direction="row"
      justifyContent="space-around"
      bg="teal"
      position="fixed"
      width="100vw"
      zIndex="2"
    >
      <Link to="/">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link to="/cart">
        <Button variant="ghost">Cart</Button>
      </Link>
    </Flex>
  );
};

export default Header;

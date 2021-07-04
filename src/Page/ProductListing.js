import React from 'react';

import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Badge,
  Image,
  Button,
} from '@chakra-ui/react';
import { useProduct } from '../Store/productContext';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const { state, dispatch } = useProduct();
  const { products } = state;

  const addToCartBtn = product => {
    const newProduct = {
      id: product.id,
      name: product.name,
      img: product.img,
      price: product.price,
      quantity: 1,
    };
    dispatch({ type: 'ADD_TO_CART', payload: newProduct });
  };

  return (
    <Flex
      direction="column"
      padding="5"
      alignItems="center"
      paddingY="14"
      bg="gray.200"
      minH="100vh"
    >
      <Text fontWeight="bold" fontSize="3xl">
        Products
      </Text>
      <Flex
        direction="row"
        wrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {products.map(product => {
          const { id, name, price, img, inCart } = product;
          return (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              key={id}
              margin="2"
              bg="white"
            >
              <Image src={img} alt="product" />

              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {name}
                </Box>

                <Box>
                  ₹{price}
                  <Box as="span" color="gray.600" fontSize="sm" marginLeft="5">
                    30% discount
                  </Box>
                </Box>
                {inCart ? (
                  <Link to="/cart">
                    <Button bg="orange.200" marginY="3">
                      Go to Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    colorScheme="teal"
                    marginY="3"
                    onClick={() => addToCartBtn(product)}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ProductListing;

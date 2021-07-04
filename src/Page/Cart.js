import React from 'react';
import { useProduct } from '../Store/productContext';
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Badge,
  Image,
  Button,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';

const Cart = () => {
  const { state, dispatch } = useProduct();
  const { cart, saveLater } = state;

  const removeFromCartBtn = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const increaseCountBtn = id => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };
  const decreaseCountBtn = (id, quantity) => {
    if (quantity > 1) {
      dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    }
  };

  const addToCartBtn = product => {
    const newProduct = {
      id: product.id,
      name: product.name,
      img: product.img,
      price: product.price,
      quantity: product.quantity,
    };
    dispatch({ type: 'MOVE_TO_CART', payload: newProduct });
  };

  const addToSaveLater = product => {
    dispatch({ type: 'ADD_TO_SAVE_LATER', payload: product });
  };

  const removeFromSaveLaterBtn = id => {
    dispatch({ type: 'REMOVE_FROM_SAVE_LATER', payload: id });
  };

  const calulateTotalPrice = () => {
    return cart.reduce(
      (accum, { price, quantity }) => accum + parseInt(price) * quantity,
      0
    );
  };
  return (
    <Flex
      direction="column"
      padding="5"
      alignItems="center"
      width="100vw"
      paddingY="14"
      bg="gray.200"
      minH="100vh"
    >
      <Text fontWeight="bold" fontSize="3xl">
        Cart
      </Text>
      <Flex direction="row" justifyContent="space-around" width="100%">
        <Flex
          direction="column"
          alignItems="center"
          width="60%"
          border="1px"
          borderColor="gray.400"
          paddingY="3"
        >
          {cart.map(cartItem => {
            const { id, name, img, price, quantity } = cartItem;
            return (
              <Flex
                direction="row"
                marginY="2"
                key={id}
                width="80%"
                bg="white"
                margin="2"
                padding="5"
                borderRadius="5"
              >
                <Flex width="20%">
                  <Image src={img} alt="product" />
                </Flex>
                <Flex direction="column" padding="2" width="80%">
                  <Text fontWeight="bold">{name}</Text>
                  <Text>₹{price}</Text>
                  <Flex direction="row" marginY="3">
                    <Button onClick={() => decreaseCountBtn(id, quantity)}>
                      -
                    </Button>
                    <Text>{quantity}</Text>
                    <Button onClick={() => increaseCountBtn(id)}>+</Button>
                  </Flex>
                  <Flex
                    direction="row"
                    justifyContent="space-around"
                    width="100%"
                  >
                    <Button onClick={() => addToSaveLater(cartItem)}>
                      Save For Later
                    </Button>
                    <Button onClick={() => removeFromCartBtn(id)}>
                      Remove From Cart
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
          {cart.length === 0 ? (
            <Text>No items in cart. Add Some products!</Text>
          ) : (
            <Button colorScheme="teal">Place Order</Button>
          )}
          {saveLater.length > 0 && (
            <Text fontWeight="bold" marginY="5">
              Save for Later({saveLater.length} items)
            </Text>
          )}
          <Flex direction="column" alignItems="center" width="80%">
            {saveLater.map(saveLaterItem => {
              const { id, name, img, price, quantity } = saveLaterItem;
              return (
                <Flex
                  direction="row"
                  marginY="2"
                  key={id}
                  width="80%"
                  bg="gray.200"
                  margin="3"
                  padding="5"
                  border="2px"
                  borderColor="gray.400"
                >
                  <Flex width="20%">
                    <Image src={img} alt="product" />
                  </Flex>
                  <Flex direction="column" padding="2" width="80%">
                    <Text fontWeight="bold">{name}</Text>
                    <Text>₹{price}</Text>
                    <Flex direction="row" marginY="3">
                      <Button
                        onClick={() => decreaseCountBtn(id, quantity)}
                        disabled
                      >
                        -
                      </Button>
                      <Text>{quantity}</Text>
                      <Button onClick={() => increaseCountBtn(id)} disabled>
                        +
                      </Button>
                    </Flex>
                    <Flex
                      direction="row"
                      justifyContent="space-around"
                      width="100%"
                    >
                      <Button onClick={() => addToCartBtn(saveLaterItem)}>
                        Move To Cart
                      </Button>
                      <Button onClick={() => removeFromSaveLaterBtn(id)}>
                        Remove
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        {cart.length > 0 && (
          <Flex width="25%" height="auto" direction="column">
            <Flex
              direction="column"
              width="100%"
              bg="white"
              padding="5"
              marginX="3"
              borderRadius="10"
            >
              <Text marginBottom="3" fontWeight="bold">
                Price Details({cart.length} items)
              </Text>
              <Divider />
              <Grid templateColumns="repeat(3,1fr)" width="100%" marginY="3">
                <GridItem colSpan={2}>
                  <Text>PRICE </Text>
                </GridItem>
                <GridItem>
                  <Text>{calulateTotalPrice()}</Text>
                </GridItem>
              </Grid>
              <Grid templateColumns="repeat(3,1fr)" width="100%" marginY="3">
                <GridItem colSpan={2}>
                  <Text>Discount </Text>
                </GridItem>
                <GridItem>
                  <Text>-₹60</Text>
                </GridItem>
              </Grid>
              <Divider marginY="3" />
              <Grid
                templateColumns="repeat(3,1fr)"
                width="100%"
                fontWeight="bold"
              >
                <GridItem colSpan={2}>
                  <Text>Total Price </Text>
                </GridItem>
                <GridItem>
                  <Text>₹{calulateTotalPrice() - 60}</Text>
                </GridItem>
              </Grid>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Cart;

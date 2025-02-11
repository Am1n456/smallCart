import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.store";

function CreateProducts() {
  const [products, setProducts] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProducts } = useProductStore();

  function validateProduct() {
    if (!products.name) return toast.error("Name is required");
    if (!products.price) return toast.error("Price is required");
    if (!products.image) return toast.error("Image is required");

    return true
  }

  function handleAddProducts(e) {
    e.preventDefault();

    let success = validateProduct();

    if (success === true) createProducts(products);

    setProducts({
      name: "",
      price: "",
      image: "",
    });
  }
  return (
    <Container>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Products
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Products Name"
              name="name"
              value={products.name}
              onChange={(e) =>
                setProducts({ ...products, name: e.target.value })
              }
            />

            <Input
              placeholder="Products Price"
              name="name"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
            />

            <Input
              placeholder="Products Image"
              name="name"
              value={products.image}
              onChange={(e) =>
                setProducts({ ...products, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProducts} w="full">
              Add Products
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreateProducts;

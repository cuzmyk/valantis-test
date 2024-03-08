import { Box, Flex, Text } from "@chakra-ui/react";

const ItemCard = ({ id, product, price, brand }) => {
  return (
    <Box
      p={5}
      bgColor={"#fff"}
      borderRadius={5}
      boxShadow={"2px 2px 15px rgba(0,0,0,0.2)"}
    >
      <Text mb={3} fontSize={10}>
        {id}
      </Text>
      <Text mb={3}>{product}</Text>
      <Flex justifyContent={"space-between"}>
        <Box>
          <Text>Цена</Text>
          <Text fontWeight={500}>{price}</Text>
        </Box>
        {brand && (
          <Box>
            <Text>Бренд</Text>
            <Text fontWeight={500}>{brand}</Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ItemCard;

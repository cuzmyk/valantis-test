import { Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex p={5} bgColor={"gray.600"} justifyContent={"center"}>
      <Text fontWeight={700} textTransform={"uppercase"} color={"white"}>
        Valantis test task
      </Text>
    </Flex>
  );
};

export default Header;

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <Flex
      maxW={576}
      margin="0 auto"
      position="sticky"
      bottom={0}
      backgroundColor="darkslategray"
      justifyContent="center"
      textAlign="center"
      cursor="pointer"
      color="white"
    >
      <Link href="/">
        <Text flex={1} padding="1rem">
          List
        </Text>
      </Link>
      <Link href="/my-list">
        <Text flex={1} padding="1rem">
          My List
        </Text>
      </Link>
    </Flex>
  );
};

export default Footer;

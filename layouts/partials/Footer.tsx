import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ILinkMenu {
  label?: string;
  to?: string;
}

const LinkMenu = ({ label, to }: ILinkMenu) => {
  const { pathname } = useRouter();
  return (
    <Link href={to || "/"}>
      <Text
        flex={1}
        padding="1rem"
        backgroundColor={pathname === to ? "salmon" : "darkslategray"}
      >
        {label}
      </Text>
    </Link>
  );
};

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
      <LinkMenu label="List" to="/" />
      <LinkMenu label="My List" to="/my-list" />
    </Flex>
  );
};

export default Footer;

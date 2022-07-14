import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ILinkMenu {
  label?: string;
  to?: string;
  counter?: number | string;
}

const LinkMenu = ({ label, to, counter }: ILinkMenu) => {
  const { pathname } = useRouter();
  return (
    <Link href={to || "/"}>
      <Text
        flex={1}
        padding="1rem"
        backgroundColor={pathname === to ? "salmon" : "darkslategray"}
        color={pathname === to ? "darkslategray" : "salmon"}
        fontWeight="bold"
        borderTopRadius="1rem"
      >
        {label}
        {counter && (
          <Box as="span" ml="0.5rem" fontSize="0.8rem">
            ({counter})
          </Box>
        )}
      </Text>
    </Link>
  );
};

export default LinkMenu;

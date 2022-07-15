import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ILinkMenu {
  label?: string;
  to?: string;
  counter?: any;
}

const LinkMenu = ({ label, to, counter, ...rest }: ILinkMenu) => {
  const { pathname } = useRouter();
  return (
    <Link href={to || "/"}>
      <Text
        {...rest}
        flex={1}
        padding="1rem"
        backgroundColor="gray.800"
        color={pathname === to ? "salmon" : "gray.300"}
        cursor="pointer"
        fontWeight="medium"
      >
        {label}
        {counter > 0 && (
          <Box as="span" ml="0.5rem" fontSize="0.8rem">
            ({counter})
          </Box>
        )}
      </Text>
    </Link>
  );
};

export default LinkMenu;

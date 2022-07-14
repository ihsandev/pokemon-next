import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiArrowLeftCircle } from "react-icons/fi";

interface IHeader {
  hasBack?: boolean;
}

const Header = ({ hasBack }: IHeader) => {
  const { back } = useRouter();
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={99}
      backgroundColor="transparent"
    >
      <Flex>
        {hasBack && (
          <Box p="0.5rem" cursor="pointer" onClick={() => back()}>
            <FiArrowLeftCircle size={40} color="white" />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Header;

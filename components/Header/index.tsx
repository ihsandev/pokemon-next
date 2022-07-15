import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiArrowLeftCircle } from "react-icons/fi";

interface IHeader {
  backTo?: string;
}

const Header = ({ backTo }: IHeader) => {
  const { push } = useRouter();
  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      maxW={576}
      margin="0 auto"
      zIndex={99}
      backgroundColor="transparent"
    >
      <Flex>
        {backTo && (
          <Box
            ml="1rem"
            p="0.5rem"
            cursor="pointer"
            onClick={() => push(backTo)}
          >
            <FiArrowLeftCircle size={40} color="white" />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Header;

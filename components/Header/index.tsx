import {
  Badge,
  Box,
  Button,
  Flex,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiArrowLeftCircle, FiFilter, FiMinimize2 } from "react-icons/fi";
import useAppContext from "../../contexts";
import Filter from "../../containers/Filter";

interface IHeader {
  backTo?: string;
}

const Header = ({ backTo }: IHeader) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push } = useRouter();
  const { state }: any = useAppContext();
  const countFilter = [...state.generations, ...state.types]?.length;
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
      backgroundColor={backTo ? "transparent" : "white"}
    >
      <Flex justifyContent={!backTo ? "flex-end" : "flex-start"}>
        {backTo ? (
          <Box
            ml="1rem"
            p="0.5rem"
            cursor="pointer"
            onClick={() => push(backTo)}
          >
            <FiArrowLeftCircle size={40} color="white" />
          </Box>
        ) : (
          <>
            <Tooltip hasArrow label="Compare">
              <Box cursor="pointer" padding="0.7rem">
                <FiMinimize2 size={25} />
              </Box>
            </Tooltip>
            <Tooltip hasArrow label="Filter">
              <Box
                cursor="pointer"
                onClick={onOpen}
                position="relative"
                padding="0.7rem"
              >
                {countFilter > 0 && (
                  <Badge
                    colorScheme="yellow"
                    position="absolute"
                    top={1}
                    fontSize={12}
                    right={1}
                  >
                    {countFilter}
                  </Badge>
                )}
                <FiFilter size={25} />
              </Box>
            </Tooltip>
            {isOpen && <Filter isOpen={isOpen} onClose={onClose} />}
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;

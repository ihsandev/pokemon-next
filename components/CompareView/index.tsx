import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiArrowRight } from "react-icons/fi";
import useAppContext from "../../contexts";
import { baseImageUrl } from "../../utils";

const CompareView = () => {
  const { state } = useAppContext();
  const { push } = useRouter();
  return (
    <Flex
      py="1rem"
      px="2rem"
      alignItems="center"
      bg="white"
      rounded="full"
      justifyContent="space-between"
      shadow="md"
      position="fixed"
      bottom="5rem"
      maxW={550}
      left="1rem"
      right="1rem"
      margin="0 auto"
      zIndex={99}
    >
      <Flex alignItems="center">
        {state.compares?.map((item: any, i: number) => (
          <Flex key={i} alignItems="center">
            <Image src={`${baseImageUrl}${item.id}.png`} w={["50px", "70px"]} />
            {i + 1 !== state.compares?.length && (
              <Heading color="gray.500" mx={["1rem", "1.5rem"]}>
                VS
              </Heading>
            )}
          </Flex>
        ))}
      </Flex>
      {state.compares?.length > 1 && (
        <Button
          size={["sm", "md"]}
          colorScheme="yellow"
          rightIcon={<FiArrowRight />}
          onClick={() =>
            push(
              `/compare/${state.compares[0]?.name}&${state.compares[1]?.name}}`
            )
          }
        >
          Compare
        </Button>
      )}
    </Flex>
  );
};

export default CompareView;

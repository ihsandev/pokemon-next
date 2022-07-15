import { Flex, Spinner } from "@chakra-ui/react";

interface ILoading {
  show?: boolean;
}

const Loading = ({ show }: ILoading) => {
  if (!show) return null;
  return (
    <Flex
      position="fixed"
      left={0}
      right={0}
      bottom={0}
      maxW={576}
      margin="0 auto"
      top={0}
      zIndex={998}
      backgroundColor="rgba(255,255,255,0.5)"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        zIndex={999}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;

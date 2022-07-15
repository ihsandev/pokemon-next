import { Flex } from "@chakra-ui/react";
import { LinkMenu } from "../../components";
import useAppContext from "../../contexts";

const Footer = () => {
  const { state } = useAppContext();
  return (
    <Flex
      maxW={576}
      margin="0 auto"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="darkslategray"
      justifyContent="center"
      textAlign="center"
    >
      <LinkMenu
        label="List"
        to="/"
        counter={state?.pokemonList?.species_aggregate?.aggregate?.count}
      />
      <LinkMenu label="My List" to="/my-list" />
    </Flex>
  );
};

export default Footer;

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
      zIndex={99}
      justifyContent="center"
      backgroundColor="black"
      textAlign="center"
    >
      <LinkMenu
        label="List"
        to="/"
        counter={state?.pokemonList?.species_aggregate?.aggregate?.count}
      />
      <LinkMenu
        label="My List"
        to="/my-list"
        counter={state.myPokemons?.length}
      />
    </Flex>
  );
};

export default Footer;

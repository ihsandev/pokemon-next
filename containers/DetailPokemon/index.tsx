import {
  Box,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Caption, Header } from "../../components";
import Layouts from "../../layouts";
import useAction from "./hooks/useAction";

const DetailPokemon = () => {
  const { data, color, loading } = useAction();
  const id = data?.species && data?.species[0]?.id;
  const name = data?.species && data?.species[0]?.name;
  const types = data?.species && data?.species[0]?.pokemons[0]?.types;
  const description = data?.species && data?.species[0]?.description[0]?.text;
  return (
    <Layouts noFooter>
      {!loading ? (
        <Flex
          backgroundColor="white"
          flexDirection="column"
          flex={1}
          minH="100vh"
        >
          <Header hasBack />
          <Box
            backgroundColor={color.transparent}
            borderBottomRadius="3rem"
            minH={400}
            mt={-16}
            flexDirection="column"
            paddingX="3rem"
          >
            <Flex justifyContent="center" alignItems="center" mt="2rem">
              <Image
                w={250}
                objectFit="contain"
                loading="lazy"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              />
            </Flex>
            <Caption name={name} types={types} />
          </Box>
          <Box pt="1rem" px="2rem">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>About</Tab>
                <Tab>Evolutions</Tab>
                <Tab>Base Stats</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Heading size="md" mb="0.5rem">
                    Description
                  </Heading>
                  <p>{description}</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      ) : (
        <Box>Loading....</Box>
      )}
    </Layouts>
  );
};

export default DetailPokemon;

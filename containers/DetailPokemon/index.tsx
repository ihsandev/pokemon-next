import {
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  About,
  BaseStats,
  Caption,
  Evolutions,
  Header,
  Seo,
} from "../../components";
import Layouts from "../../layouts";
import { baseImageUrl } from "../../utils";
import useAction from "./hooks/useAction";

const DetailPokemon = () => {
  const { pathname } = useRouter();
  const { data, color, loading } = useAction();
  const species = data?.species && data?.species[0];

  return (
    <Layouts noFooter>
      <Seo title={species?.name} description={species?.description[0]?.text} />
      {!loading && (
        <Flex
          backgroundColor="white"
          flexDirection="column"
          flex={1}
          minH="100vh"
        >
          <Header backTo={pathname === "/my-list/[name]" ? "/my-list" : "/"} />
          <Box
            backgroundColor={color.transparent}
            borderBottomRadius="3rem"
            minH={400}
            flexDirection="column"
            paddingX="4rem"
          >
            <Flex justifyContent="center" alignItems="center" mt="2rem">
              <Image
                w={250}
                objectFit="contain"
                loading="lazy"
                src={`${baseImageUrl}${species?.id}.png`}
              />
            </Flex>
            <Caption name={species?.name} types={species?.pokemons[0]?.types} />
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
                  <About
                    description={species?.description[0]?.text}
                    pokemons={species?.pokemons[0]}
                    genderRate={species?.gender_rate}
                    hatchCounter={species?.hatch_counter}
                  />
                </TabPanel>
                <TabPanel>
                  <Evolutions evolutions={species?.evolutions} />
                </TabPanel>
                <TabPanel>
                  <BaseStats
                    stats={species?.pokemons[0]?.stats}
                    color={color}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      )}
    </Layouts>
  );
};

export default DetailPokemon;

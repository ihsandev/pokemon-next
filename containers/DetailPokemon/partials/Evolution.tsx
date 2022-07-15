import { Box, Flex } from "@chakra-ui/react";
import { Card } from "../../../components";
import { baseImageUrl } from "../../../utils";
import { FiArrowDown } from "react-icons/fi";
import { useRouter } from "next/router";

const Evolutions = ({ evolutions }: any) => {
  const { push, query } = useRouter();
  return (
    <>
      {evolutions &&
        evolutions?.species?.map((item: any, i: number) => (
          <Box key={i}>
            <Card
              name={item.name}
              image={`${baseImageUrl}${item.id}.png`}
              onClick={
                item.name !== query.name
                  ? () => push(`/detail/${item.name}`)
                  : null
              }
            />
            {evolutions?.species?.length !== i + 1 && (
              <Flex my="0.5rem" justifyContent="center">
                <FiArrowDown size={30} />
              </Flex>
            )}
          </Box>
        ))}
    </>
  );
};

export default Evolutions;

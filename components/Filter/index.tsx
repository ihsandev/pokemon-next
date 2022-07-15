import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import useAction from "./hooks/useAction";

const Filter = ({ isOpen, onClose }: any) => {
  const { generations, types, handleFilterCheck, handleFilterSubmit, state } =
    useAction();
  if (!isOpen) return null;
  const renderCheckBox = (data: any = []) => {
    return (
      data &&
      data.map((item: any, i: number) => {
        if (item.name !== "unknown") {
          return (
            <Checkbox key={i} value={item.name}>
              {item.name}
            </Checkbox>
          );
        }
      })
    );
  };
  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bgColor="whiteAlpha.700" />
        <DrawerContent w={576} margin="0 auto" boxShadow="none">
          <DrawerBody paddingY={16}>
            <Heading fontSize="2xl">Filter By Types</Heading>
            <Box mt="1rem">
              <CheckboxGroup
                colorScheme="yellow"
                size="lg"
                onChange={(value) => handleFilterCheck(value, "types")}
                defaultValue={state.types}
              >
                <Grid gridTemplateColumns={["1fr 1fr", "1fr 1fr 1fr 1fr"]}>
                  {renderCheckBox(types.data?.types)}
                  {types.loading && <Spinner size="md" />}
                </Grid>
              </CheckboxGroup>
            </Box>
            <Heading mt="1.5rem" fontSize="2xl">
              Filter By Generations
            </Heading>
            <Box mt="1rem">
              <CheckboxGroup
                colorScheme="yellow"
                size="lg"
                onChange={(value) => handleFilterCheck(value, "generations")}
                defaultValue={state.generations}
              >
                <Grid gridTemplateColumns={["1fr 1fr", "1fr 1fr 1fr"]}>
                  {renderCheckBox(generations.data?.generations)}
                  {generations.loading && <Spinner size="md" />}
                </Grid>
              </CheckboxGroup>
            </Box>
            <Box mt="1.5rem">
              <Button
                w="100%"
                colorScheme="yellow"
                onClick={() => {
                  handleFilterSubmit();
                  onClose();
                }}
              >
                Apply
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filter;

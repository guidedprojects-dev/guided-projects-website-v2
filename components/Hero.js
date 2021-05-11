import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column", md: "row" }}
      bgGradient={"linear(to-br, dark.600, dark.900)"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text as={"span"} position={"relative"} color={"white"}>
              Build.{" "}
              <Text as={"span"} position={"relative"} color={"primary.300"}>
                Learn.
              </Text>{" "}
              Become.
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"white"}>
            Guided Projects offers a new challenging way to help you improve
            your software development skills. Build out applications from
            scratch with the guidance of a professional software engineer.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              bgGradient={"linear(to-r, primary.300, primary.500)"}
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, primary.400, primary.600)",
              }}
            >
              Create an Account
            </Button>
            <Button>View Projects</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex
        flex={1}
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Box
          position={"relative"}
          height={"300px"}
          rounded={"2xl"}
          boxShadow={"2xl"}
          overflow={"hidden"}
        >
          <Image
            alt={"Dude Coding"}
            objectFit={"cover"}
            align={"center"}
            src={"/hero-image.jpeg"}
            // w={"80%"}
            h={"100%"}
          />
        </Box>
      </Flex>
    </Stack>
  );
}

import Head from "next/head";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack
      minH={"100vh"}
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
            your software development skills.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              bgGradient={"linear(to-r, primary.300, primary.500)"}
              color={"white"}
              _hover={{ bgGradient: "linear(to-r, primary.400, primary.600)" }}
            >
              Create an Account
            </Button>
            <Button rounded={"full"}>View Projects</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Dude Coding"}
          objectFit={"cover"}
          src={"/hero-image.jpeg"}
        />
      </Flex>
    </Stack>
  );
}

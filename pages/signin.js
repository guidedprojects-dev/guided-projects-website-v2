import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { GithubIcon } from "../components/Icons";

export default function SimpleCard() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(`session`, session);

    if (session) {
      router.push("/settings");
    }
  }, [session]);

  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "dark.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack
              pb={4}
              mb={4}
              borderBottomColor={useColorModeValue("gray.200", "gray.50")}
              borderBottomWidth={1}
            >
              <Button
                color="white"
                bgColor={"gray.700"}
                _hover={{
                  bg: "gray.800",
                }}
                leftIcon={<GithubIcon />}
                onClick={() => signIn("github")}
              >
                Sign in with GitHub
              </Button>
            </Stack>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"dark.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"primary.400"}
                  color={"white"}
                  _hover={{
                    bg: "primary.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

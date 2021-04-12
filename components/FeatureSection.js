import { Box, Grid, Container, Heading, Image, Text } from "@chakra-ui/react";

function FeatureSection() {
  return (
    <Container maxW={"container.xl"} centerContent p={20} colorScheme="primary">
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <Box w="100%">
          <Image src="web-development.svg" h={205} />
          <Box p={4} centerContent>
            <Heading as="h2" size="md" mb={4} align="center">
              Create Projects from Scratch
            </Heading>
            <Text align="center">
              Guided Projects offers professionaly crafted project outlines to
              simulate a work-like environment. Start with a design and a set of
              user stories and try to build out an application from scratch.
            </Text>
          </Box>
        </Box>
        <Box w="100%" centerContent p={4}>
          <Image src="pair-program.svg" h={205} />
          <Box p={4} centerContent>
            <Heading as="h2" size="md" mb={4} align="center">
              Receive Professional Code Reviews
            </Heading>
            <Text align="center">
              After each phase of your project, submit your code for review from
              a professional software engineer who will work to coach you into
              using industry best practices.
            </Text>
          </Box>
        </Box>
        <Box w="100%">
          <Image src="portfolio.svg" h={205} />
          <Box p={4} centerContent>
            <Heading as="h2" size="md" mb={4} align="center">
              Add Projects to Your Portfolio
            </Heading>
            <Text align="center">
              At the end of the project, you will have an original application
              created by you that you can add to your portfolio. Every line of
              code you wrote will be your own.
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default FeatureSection;

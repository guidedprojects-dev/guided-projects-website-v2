import React from "react";
import {
  Avatar,
  Button,
  Image,
  Flex,
  Heading,
  Text,
  Box,
  Stack,
  Container,
} from "@chakra-ui/react";
import axios from "../../utils/axiosInstance";
import { useSession, getSession } from "next-auth/client";
import { getClient } from "../../lib/sanity.server";
import { urlForImage } from "../../lib/sanity";
import { projectQuery, getProjectSlugsQuery } from "../../lib/queries";
import formatPrice from "../../lib/formatPrice";
import renderToString from "next-mdx-remote/render-to-string";
import Navbar from "../../components/Navbar";
import ProjectPhases from "../../components/ProjectPhases";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function ProjectPage(props) {
  const {
    projectData: {
      _id,
      title,
      description,
      author,
      mainImage,
      phases,
      price,
      slug,
    },
  } = props;

  const [session, loading] = useSession();

  async function handleBuyNowClicked() {
    const userSession = await getSession();
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/checkout-session", {
      projectId: slug.current,
      returnTo: window.location.href,
    });

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  return (
    <>
      <Navbar />
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 20 }}
        direction={{ base: "column", md: "row" }}
        bgGradient={"linear(to-br, blue.700, blue.900)"}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW="lg">
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              color="white"
            >
              {title}
            </Heading>
            <Text color="white" fontSize="lg">
              {description}
            </Text>
          </Stack>
        </Flex>
        <Flex
          flex={1}
          justiry={"center"}
          align="center"
          position="relative"
          w="full"
        >
          <Box
            backgroundColor="gray.100"
            rounded="lg"
            overflow="hidden"
            width="400px"
          >
            <Box position="relative" boxShadow="2xl" overflow="hidden">
              <Image
                src={urlForImage(mainImage).url()}
                alt={title}
                objectFit="cover"
                align="center"
              />
            </Box>
            <Box p={4}>
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                {formatPrice(price)}
              </Text>
              <Text mb={4}>
                Get professional code reviews and guidance for the entire
                project!
              </Text>
              <Button
                colorScheme="red"
                w="100%"
                py={6}
                onClick={handleBuyNowClicked}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Flex>
      </Stack>
      <Container maxW={"container.xl"} py={8}>
        <Heading as="h2" fontSize="2xl" mb={2}>
          Project Phases
        </Heading>
        <ProjectPhases phases={phases} />
      </Container>
    </>
  );
}

// Prerender all of the project pages, since there aren't many of them.
export async function getStaticPaths() {
  const projectSlugs = await getClient(false).fetch(getProjectSlugsQuery());

  return {
    paths: projectSlugs.map((s) => ({ params: { slug: s.slug.current } })),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const projectData = await getClient(preview).fetch(projectQuery, {
    slug: params.slug,
  });

  const stringifiedPhaseList = [];

  for (let i = 0; i < projectData.phases.length; i++) {
    try {
      const stringifiedPhase = await renderToString(
        projectData.phases[i].content
      );

      stringifiedPhaseList.push(stringifiedPhase);
    } catch (err) {}
  }

  const phaseList = projectData.phases.map((phase, i) => ({
    ...phase,
    content: stringifiedPhaseList[i],
  }));

  return {
    props: {
      preview,
      slug: params.slug,
      projectData: {
        ...projectData,
        phases: phaseList,
      },
    },
  };
}

export default ProjectPage;

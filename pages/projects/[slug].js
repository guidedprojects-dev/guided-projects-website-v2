import React from "react";
import {
  Avatar,
  Image,
  Flex,
  Heading,
  Text,
  Box,
  Stack,
  Container,
} from "@chakra-ui/react";
import { getClient } from "../../lib/sanity.server";
import { urlForImage } from "../../lib/sanity";
import { projectQuery, getProjectSlugsQuery } from "../../lib/queries";
import markdownToHtml from "../../lib/markdownToHtml";
import renderToString from "next-mdx-remote/render-to-string";
import Navbar from "../../components/Navbar";
import ProjectPhases from "../../components/ProjectPhases";

function ProjectPage(props) {
  const {
    projectData: { title, description, author, mainImage, phases },
  } = props;

  return (
    <>
      <Navbar />
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
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
            position="relative"
            height=" 300px"
            rounded="2xl"
            boxShadow="2xl"
            overflow="hidden"
          >
            <Image
              src={urlForImage(mainImage).url()}
              alt={title}
              h="100%"
              objectFit="cover"
              align="center"
            />
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

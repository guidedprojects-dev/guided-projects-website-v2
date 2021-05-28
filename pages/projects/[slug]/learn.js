import React from "react";
import { projectQuery, projectSlugsQuery } from "../../../lib/queries";
import { getClient } from "../../../lib/sanity.server";
import { getSession } from "next-auth/client";
import { connectToDB, getUserProjectByProjectSlug } from "../../../database";
import renderToString from "next-mdx-remote/render-to-string";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";

import ProjectPhases from "../../../components/ProjectPhases";
import CodeReviewTable from "../../../components/CodeReviewTable";
import SubmitCodeReviewModal from "../../../components/SubmitCodeReviewModal";

function Learn(props) {
  const {
    projectData: { title, description, tagLine, phases },
    slug,
  } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div>
      <SubmitCodeReviewModal
        isOpen={isOpen}
        onClose={onClose}
        projectName={title}
        phaseTitles={phases.map((phase) => phase.title)}
        projectSlug={slug}
      />
      <Box color="white" bg="dark.700" p={4}>
        <Heading as="h1" fontSize="xl" ml={{ base: 0, md: 20 }}>
          {title}
        </Heading>
      </Box>
      <Container maxW={"container.xl"} p={4}>
        <Heading as="h2" fontSize="2xl" mb={4}>
          Phases
        </Heading>
        <ProjectPhases phases={phases} maxH={"650px"} />

        <Flex>
          <Button
            ml={{ base: 0, sm: "auto" }}
            mt={8}
            w={{ base: "100%", sm: "auto" }}
            color="white"
            bgColor={"gray.700"}
            _hover={{
              bg: "gray.800",
            }}
            onClick={onOpen}
          >
            Submit Review
          </Button>
        </Flex>

        <Tabs mt={8}>
          <TabList>
            <Tab>Code Reviews</Tab>
            <Tab>Comments</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={4}>
              <CodeReviewTable />
            </TabPanel>
            <TabPanel>Comments</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
  params,
  preview = false,
}) {
  const session = await getSession({ req });
  const { db } = await connectToDB();
  const projectData = await getClient(preview).fetch(projectQuery, {
    slug: params.slug,
  });

  // Redirect the user to the project list since the project they are trying to react doesn't exist
  if (!projectData) {
    res.setHeader("location", "/projects");
    res.statusCode = 302;
    res.end();
    // Return empty props here because next-js still expects props to be returned even if we are redirecting
    return { props: {} };
  }

  // Redirect the user to the project purchase page if they don't have a session, and the project exists
  if (!session) {
    res.setHeader("location", `/projects/${params.slug}`);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const userProject = await getUserProjectByProjectSlug(
    db,
    session.user.userId,
    params.slug
  );

  // If the user doesn't own the project, redirect them to the project purchase page.
  if (!userProject) {
    res.setHeader("location", `/projects/${params.slug}`);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const stringifiedPhaseList = [];

  for (let i = 0; i < projectData.phases.length; i++) {
    try {
      const stringifiedPhase = await renderToString(
        projectData.phases[i].content
      );

      stringifiedPhaseList.push(stringifiedPhase);
    } catch (error) {}
  }

  const phaseList = projectData.phases.map((phase, i) => ({
    ...phase,
    content: stringifiedPhaseList[i],
  }));

  return {
    props: {
      preview,
      projectData: {
        ...projectData,
        phases: phaseList,
      },
      slug: params.slug,
    },
  };
}

export default Learn;

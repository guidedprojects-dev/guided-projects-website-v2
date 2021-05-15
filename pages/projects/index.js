import React from "react";
import { getClient } from "../../lib/sanity.server";
import { projectSummaryListQuery } from "../../lib/queries";
import { Container, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import ProjectLIstItem from "../../components/ProjectListItem";

function ProjectList(props) {
  const { preview, projects } = props;

  console.log(`projects`, projects);

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" p={8}>
        <Heading as="h1" size="lg" mb={8}>
          Projects
        </Heading>
        <Alert status="info" variant="left-accent" mb={4} borderRadius="sm">
          <AlertIcon />
          All of our courses have a 30 day money back guarentee for any reason!
        </Alert>
        {projects.map((project) => (
          <ProjectLIstItem
            key={project._id}
            slug={project.slug.current}
            image={project.mainImage}
            author={project.author}
            title={project.title}
            tagLine={project.tagLine}
            price={project.price}
          />
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const projects = await getClient(preview).fetch(projectSummaryListQuery);

  return {
    props: {
      preview,
      projects,
    },
  };
}

export default ProjectList;

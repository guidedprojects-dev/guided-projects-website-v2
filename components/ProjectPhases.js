import React, { useState } from "react";
import hydrate from "next-mdx-remote/hydrate";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Header,
  Heading,
  Flex,
} from "@chakra-ui/react";
import "github-markdown-css";

function ProjectPhases(props) {
  const { phases = [] } = props;
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);

  const phaseTitles = phases.map((phase) => phase.title);

  return (
    <Flex
      flex={1}
      align={"top"}
      justify={"top"}
      w="100%"
      border={"1px"}
      borderColor="gray.100"
      borderRadius={4}
      overflow="hidden"
    >
      <Box p={4} backgroundColor="gray.100" maxW="250px">
        {phaseTitles.map((title, index) => (
          <Button
            p={4}
            variant="link"
            colorScheme="blue"
            display="block"
            key={`phase-button-${title}`}
            onClick={() => setSelectedPhaseIndex(index)}
          >
            {title}
          </Button>
        ))}
      </Box>
      <Box p={4} className="markdown-body">
        {hydrate(phases[selectedPhaseIndex].content)}
      </Box>
    </Flex>
  );
}

export default ProjectPhases;

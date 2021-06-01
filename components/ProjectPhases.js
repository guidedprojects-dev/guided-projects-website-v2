import React, { useState } from "react";
import hydrate from "next-mdx-remote/hydrate";
import { Box, Button, Flex } from "@chakra-ui/react";
import "github-markdown-css";

function ProjectPhases(props) {
  const { phases = [], maxH } = props;
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);

  const phaseTitles = phases.map((phase) => phase.title);

  return (
    <Flex
      align={"top"}
      justify={"top"}
      w="100%"
      h={maxH}
      border={"1px"}
      borderColor="gray.100"
      borderRadius={4}
    >
      <Box
        p={4}
        backgroundColor="gray.100"
        w={{ base: "auto", md: "250px" }}
        overflow="auto"
      >
        {phaseTitles.map((title, index) => (
          <React.Fragment key={`phase-button-${title}`}>
            <Button
              p={4}
              variant="link"
              colorScheme="blue"
              display={{ base: "none", md: "block" }}
              onClick={() => setSelectedPhaseIndex(index)}
            >
              {title}
            </Button>
            <Button
              p={4}
              variant="link"
              colorScheme="blue"
              display={{ base: "block", md: "none" }}
              onClick={() => setSelectedPhaseIndex(index)}
            >
              {index + 1}
            </Button>
          </React.Fragment>
        ))}
      </Box>
      <Box flex={1} p={4} className="markdown-body" overflow="scroll">
        {hydrate(phases[selectedPhaseIndex].content)}
      </Box>
    </Flex>
  );
}

export default ProjectPhases;

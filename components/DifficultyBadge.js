import React from "react";
import { Badge } from "@chakra-ui/react";

const levelMap = {
  1: { title: "beginner", color: "blue" },
  2: { title: "intermediate", color: "green" },
  3: { title: "advanced", color: "purple" },
};

function DifficultyBadge(props) {
  const { level } = props;

  return (
    <Badge colorScheme={levelMap[level].color}>{levelMap[level].title}</Badge>
  );
}

export default DifficultyBadge;

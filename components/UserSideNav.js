import React from "react";
import {
  Flex,
  Box,
  VStack,
  Button,
  IconButton,
  Tooltip,
  Spacer,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { VscOpenPreview } from "react-icons/vsc";

function UserSideNav() {
  return (
    <Flex
      flex={1}
      left={0}
      h="100%"
      position="fixed"
      top={"60px"}
      p={3}
      direction="column"
      color="gray.800"
      bg="dark.500"
    >
      <Box>
        {SIDE_NAV_ITEMS.map((navItem) => (
          <Tooltip
            hasArrow
            label={navItem.label}
            bg="gray.800"
            color="white"
            placement="right"
          >
            <IconButton fontSize="2xl" icon={<navItem.Icon />} />
          </Tooltip>
        ))}
      </Box>
      <Tooltip
        label="Expand"
        bg="gray.800"
        hasArrow
        placement="right"
        color="white"
      >
        <IconButton
          rounded={"full"}
          mt={10}
          size="sm"
          icon={<ArrowRightIcon />}
        />
      </Tooltip>
    </Flex>
  );
}

const SIDE_NAV_ITEMS = [
  {
    label: "Reviews",
    href: "/user/reviews",
    Icon: VscOpenPreview,
  },
];

export default UserSideNav;

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Flex, Box, Spacer, Image, Text } from "@chakra-ui/react";
import { urlForImage } from "../lib/sanity";
import DifficultyBadge from "./DifficultyBadge";
import formatPrice from "../lib/formatPrice";

function ProjectListItem(props) {
  const { image, title, description, slug, price } = props;

  return (
    <Flex
      w="100%"
      direction={["column", "column", "row", "row"]}
      backgroundColor={"gray.50"}
      boxShadow="md"
      borderRadius="md"
      overflow="hidden"
      _hover={{ cursor: "pointer" }}
    >
      <Box w={["100%", "100%", "30%", "30%"]}>
        <Image src={urlForImage(image).url()} />
      </Box>

      <Flex flex={1} p={4} direction={["column", "column", "row", "row"]}>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            <Link href={`/projects/${slug}`}>{title}</Link>
          </Text>
          <Text fontSize="md" mb={8}>
            {description}
          </Text>
        </Box>
        <Spacer />
        <Flex
          direction={["row", "row", "column", "column"]}
          h={"100%"}
          align={"flex-end"}
        >
          <Text fontSize="md" fontWeight="bold">
            {formatPrice(price)}
          </Text>
          <Spacer />
          <Box>
            <DifficultyBadge title="intermediate" level={2} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

ProjectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProjectListItem;

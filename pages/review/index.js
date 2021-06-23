import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import CodeReviewTable from "../../components/CodeReviewTable";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";

import { fetchCodeReviews } from "../../utils/api";

import {
  ADMIN_ROLE,
  REVIEW_STATUS_AVAILABLE,
  REVIEW_STATUS_IN_PROGRESS,
  REVIEW_STATUS_COMPLETED,
} from "../../utils/constants";

const PAGE_SIZE = 10;

function ReviewList() {
  const [reviewStatusFilter, setReviewStatusFilter] = useState(
    REVIEW_STATUS_AVAILABLE
  );
  const [codeReviews, setCodeReviews] = useState([]);
  const [sortDir, setSortDir] = useState(-1);
  const [sortField, setSortField] = useState("submittedAt");
  const [isLoading, setIsLoading] = useState(true);

  const { currentPage, updatePage, totalItems, setTotalItems, from } =
    usePagination({ size: PAGE_SIZE });

  useEffect(() => {
    fetchCodeReviews({
      route: "api/admin/code-review",
      from,
      size: PAGE_SIZE,
      status: reviewStatusFilter,
      sortDir,
      sortField,
    }).then((response) => {
      setCodeReviews(response.codeReviews);
      setTotalItems(response.total);
      setIsLoading(false);
    });
  }, [from, reviewStatusFilter, sortDir, sortField]);

  function getStatusSelectVariant(buttonVariant) {
    return reviewStatusFilter === buttonVariant ? "solid" : "outline";
  }

  return (
    <Container maxWidth="container.xl">
      <Heading as="h1" text="2xl" mt={8} mb={12}>
        Code Reviews
      </Heading>
      <Box backgroundColor="white" p={4} borderRadius="xl" boxShadow="lg">
        <Flex w="100%" mb={4}>
          <HStack spacing={2} ml="auto">
            <Button
              size="sm"
              colorScheme="dark"
              variant={getStatusSelectVariant(REVIEW_STATUS_AVAILABLE)}
              onClick={() => setReviewStatusFilter(REVIEW_STATUS_AVAILABLE)}
            >
              Available
            </Button>
            <Button
              size="sm"
              colorScheme="dark"
              variant={getStatusSelectVariant(REVIEW_STATUS_IN_PROGRESS)}
              onClick={() => setReviewStatusFilter(REVIEW_STATUS_IN_PROGRESS)}
            >
              In Progress
            </Button>
            <Button
              size="sm"
              colorScheme="dark"
              variant={getStatusSelectVariant(REVIEW_STATUS_COMPLETED)}
              onClick={() => setReviewStatusFilter(REVIEW_STATUS_COMPLETED)}
            >
              Completed
            </Button>
          </HStack>
        </Flex>

        <CodeReviewTable
          apiRoute={"/api/admin/code-review"}
          codeReviews={codeReviews}
          showProject
        />
        <Box w="100%" textAlign="center" p={4} mt={4}>
          <Pagination
            currentPage={currentPage}
            updateCurrentPage={updatePage}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
          />
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  // Redirect non admin users back to the home page since they don't belong here.
  if (!session || !session?.user?.role === ADMIN_ROLE) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  return { props: {} };
}

export default ReviewList;

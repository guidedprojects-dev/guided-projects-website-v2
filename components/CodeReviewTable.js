import React from "react";
import PropTypes from "prop-types";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ReviewStatusBadge from "./ReviewStatusBadge";

function CodeReviewTable(props) {
  const { codeReviews, showProject, emptyMessage = "No Reviews" } = props;

  return (
    <Box maxW="100%" overflow="scroll">
      <Table>
        <Thead>
          <Tr>
            {showProject && <Th>Project</Th>}
            <Th>Phase</Th>
            <Th>Date Submitted</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {codeReviews.map((review) => (
            <Tr key={review._id}>
              {showProject && <Td>{review.projectSlug}</Td>}
              <Td>{review.phase}</Td>
              <Td>{review.submittedAt}</Td>
              <Td>
                <ReviewStatusBadge status={review.status} />
              </Td>
            </Tr>
          ))}
          {codeReviews.length === 0 && (
            <Tr>
              {/* Use a large number for the colspan since columns can be dynamic based on the table configuration */}
              <Td colSpan={100}>
                <Box p={4} textAlign="center">
                  {emptyMessage}
                </Box>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

CodeReviewTable.propTypes = {};

CodeReviewTable.propTypes = {
  codeReviews: PropTypes.arrayOf(
    PropTypes.shape({
      phase: PropTypes.string,
      submittedAt: PropTypes.string,
      status: PropTypes.number,
    })
  ),
  emptyMessage: PropTypes.string,
};

export default CodeReviewTable;

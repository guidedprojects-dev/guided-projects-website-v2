import React from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Container,
} from "@chakra-ui/react";

import ReviewStatusBadge from "./ReviewStatusBadge";

function CodeReviewTable(props) {
  const { codeReviews = [] } = props;

  return (
    <Box maxW="100%" overflow="scroll">
      <Table>
        <Thead>
          <Tr>
            <Th>Phase</Th>
            <Th>Date Submitted</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {codeReviews.map((review) => (
            <Tr>
              <Td>{review.phase}</Td>
              <Td>{review.submittedAt}</Td>
              <Td>
                <ReviewStatusBadge status={review.status} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

CodeReviewTable.propTypes = {
  codeReviews: PropTypes.arrayOf(
    PropTypes.shape({
      phase: PropTypes.string,
      submittedAt: PropTypes.string,
      status: PropTypes.number,
    })
  ),
};

export default CodeReviewTable;

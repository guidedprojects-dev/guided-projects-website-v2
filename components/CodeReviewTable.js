import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import ReviewStatusBadge from "./ReviewStatusBadge";
import parseDate from "../utils/parseDate";

import { SORT_DESC, SORT_ASC } from "../utils/constants";

function CodeReviewTable(props) {
  const {
    codeReviews,
    showProject,
    showSubmittedBy,
    emptyMessage = "No Reviews",
    sortDir,
    sortField,
    onSort,
    onRowClicked,
    isLoading,
  } = props;

  /**
   * Handler function for sorting a table row.
   * @param {strgin} fieldId The id of the column to sort on
   */
  function handleSortClicked(fieldId) {
    let newSortField = sortField;
    let newSortDir;

    if (fieldId === sortField) {
      newSortDir = sortDir === SORT_DESC ? SORT_ASC : SORT_DESC;
    } else {
      newSortField = fieldId;
      newSortDir = SORT_DESC;
    }

    onSort && onSort(newSortField, newSortDir);
  }

  /**
   * Helper function to check if and how a table column is sorted, and return the proper arrow icon.
   * @param {string} fieldId The id of the column to check sort values for
   * @returns {React.Component}
   */
  function getColumnSortArrows(fieldId) {
    let sortIcon;

    if (fieldId === sortField) {
      if (sortDir === SORT_DESC) {
        sortIcon = <TriangleDownIcon aria-label="sorted descending" ml={2} />;
      } else {
        sortIcon = <TriangleUpIcon aria-label="sorted ascending" ml={2} />;
      }
    }

    return sortIcon;
  }

  return (
    <Box maxW="100%" overflow="scroll">
      <Table>
        <Thead>
          <Tr>
            {showSubmittedBy && <Th>User</Th>}
            {showProject && <Th>Project</Th>}
            <Th>Phase</Th>
            <Th
              style={{ cursor: "pointer" }}
              onClick={() => handleSortClicked("submittedAt")}
            >
              Date Submitted{getColumnSortArrows("submittedAt")}
            </Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              {showSubmittedBy && (
                <Td>
                  <HStack>
                    <SkeletonCircle /> <SkeletonText noOfLines={2} />
                  </HStack>
                </Td>
              )}
              {showProject && (
                <Td>
                  <SkeletonText noOfLines={2} />
                </Td>
              )}
              <Td>
                <SkeletonText noOfLines={2} />
              </Td>
              <Td>
                <SkeletonText noOfLines={2} />
              </Td>
              <Td>
                <SkeletonText noOfLines={2} />
              </Td>
            </Tr>
          ) : (
            <React.Fragment>
              {codeReviews.map((review) => (
                <Tr
                  key={review._id}
                  onClick={() => onRowClicked && onRowClicked(review)}
                  _hover={{
                    cursor: onRowClicked ? "pointer" : "auto",
                    bg: onRowClicked && "dark.50",
                  }}
                >
                  {showSubmittedBy && (
                    <Td>
                      <HStack>
                        <Avatar
                          name={review.user.name}
                          src={review.user.image}
                          size="sm"
                        />
                        <Text textColor={"gray.600"}>{review.user.name}</Text>
                      </HStack>
                    </Td>
                  )}
                  {showProject && <Td>{review.projectSlug}</Td>}
                  <Td>{review.phase}</Td>
                  <Td>{parseDate(review.submittedAt)}</Td>
                  <Td>
                    <ReviewStatusBadge status={review.status} />
                  </Td>
                </Tr>
              ))}
              {codeReviews.length === 0 && (
                <Tr>
                  {/* Use a large number for the colspan since columns can be dynamic based on the table configuration */}
                  <Td colSpan={100}>
                    <Box p={2} textAlign="center">
                      {emptyMessage}
                    </Box>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
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
  sortDir: PropTypes.string,
  sortField: PropTypes.string,
  onSort: PropTypes.func,
  onRowClicked: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CodeReviewTable;

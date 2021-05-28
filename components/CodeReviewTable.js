import React from "react";
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

function CodeReviewTable(props) {
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
          <Tr>
            <Td>Phase 1 - Setup</Td>
            <Td>05/20/2021</Td>
            <Td>
              <Badge colorScheme="green">Done</Badge>
            </Td>
          </Tr>
          <Tr>
            <Td>Phase 2 - View Item</Td>
            <Td>05/27/2021</Td>
            <Td>
              <Badge colorScheme="yellow">In Progress</Badge>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default CodeReviewTable;

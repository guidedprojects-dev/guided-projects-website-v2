import React from "react";
import {
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

function CodeReviewTable(props) {
  return (
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
  );
}

export default CodeReviewTable;

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
          <Th>Status</Th>
          <Th>View</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Phase 1 - Setup</Td>
          <Td>
            <Badge colorScheme="green">Done</Badge>
          </Td>
        </Tr>
        <Tr>
          <Td>Phase 1 - Setup</Td>
          <Td>
            <Badge colorScheme="yellow">In Progress</Badge>
          </Td>
          <Td>
            <Button>View</Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default CodeReviewTable;

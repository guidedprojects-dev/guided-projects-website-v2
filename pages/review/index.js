import React from "react";
import { getSession } from "next-auth/client";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { ADMIN_ROLE } from "../../utils/constants";

function ReviewList() {
  return (
    <Container maxWidth="container.xl">
      <Tabs>
        <TabList>
          <Tab>Available Code Reviews</Tab>
          <Tab>Your In Progress Reviews</Tab>
          <Tab>Your Completed Reviews</Tab>
        </TabList>
        <TabPanels></TabPanels>
      </Tabs>
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

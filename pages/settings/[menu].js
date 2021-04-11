import React from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  GridItem,
  Flex,
  Stack,
  Text,
  Link,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';

import Account from '../../components/settings/Account';
import Security from '../../components/settings/Security';
import Navbar from '../../components/Navbar';

const LoadView = (menu) => {
  switch (menu) {
    case 'account': {
      return <Account />;
    }
    case 'security': {
      return <Security />;
    }
    default:
      return null;
  }
};

const ButtonLink = (props) => {
  const { children } = props;

  return (
    <Link
      align="center"
      bgGradient={'linear(to-r, primary.300, primary.500)'}
      fontWeight="bold"
      borderRadius="md"
      p="2"
      color="white"
      _hover={{
        color: 'white',
        bgGradient: 'linear(to-r, primary.400, primary.600)',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default function Settings() {
  const router = useRouter();
  const { menu } = router.query;

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1">
        <Grid minW="100%" templateColumns="repeat(10, 1fr)">
          <GridItem
            bgGradient={'linear(to-br, dark.600, dark.900)'}
            colSpan={{ base: 10, md: 2 }}
          >
            {/* Menu Sidebar*/}
            <Stack py={8} px={20}>
              {/* Should make ActiveLink component */}
              <ButtonLink href="account">Account</ButtonLink>
              <ButtonLink href="security">Security</ButtonLink>
            </Stack>
          </GridItem>
          {/* Inputs Main */}
          {/* Should load in selected menu component here */}
          <GridItem p={8} colSpan={{ base: 10, md: 8 }}>
            {LoadView(menu)}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}

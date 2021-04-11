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

import Navbar from '../../components/Navbar';

const ButtonLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      align="center"
      bgGradient={'linear(to-r, primary.300, primary.500)'}
      fontWeight="bold"
      borderRadius="md"
      p="1"
      color="white"
      _hover={{
        color: 'white',
        bgGradient: 'linear(to-r, primary.400, primary.600)',
      }}
    >
      {children}
    </Link>
  );
};

const Profile = () => {
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
            <Stack p={8}>
              {/* Should make ActiveLink component */}
              <ButtonLink href="account">Account</ButtonLink>
              <ButtonLink href="test">Test</ButtonLink>
            </Stack>
          </GridItem>
          {/* Inputs Main */}
          {/* Should load in selected menu component here */}
          <GridItem colSpan={{ base: 10, md: 8 }}>
            <Stack p={8}>
              <Text>{menu}</Text>
            </Stack>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Profile;

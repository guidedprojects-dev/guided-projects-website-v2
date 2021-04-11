import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

import { Flex, Stack, Heading, Button } from '@chakra-ui/react';

const Signin = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    //    if (session) {
    //      router.push('/app');
    //    }
  });

  return (
    <Flex direction="column" minH={'100vh'}>
      <Navbar />
      <Flex
        flex={1}
        justify="center"
        align="center"
        bgGradient={'linear(to-br, dark.600, dark.900)'}
      >
        <Stack>
          <Heading color="white" mb="40px">
            Login
          </Heading>
          <Button
            color={'white'}
            bgGradient={'linear(to-r, primary.300, primary.500)'}
            _hover={{
              bgGradient: 'linear(to-r, primary.400, primary.600)',
            }}
          >
            Github
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Signin;

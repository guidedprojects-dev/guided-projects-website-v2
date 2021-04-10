import { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Spacer,
} from '@chakra-ui/react';

export default function Navbar() {
  const [display, setDisplay] = useState(false);

  const toggle = () => setDisplay(!display);

  return (
    <Flex as="nav" flex="0" direction={{ base: 'column', md: 'row' }}>
      <Stack
        py="3"
        px="9"
        align="center"
        justify={{ base: 'none', md: 'center' }}
        direction={{ base: 'row' }}
      >
        <LinkBox>
          <Heading fontSize={{ base: '3xl', md: '2xl' }}>
            <LinkOverlay _hover={{ color: 'inherit' }} href="/">
              Guided Projects
            </LinkOverlay>
          </Heading>
        </LinkBox>
        <Spacer />
        <Button
          bg="none"
          display={{ base: 'block', md: 'none' }}
          onClick={toggle}
        >
          HB {/* Replace with hamburger icon */}
        </Button>
      </Stack>
      <Spacer
        m={{ base: display ? '20px' : 0, md: 0 }}
        border={{ base: '1px', md: '0px' }}
        borderColor="gray.200"
      />
      <Stack
        py="3"
        px="9"
        spacing={8}
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        display={{ base: display ? 'flex' : 'none', md: 'flex' }}
      >
        <Link href="/" px="20px" fontSize={{ base: 'lg' }}>
          Home
        </Link>
        <Link href="/signin" px="20px" fontSize={{ base: 'lg' }}>
          Projects
        </Link>
        <Link href="/about" px="20px" fontSize={{ base: 'lg' }}>
          About
        </Link>
        <Button
          bg="primary.300"
          _hover={{ bg: 'primary.400', color: 'white' }}
          color="white"
          lineHeight="12px"
        >
          <Link href="/signin" _hover={{ color: 'inherit' }}>
            Sign up
          </Link>
        </Button>
      </Stack>
    </Flex>
  );
}

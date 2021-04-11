import { useState, useEffect } from 'react';
import { Stack, Button, Text, Heading, Grid, GridItem } from '@chakra-ui/react';
import { PencilIcon } from '@chakra-ui/icons';

const mockAPI = () => {
  return new Promise((res) =>
    res({
      title: 'Fullstack Web Developer',
      interests: ['Frontend', 'Design', 'Javascript'],
      linkedin_url: 'https://www.linkedin.com/in/michael-hoobler-090847174/',
      github_url: '',
    }),
  );
};

export default function Account() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    mockAPI()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, []);

  if (userData.interests) {
    return (
      <Stack>
        <Heading mb="3%">Account</Heading>
        <Grid minW="50%" templateColumns="repeat(10, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <Text as={'span'}>Title: </Text>
          </GridItem>
          <GridItem colSpan={9}>
            <Text as={'span'}>{userData.title}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text as={'span'}>Interests: </Text>
          </GridItem>
          <GridItem colSpan={9}>
            <Text as={'span'}>{userData.interests.join(', ')}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text as={'span'}>Linkedin: </Text>
          </GridItem>
          <GridItem colSpan={9}>
            <Text as={'span'}>{userData.linkedin_url}</Text>
          </GridItem>
        </Grid>
      </Stack>
    );
  }

  return <div>Whoops</div>;
}

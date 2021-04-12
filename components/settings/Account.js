import { useState, useEffect } from 'react';
import {
  Stack,
  Flex,
  Seperator,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Text,
  Heading,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { SettingsIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

export default function Account() {
  const [userData, setUserData] = useState({});
  const [loadForm, setLoadForm] = useState(false);

  useEffect(() => {
    if (!loadForm) {
      mockAPI
        .getUserData()
        .then((res) => setUserData(res))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleLoadForm = () => {
    setLoadForm(!loadForm);
  };

  const handleSubmitEdit = (data) => {
    if (data === null) {
      return setLoadForm(false);
    }
    mockAPI
      .putUserData(data)
      .then((res) => setUserData(data))
      .catch((err) => console.log(err))
      .finally(() => setLoadForm(false));
  };

  if (userData.interests) {
    return (
      <Stack>
        <Flex mb="3%">
          <Heading>Account</Heading>
          <IconButton
            icon={<SettingsIcon />}
            ml="auto"
            bgGradient={'linear(to-r, primary.300, primary.500)'}
            color="white"
            onClick={handleLoadForm}
            _hover={{
              color: 'white',
              bgGradient: 'linear(to-r, primary.400, primary.600)',
            }}
          />
        </Flex>
        {loadForm ? (
          <EditForm data={userData} handleSubmit={handleSubmitEdit} />
        ) : (
          <Grid minW="50%" templateColumns="repeat(10, 1fr)" gap={12}>
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
        )}
      </Stack>
    );
  }

  return <div>Whoops</div>;
}

function EditForm({ data, handleSubmit }) {
  const [editData, setEditData] = useState(data);
  const [interestSearch, setInterestSearch] = useState('');
  const interestSet = new Set(editData.interests);

  const handleChange = ({ name, value }) => {
    if (name === 'interests') {
      return setInterestSearch(value);
    }
    setEditData({ ...editData, [name]: value });
    console.log(editData);
  };

  const handleAddInterest = (str) => {
    interestSet.add(str);
    setEditDate({
      ...editData,
      interests: [...interestSet],
    });
  };

  const handleRemoveInterest = (str) => {
    setEditData({
      ...editData,
      interests: editData.interests.filter((e) => e !== str),
    });
  };

  return (
    <Stack as="form" spacing="12px" maxW={{ base: '100%', md: '50%' }}>
      <FormControl>
        <FormLabel htmlFor="user-title">Title:</FormLabel>
        <Input
          name="title"
          id="user-title"
          defaultValue={editData.title}
          onChange={(evt) => handleChange(evt.currentTarget)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="user-title">Interests:</FormLabel>
        <Flex flexWrap="wrap">
          <Input
            minW="100%"
            name="interests"
            id="user-title"
            value={interestSearch}
            onChange={(evt) => handleChange(evt.currentTarget)}
          />
          {editData.interests.map((e) => (
            <ButtonGroup mr="6px" size="sm" isAttached>
              <Button>{e}</Button>
              <IconButton icon={<CloseIcon />} />
            </ButtonGroup>
          ))}
          {interestSearch === ''
            ? null
            : INTERESTS_VALUES.filter(
                (e) => e.includes(interestSearch) && !interestSet.has(e),
              ).map((e) => (
                <ButtonGroup mr="6px" size="sm" isAttached>
                  <Button>{e}</Button>
                  <IconButton icon={<AddIcon />} />
                </ButtonGroup>
              ))}
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="user-title">Linkedin:</FormLabel>
        <Input
          name="linkedin_url"
          id="user-title"
          value={editData.linkedin_url}
          onChange={(evt) => handleChange(evt.currentTarget)}
        />
      </FormControl>
      <Flex role="group">
        <Button
          mr="12px"
          name="form-submit"
          onClick={() => handleSubmit(editData)}
        >
          Submit
        </Button>
        <Button name="form-cancel" onClick={() => handleSubmit(null)}>
          Cancel
        </Button>
      </Flex>
    </Stack>
  );
}

var mockUserData = {
  title: 'Fullstack Web Developer',
  interests: ['Frontend', 'Design', 'Javascript'],
  linkedin_url: 'https://www.linkedin.com/in/michael-hoobler-090847174/',
};

const mockAPI = {
  getUserData: () => new Promise((res) => res(mockUserData)),
  putUserData: (data) => {
    mockUserData = {
      ...mockUserData,
      ...data,
    };

    return new Promise((res) => res(mockUserData));
  },
};

const INTERESTS_VALUES = [
  'Frontend',
  'Backend',
  'Design',
  'Javascript',
  'Vue',
  'Django',
  'AWS',
  'GCP',
];

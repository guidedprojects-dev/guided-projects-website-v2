import { useState, useEffect, useMemo } from "react";
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
} from "@chakra-ui/react";
import { SettingsIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

export default function Account({ session }) {
  const [userData, setUserData] = useState({});
  const [loadForm, setLoadForm] = useState(false);

  useEffect(() => {
    mockAPI
      .getUserData()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, [session]);

  const handleLoadForm = () => {
    setLoadForm(!loadForm);
  };

  const handleSubmitEdit = (editData) => {
    if (editData === null) {
      return setLoadForm(false);
    }
    mockAPI
      .putUserData(editData)
      .then((res) => setUserData(res))
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
            bgGradient={"linear(to-r, primary.300, primary.500)"}
            color="white"
            onClick={handleLoadForm}
            _hover={{
              color: "white",
              bgGradient: "linear(to-r, primary.400, primary.600)",
            }}
          />
        </Flex>
        {loadForm ? (
          <EditForm data={userData} handleSubmit={handleSubmitEdit} />
        ) : (
          <Grid minW="50%" templateColumns="repeat(10, 1fr)" gap={12}>
            <GridItem colSpan={1}>
              <Text as={"span"}>Title: </Text>
            </GridItem>
            <GridItem colSpan={9}>
              <Text as={"span"}>{userData.title}</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text as={"span"}>Interests: </Text>
            </GridItem>
            <GridItem colSpan={9}>
              <Text as={"span"}>{userData.interests.join(", ")}</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text as={"span"}>Linkedin: </Text>
            </GridItem>
            <GridItem colSpan={9}>
              <Text as={"span"}>{userData.linkedin_url}</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text as={"span"}>Github:</Text>
            </GridItem>
            <GridItem colSpan={9}>
              {session ? (
                <Text as={"span"}>{session.user.github_url}</Text>
              ) : (
                <Button
                  size="sm"
                  bgGradient={"linear(to-r, primary.300, primary.500)"}
                  color="white"
                  _hover={{
                    color: "white",
                    bgGradient: "linear(to-r, primary.400, primary.600)",
                  }}
                >
                  Link your github!
                </Button>
              )}
            </GridItem>
          </Grid>
        )}
      </Stack>
    );
  }

  return (
    <Stack>
      <Flex>
        <Heading>Uh oh, looks like something went wrong</Heading>
      </Flex>
    </Stack>
  );
}

function EditForm({ data, handleSubmit }) {
  const [editData, setEditData] = useState(data);
  const [interestSearch, setInterestSearch] = useState("");
  const interestSet = new Set(editData.interests);

  const handleChange = ({ name, value }) => {
    setEditData({ ...editData, [name]: value });
  };

  const handleAddInterest = (str) => {
    interestSet.add(str);
    setEditData({
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

  const handleInterestSearch = useMemo(() => {
    if (interestSearch === "") {
      return null;
    }
    let resultsArray = INTERESTS_VALUES.filter(
      (e) =>
        e.toLowerCase().includes(interestSearch.toLowerCase()) &&
        !interestSet.has(e)
    );

    return resultsArray.length === 0 ? (
      <Text fontWeight={"bold"}>No results</Text>
    ) : (
      resultsArray.map((e) => {
        return (
          <ButtonGroup key={e} mr="6px" size="sm" isAttached>
            <Button
              bg="blue.300"
              _hover={{
                cursor: "default",
                bgColor: "blue.300",
              }}
            >
              {e}
            </Button>
            <IconButton
              icon={<AddIcon />}
              bg="blue.300"
              _hover={{
                bgColor: "primary.300",
              }}
              onClick={() => {
                handleAddInterest(e);
              }}
            />
          </ButtonGroup>
        );
      })
    );
  }, [interestSearch, editData.interests]);

  return (
    <Stack as="form" spacing="12px" maxW={{ base: "100%", md: "50%" }}>
      <FormControl>
        <FormLabel fontWeight="bold" htmlFor="user-title">
          Title:
        </FormLabel>
        <Input
          name="title"
          id="user-title"
          defaultValue={editData.title}
          onChange={(evt) => handleChange(evt.currentTarget)}
        />
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="bold" htmlFor="user-title">
          Interests:
        </FormLabel>
        <Flex flexWrap="wrap">
          <Input
            minW="100%"
            mb="6px"
            name="interests-search"
            id="user-title"
            value={interestSearch}
            onChange={(evt) => setInterestSearch(evt.currentTarget.value)}
          />
          {/* Currently Selected Interests */}
          {editData.interests.map((e) => (
            <ButtonGroup key={e} mr="6px" size="sm" isAttached>
              <Button
                bg="primary.300"
                _hover={{
                  cursor: "default",
                  bgColor: "primary.300",
                }}
              >
                {e}
              </Button>
              <IconButton
                bg="primary.300"
                icon={<CloseIcon />}
                _hover={{
                  bgColor: "red.300",
                }}
                onClick={() => {
                  handleRemoveInterest(e);
                }}
              />
            </ButtonGroup>
          ))}
          {/* Interest Search Results (not currently selected) */}
          {handleInterestSearch}
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="bold" htmlFor="user-title">
          Linkedin:
        </FormLabel>
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
          bg="blue.400"
          color="white"
          name="form-submit"
          onClick={() => handleSubmit(editData)}
        >
          Submit
        </Button>
        <Button
          name="form-cancel"
          bg="red.400"
          color="white"
          onClick={() => handleSubmit(null)}
        >
          Cancel
        </Button>
      </Flex>
    </Stack>
  );
}

var mockUserData = {
  title: "Fullstack Web Developer",
  interests: ["Frontend", "Design", "Javascript"],
  linkedin_url: "https://www.linkedin.com/in/michael-hoobler-090847174/",
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
  "Frontend",
  "Backend",
  "Design",
  "Javascript",
  "Vue",
  "Django",
  "AWS",
  "GCP",
];

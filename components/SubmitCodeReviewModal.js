import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "../utils/axiosInstance";

function SubmitCodeReviewModal(props) {
  const { isOpen, onClose, projectName, projectSlug, phaseTitles } = props;
  const [selectedPhase, setSelectedPhase] = useState("");
  const [pullRequestUrl, setPullRequestUrl] = useState("");
  const toast = useToast();

  function submitCodeReview(e) {
    e.preventDefault();
    axios
      .post(`/api/user/code-review/${projectSlug}`, {
        phase: selectedPhase,
        pullRequestUrl,
      })
      .then(() => {
        toast({
          title: "Code Reveiw Submitted",
          description: `Your code review for "${selectedPhase}" has successfully been submitted!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data ||
          `Your code review for "${selectedPhase}" has failed to be submitted. Please try again.`;

        toast({
          title: "Code Reveiw Submission Failed",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit {projectName} Code Review</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={submitCodeReview}>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="phase" isRequired>
                <FormLabel>Phase</FormLabel>
                <Select
                  placeholder="select a phase"
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  value={selectedPhase}
                >
                  {phaseTitles.map((phaseTitle) => (
                    <option key={`phase-${phaseTitle}`}>{phaseTitle}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="repo-url" isRequired>
                <FormLabel>Pull Request URL</FormLabel>
                <Input
                  type="url"
                  onChange={(e) => setPullRequestUrl(e.target.value)}
                  value={pullRequestUrl}
                ></Input>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Close
            </Button>
            <Button
              type="submit"
              color="white"
              bgColor={"gray.700"}
              _hover={{
                bg: "gray.800",
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

SubmitCodeReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  projectSlug: PropTypes.string.isRequired,
  phaseTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SubmitCodeReviewModal;

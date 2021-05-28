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
} from "@chakra-ui/react";

function SubmitCodeReviewModal(props) {
  const { isOpen, onClose, projectName, projectSlug, phaseTitles } = props;
  const [selectedPhase, setSelectedPhase] = useState("");
  const [prUrl, setPrUrl] = useState("");

  function submitCodeReview(e) {
    e.preventDefault();
    console.log("submitted");
    console.log(`selectedPhase`, selectedPhase);
    console.log(`prUrl`, prUrl);
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
                  onChange={(e) => setPrUrl(e.target.value)}
                  value={prUrl}
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

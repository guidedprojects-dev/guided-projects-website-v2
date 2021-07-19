import React from "react";
import PropTypes from "prop-types";
import axios from "../utils/axiosInstance";
import {
  Avatar,
  HStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Button,
  SimpleGrid,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import ReviewStatusBadge from "./ReviewStatusBadge";
import parseDate from "../utils/parseDate";

import {
  REVIEW_STATUS_IN_PROGRESS,
  REVIEW_STATUS_AVAILABLE,
} from "../utils/constants";

function ViewCodeReviewModal(props) {
  const { isOpen, onClose, review = { user: {} } } = props;
  const { hasCopied, onCopy } = useClipboard(review.pullRequestUrl);
  const toast = useToast();

  console.log(`review`, review);

  function handleClaimReview() {
    axios
      .put(`/api/admin/code-review/${review.id}/claim`)
      .then(() =>
        toast({
          title: "Code Review Claimed",
          description: `You have successfully claimed code review ${review.id}`,
          status: "success",
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: "Failed to Claim Review",
          description: `There was an issue trying to claim code review ${response.data.id}`,
          status: "error",
          isClosable: true,
        })
      )
      .finally(onClose());
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Code Review #{review.id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={[1, 2, 3]} spacing="20px" spacingY="40px" my={4}>
            <Box>
              <ModalLabel>Project Slug</ModalLabel>
              <ModalTextField>{review.projectSlug}</ModalTextField>
            </Box>
            <Box>
              <ModalLabel>Phase</ModalLabel>
              <ModalTextField>{review.phase}</ModalTextField>
            </Box>
            <Box>
              <ModalLabel>Date Submitted</ModalLabel>
              <ModalTextField>{parseDate(review.submittedAt)}</ModalTextField>
            </Box>
            <Box>
              <ModalLabel>Pull Request URL</ModalLabel>
              <ModalTextField>{review.pullRequestUrl}</ModalTextField>
            </Box>
            <Box>
              <ModalLabel>User</ModalLabel>
              <HStack>
                <Avatar
                  name={review.user.name}
                  src={review.user.image}
                  size="sm"
                />
                <ModalTextField>{review.user.name}</ModalTextField>
              </HStack>
            </Box>
            <Box>
              <ModalLabel>Status</ModalLabel>
              <ReviewStatusBadge status={review.status} />
            </Box>
          </SimpleGrid>

          <Divider />
          <Box textAlign="center" my={8}>
            {/* If the review is available, and no body has claimed it, allow a reviewer to claim the reveiw */}
            {review.status === REVIEW_STATUS_AVAILABLE && !review.reviewer && (
              <Box>
                <Text fontSize="lg">
                  This review doesn't have a reviewer assigned to it. Would you
                  like to claim it?
                </Text>
                <Text mb={4} fontSize="lg">
                  Claiming the review will set its status to "in progress".
                </Text>
                <Button onClick={handleClaimReview}>Claim Review</Button>
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ModalLabel(props) {
  const { children } = props;

  return (
    <Text casing="uppercase" fontSize="xs" color={"gray.400"} fontWeight="bold">
      {children}
    </Text>
  );
}

function ModalTextField(props) {
  const { children } = props;

  return <Text fontSize="md">{children || "-"}</Text>;
}

ViewCodeReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.any,
};

export default ViewCodeReviewModal;

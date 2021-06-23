import React from "react";
import PropTypes from "prop-types";
import { Badge } from "@chakra-ui/react";

import {
  REVIEW_STATUS_AVAILABLE,
  REVIEW_STATUS_IN_PROGRESS,
  REVIEW_STATUS_COMPLETED,
} from "../utils/constants";

const statusMap = {
  [REVIEW_STATUS_AVAILABLE]: { title: "in queue", color: "orange" },
  [REVIEW_STATUS_IN_PROGRESS]: { title: "in progress", color: "blue" },
  [REVIEW_STATUS_COMPLETED]: { title: "done", color: "green" },
};

function ReviewStatusBadge(props) {
  const { status } = props;
  return (
    <Badge colorScheme={statusMap[status].color}>
      {statusMap[status].title}
    </Badge>
  );
}

ReviewStatusBadge.propTypes = {
  status: PropTypes.number.isRequired,
};

export default ReviewStatusBadge;

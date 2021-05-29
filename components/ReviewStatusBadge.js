import React from "react";
import PropTypes from "prop-types";
import { Badge } from "@chakra-ui/react";

const statusMap = {
  0: { title: "in progress", color: "yellow" },
  1: { title: "done", color: "green" },
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

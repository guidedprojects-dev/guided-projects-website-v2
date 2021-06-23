import axios from "./axiosInstance";

export function fetchCodeReviews({
  route,
  from,
  size,
  status,
  sortDir,
  sortField,
} = {}) {
  return axios
    .get(route, {
      params: {
        from,
        size,
        status,
        sortDir,
        sortField,
      },
    })
    .then((response) => response.data);
}

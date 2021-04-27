export const projectSummaryListQuery = `
*[_type == "project"]{
  ...,
  "author": author->{name, image}
}
`;

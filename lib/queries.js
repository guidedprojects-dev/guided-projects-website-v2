export const projectSummaryListQuery = `
*[_type == "project"]{
  ...,
  "author": author->{name, image}
}
`;

export function getProjectSlugsQuery() {
  return `
  *[_type == "project"]{
    slug
  }`;
}

export const projectQuery = `
*[_type == "project" && slug.current == $slug] {
  ...,
  "phases": phases[]->{title, content},
  "author": author->{name, image}
}[0]`;

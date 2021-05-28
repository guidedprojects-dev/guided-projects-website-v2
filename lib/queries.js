export const projectSummaryListQuery = `
*[_type == "project"]{
  ...,
  "author": author->{name, image}
}
`;

export const projectSlugsQuery = `
  *[_type == "project"]{
    slug
  }`;

export const projectQuery = `
*[_type == "project" && slug.current == $slug] {
  ...,
  "phases": phases[]->{title, content},
  "author": author->{name, image}
}[0]`;

export const projectCheckoutDataQuery = `
*[_type == "project" && slug.current == $projectSlug] {
  "author": author->{name, image},
  mainImage,
  price,
  title,
  desccription,
  slug
}[0]`;

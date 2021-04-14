import React from "react";
import { connectToDB } from "../../database/connect";
import { getProjectList } from "../../database/projects";

function index() {
  return <div>This is the projects page</div>;
}

export async function getServerSideProps() {
  const { db } = await connectToDB();
  const projects = await getProjectList(db);
  console.log(`projectsssss`, projects);

  return { props: { poop: "true" } };
}

export default index;

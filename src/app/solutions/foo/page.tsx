import { getSolution, getSolutions } from "@/lib/server/solutions-mdx";

const Component = async () => {
  const solutions = await getSolutions();
  const solution = await getSolution("10");

  return (
    <>
      <h2>Test foo</h2>

      <ul>
        {solutions.map(({ id, frontmatter }) => (
          <li key={id}>
            {id} - {frontmatter.titre}
          </li>
        ))}
      </ul>

      <p>
        Solution 10
        <br />
        <p>
          Description: {solution?.frontmatter.description}
          <br />
          Label: {solution?.frontmatter.label}
          <br />
          Score écologique: {solution?.frontmatter.scoreEcologique}
          <br />
          Titre: {solution?.frontmatter.titre}
          <br />
          Type : {solution?.frontmatter.type}
          <br />
          Chauffage: {solution?.frontmatter.usageChauffage}
          <br />
          Eau chaude : {solution?.frontmatter.usageECS}
        </p>
      </p>
    </>
  );
};

export default Component;

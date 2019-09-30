const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const peopleTemplate = path.resolve(`src/components/templates/people.jsx`)

  return graphql(
    `
      query AllPeople {
        allPeopleCsv {
          nodes {
            Age
            Country
            FirstName
            LastName
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create people  pages.
    result.data.allPeopleCsv.nodes.forEach(person => {
      createPage({
        path: `${person.First_Name}-${person.Last_Name}`,
        slug: `${person.First_Name}-${person.Last_Name}`,
        component: peopleTemplate,
        context: {
          ...person,
        },
      })
    })
  })
}

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
      const slug = person.FirstName + `-` + person.LastName

      createPage({
        path: slug,
        component: peopleTemplate,
        context: {
          ...person,
        },
      })
    })
  })
}

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const peopleTemplate = path.resolve(`src/components/templates/people.jsx`)

  console.log("CREATING")

  return graphql(
    `
      query AllPeople {
        allPeopleCsv {
          nodes {
            Country
            Last_Name
            First_Name
            age
          }
        }
      }
    `
  ).then(result => {
    console.log(result.data.allPeopleCsv.nodes)

    if (result.errors) {
      throw result.errors
    }

    // Create people  pages.
    result.data.allPeopleCsv.nodes.forEach(person => {
      createPage({
        path: `${person.First_Name}-${person.Last_Name}`,
        component: peopleTemplate,
        context: {
          ...person,
        },
      })
    })
  })
}

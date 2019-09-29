const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const peopleTemplate = path.resolve(`src/components/templates/people.jsx`)

  console.log("CREATING")

  return graphql(
    `
      query AllPeople {
        allPeopleCsv {
          edges {
            node {
              age
              Country
              First_Name
              Last_Name
            }
          }
        }
      }
    `
  ).then(result => {
    console.log(result)

    if (result.errors) {
      throw result.errors
    }

    // Create people  pages.
    result.data.allPeopleCsv.edges.forEach(person => {
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

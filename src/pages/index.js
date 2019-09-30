import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => <IndexPage data={data} />}
  />
)

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Using a CSV as a data source in Gatsby</h1>
    {data.allPeopleCsv.nodes.length > 0 &&
      data.allPeopleCsv.nodes.map(person => (
        <Link to={`${person.FirstName}-${person.LastName}`}>
          {person.FirstName}
        </Link>
      ))}
  </Layout>
)

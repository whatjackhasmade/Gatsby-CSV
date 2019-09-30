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
            ...PeopleCsvFragment
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
    <p>These people were found in the CSV file.</p>
    <ul>
      {data.allPeopleCsv.nodes.length > 0 &&
        data.allPeopleCsv.nodes.map(person => (
          <li>
            <Link to={`${person.FirstName}-${person.LastName}`}>
              {person.FirstName}
            </Link>
          </li>
        ))}
    </ul>
  </Layout>
)

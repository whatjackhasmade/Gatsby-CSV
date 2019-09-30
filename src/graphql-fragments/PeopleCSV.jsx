import { graphql } from "gatsby"
export const PeopleCsvFragment = graphql`
  fragment PeopleCsvFragment on PeopleCsv {
    Age
    Country
    FirstName
    LastName
  }
`

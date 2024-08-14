const getUserQuery = /* GraphQL */ `
  query {
    user {
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      attrs
      events(where: { eventId: { _eq: 56 } }) {
        level
      }
      audited: audits(where: {
        grade:{_is_null:false},
      }) 
      { grade }
    }
    xp_view(
      where: {
        path: { _like: "%/dakar/div-01%" }
        _and: [
          { path: { _nlike: "%checkpoint%" } }
          { path: { _nlike: "%piscine-js-2%" } }
          { path: { _nlike: "%piscine-rust%" } }
        ]
      }
      order_by: { amount: desc }
      limit: 10
    ) {
      amount
      originEventId
      path
      userId
    }
    transaction_xp: transaction(
      where: { type: { _eq: "xp" }, eventId: { _eq: 56 } }
    ) {
      createdAt
      amount
      path
      type
    }
    transaction_audits: transaction(
      order_by: { createdAt: asc }
      where: { type: { _regex: "up|down" } }
    ) {
      type
      amount
      path
      createdAt
    }
    interaction: user {
      MyUsername: login
        groups(
          where: {group: {path: {_nlike: "%piscine-go%"}}}
            order_by: {createdAt: asc}
        ) {
        MyGroups: group {
          object {
            name
          }
          members {
            user {
              login
            }
          }
          MyAuditors: 
            auditors(where: {grade: {_is_null: false}}) 
            { auditor {
              login
            }
          }
        }
      }
    }
    transaction_skills: transaction(
      where: { eventId: { _eq: 56 }, _and: { type: { _like: "skill_%" } } }
    ) {
      type
      amount
      path
    }
    totalXp: transaction_aggregate(
    where: {
      event: { object: { type: { _eq:"module" } } }
      type: { _eq: "xp" }
    }
  ) { aggregate { sum { amount } } }
  }
`;

export { getUserQuery };
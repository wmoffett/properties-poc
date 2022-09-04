process.env.CONTENTFUL_SPACE_ID = "o80oqw32rhmg";
process.env.CONTENTFUL_ACCESS_TOKEN =
  "Kv--4rISSalKyJLXuUL8bPKb950cDc52FSfrPHCPu6Y";

const POST_GRAPHQL_FIELDS = `
id
name
address
zip
city
cityUrl
state
stateUrl
stateCode
propertyUrl
title
description {
  json
  links {
    assets {
      __typename
      block {
        sys {
          id
        }
        __typename
        url
        title
        width
        height
        description
        fileName
        contentType
      }
    }
  }
}
rating
photo {
  url
  description
}
photo1 {
  url
  description
}
photo2 {
  url
  description
}
`;

const POST_GRAPHQL_FIELDS_MINIMAL = `
stateUrl
cityUrl
propertyUrl
`;

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractPostEntries(fetchResponse: any) {
  return fetchResponse?.data?.propertiesCollection?.items;
}

function extractPost(fetchResponse: any) {
  return fetchResponse?.data?.propertiesCollection?.items?.[0];
}


export async function getAllProperties(){
  // query {
  //   propertiesCollection(where: { stateUrl_exists: true, cityUrl_exists:true, propertyUrl_exists:true }, order: name_DESC) {
  //     items {
  //       stateUrl
  //       cityUrl
  //       propertyUrl
  //     }
  //   }
  // }
  const entries = await fetchGraphQL(
    `query {
      propertiesCollection(where: { stateUrl_exists: true, cityUrl_exists:true, propertyUrl_exists:true }, order: name_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS_MINIMAL}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}


// export async function getAllPostsForHome(preview: boolean) {
//   const entries = await fetchGraphQL(
//     `query {
//       blogPostCollection(order: date_DESC, preview: ${
//         preview ? "true" : "false"
//       }, limit: 5) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );
//   return extractPostEntries(entries);
// }


// export async function getAllPostsWithSlug() {
//   const entries = await fetchGraphQL(
//     `query {
//       blogPostCollection(where: { slug_exists: true }, order: date_DESC) {
//         items {
//           ${POST_GRAPHQL_FIELDS_MINIMAL}
//         }
//       }
//     }`
//   );
//   return extractPostEntries(entries);
// }


// export async function getPreviewPostBySlug(slug: string | string[] | undefined) {


//   if (typeof slug !='string') {
//     return;
//   }

//   console.log('we have slug:', slug);
//   const entry = await fetchGraphQL(
//     `query {
//       blogPostCollection(where: { slug: "${slug}" }, preview: false, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`
//   );
//   return extractPostEntries(entry);
// }


export async function getProperty(stateUrl: string | undefined, cityUrl: string | undefined, propertyUrl: string | undefined) {


  if (typeof stateUrl !='string') {
    return;
  }

  if (typeof cityUrl !='string') {
    return;
  }

  if (typeof propertyUrl !='string') {
    return;
  }

  console.log('we have a propertyUrl:', propertyUrl);
  const entry = await fetchGraphQL(
    `query {
      propertiesCollection(where: { stateUrl: "${stateUrl}", cityUrl: "${cityUrl}" , propertyUrl: "${propertyUrl}" }, preview: false, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entry);
}


// export async function getPostAndMorePosts(slug: string, preview: boolean) {
//   const entry = await fetchGraphQL(
//     `query {
//       blogPostCollection(where: { slug: "${slug}" }, preview: ${
//       preview ? "true" : "false"
//     }, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );
//   const entries = await fetchGraphQL(
//     `query {
//       blogPostCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
//       preview ? "true" : "false"
//     }, limit: 2) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );
//   return {
//     post: extractPost(entry),
//     morePosts: extractPostEntries(entries),
//   };
// }
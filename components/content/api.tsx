process.env.CONTENTFUL_SPACE_ID = "o80oqw32rhmg";
process.env.CONTENTFUL_ACCESS_TOKEN =
  "Kv--4rISSalKyJLXuUL8bPKb950cDc52FSfrPHCPu6Y";
// process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = 
//   "Kv--4rISSalKyJLXuUL8bPKb950cDc52FSfrPHCPu6Y";

const POST_GRAPHQL_FIELDS = `
url
title
description
metaDescription
keywords
city
cityUrl
state
stateUrl
rollupType
rollupTypeUrl
content {
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
`;

const POST_GRAPHQL_FIELDS_MINIMAL = `
url
title
description
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
  return fetchResponse?.data?.contentCollection?.items;
}

function extractPost(fetchResponse: any) {
  return fetchResponse?.data?.contentCollection?.items?.[0];
}

export async function getAllContent(){

  const entries = await fetchGraphQL(
    `query {
      contentCollection(where: { url_exists: true, title_exists:true, description_exists:true }, order: url_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS_MINIMAL}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}


export async function getContent(url: string | undefined) {

  if (typeof url !='string') {
    return;
  }

  console.log('!getContent: We have a Content Url:', url);


  const entry = await fetchGraphQL(
    `query {
      contentCollection(where: { url: "${url}" }, preview: false, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entry);
}
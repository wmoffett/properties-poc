process.env.CONTENTFUL_SPACE_ID = "o80oqw32rhmg";
process.env.CONTENTFUL_ACCESS_TOKEN =
  "Kv--4rISSalKyJLXuUL8bPKb950cDc52FSfrPHCPu6Y";
process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = 
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
rollupType
rollupTypeUrl
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
imagesCollection{
  total
  items{
    fileName
    url
    title
    description
  }
}
map {
  lat
  lon
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

  console.log('getAllProperties length', fetchResponse?.data?.propertiesCollection?.items.length);

  return fetchResponse?.data?.propertiesCollection?.items;
}

function extractPost(fetchResponse: any) {
  return fetchResponse?.data?.propertiesCollection?.items?.[0];
}


export async function getAllProperties(){

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

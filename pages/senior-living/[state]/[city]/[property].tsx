import * as React from "react";
import {
  ComponentRenderData,
  extractPlasmicQueryData,
  PlasmicComponent,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { PLASMIC } from "~/plasmic-init";
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@styles/theme';


import { getAllProperties } from "@components/property/api";

interface PropertyParams extends ParsedUrlQuery {
  state: string;
  city: string;
  property: string;
}

interface Property {
  state: string;
  city: string;
  property: string;
}

interface PropertyPageProps {
  plasmicData: ComponentRenderData;
  queryCache: Record<string, any>;
  state: string;
  city: string;
  property: string;
}

export const getStaticPaths: GetStaticPaths<PropertyParams> = async () => {
  const properties: Property[] = (
    await getAllProperties()
  );
  
  return {
    paths: properties.map((p) => ({
      params: { 
        state: p.state,
        city: p.city,
        property: p.property
      },
    })),
    fallback: false,
  };
};

const pagePath = "/senior-living/[state]/[city]/[property]";

export const getStaticProps: GetStaticProps<
  PropertyPageProps,
  PropertyParams
> = async (context) => {

  const state = context.params?.state;
  const city = context.params?.city;
  const property = context.params?.property;

  if (!state) {
    throw new Error("Missing state");
  }

  if (!city) {
    throw new Error("Missing city");
  }

  if (!property) {
    throw new Error("Missing property");
  }

  const plasmicData = await PLASMIC.fetchComponentData(pagePath);

  const queryCache = await extractPlasmicQueryData(
    <ChakraProvider theme={theme}>
      <PlasmicRootProvider 
        loader={PLASMIC} 
        prefetchedData={plasmicData}
        >
        <PlasmicComponent
          component={pagePath}
          componentProps={{
            propertyFetcher:{
              props: {
                state: state,
                city: city,
                property: property
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );

  return { props: { plasmicData, queryCache, city, state, property } };
};

const PropertyPage: NextPage<PropertyPageProps> = ({
  plasmicData,
  queryCache,
  state,
  city,
  property,
}) => {
  return (
    <ChakraProvider theme={theme}>
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={plasmicData}
        prefetchedQueryData={queryCache}
      >
        <PlasmicComponent
          component={pagePath}
          componentProps={{
            propertyFetcher:{
              props: {
                state: state,
                city: city,
                property: property
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );
};

export default PropertyPage;
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
  stateUrl: string;
  cityUrl: string;
  propertyUrl: string;
}
interface Property {
  stateUrl: string;
  cityUrl: string;
  propertyUrl: string;
}

interface PropertyPageProps {
  plasmicData: ComponentRenderData;
  queryCache: Record<string, any>;
  stateUrl: string;
  cityUrl: string;
  propertyUrl: string;
}

export const getStaticPaths: GetStaticPaths<PropertyParams> = async () => {
  const properties: Property[] = (
    await getAllProperties()
  );

  return {
    paths: properties.map((p) => ({
      params: { 
        stateUrl: p.stateUrl,
        cityUrl: p.cityUrl,
        propertyUrl: p.propertyUrl
      },
    })),
    fallback: false,
  };
};

const pagePath = "/senior-living/[stateUrl]/[cityUrl]/[propertyUrl]";

export const getStaticProps: GetStaticProps<
  PropertyPageProps,
  PropertyParams
> = async (context) => {

  console.log("!getStaticProps", pagePath);
  const stateUrl = context.params?.stateUrl;
  const cityUrl = context.params?.cityUrl;
  const propertyUrl = context.params?.propertyUrl;

  if (!stateUrl) {
    throw new Error("Missing state Url");
  }

  if (!cityUrl) {
    throw new Error("Missing city Url");
  }

  if (!propertyUrl) {
    throw new Error("Missing property Url");
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
                stateUrl: stateUrl,
                cityUrl: cityUrl,
                propertyUrl: propertyUrl
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );

  return { props: { plasmicData, queryCache, cityUrl, stateUrl, propertyUrl } };
};

const PropertyPage: NextPage<PropertyPageProps> = ({
  plasmicData,
  queryCache,
  stateUrl,
  cityUrl,
  propertyUrl,
}) => {

  console.log("PropertyPage");
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
                stateUrl: stateUrl,
                cityUrl: cityUrl,
                propertyUrl: propertyUrl
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );
};

export default PropertyPage;
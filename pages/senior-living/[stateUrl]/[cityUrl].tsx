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
import { getAllPropertiesByCity } from "@components/property/api";
import { ContentFetcher } from "@components/content/content";

interface CityParams extends ParsedUrlQuery {
  stateUrl: string;
  cityUrl: string;
}
interface City {
  stateUrl: string;
  cityUrl: string;
}

interface CityPageProps {
  plasmicData: ComponentRenderData;
  queryCache: Record<string, any>;
  stateUrl: string;
  cityUrl: string;
}

export const getStaticPaths: GetStaticPaths<CityParams> = async () => {
  const cities: City[] = (
    await getAllPropertiesByCity()
  );

  return {
    paths: cities.map((p) => ({
      params: { 
        stateUrl: p.stateUrl,
        cityUrl: p.cityUrl
      },
    })),
    fallback: false,
  };
};

const pagePath = "/senior-living/[stateUrl]/[cityUrl]";


export const getStaticProps: GetStaticProps<
  CityPageProps,
  CityParams
> = async (context) => {

  const stateUrl = context.params?.stateUrl;
  const cityUrl = context.params?.cityUrl;

  const url = "/senior-living/" + stateUrl + "/" + cityUrl


  console.log('url', url);
  if (!stateUrl) {
    throw new Error("Missing state Url");
  }

  if (!cityUrl) {
    throw new Error("Missing city Url");
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
            propertyByCityFetcher:{
              props: {
                stateUrl: stateUrl,
                cityUrl: cityUrl
              }
            },
            contentFetcher:{
              props: {
                url: url
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );

  return { props: { plasmicData, queryCache, cityUrl, stateUrl } };
};

const CityPage: NextPage<CityPageProps> = ({
  plasmicData,
  queryCache,
  stateUrl,
  cityUrl,
}) => {

  const url = "/senior-living/" + stateUrl + "/" + cityUrl
console.log("URL", url);
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
            propertyByCityFetcher:{
              props: {
                stateUrl: stateUrl,
                cityUrl: cityUrl
              }
            },
            contentFetcher:{
              props: {
                url: url
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );
};

export default CityPage;
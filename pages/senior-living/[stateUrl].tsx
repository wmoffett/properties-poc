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
import { getAllPropertiesByState } from "@components/property/api";

interface StateParams extends ParsedUrlQuery {
  stateUrl: string;
}
interface State {
  stateUrl: string;
}

interface StatePageProps {
  plasmicData: ComponentRenderData;
  queryCache: Record<string, any>;
  stateUrl: string;
}

export const getStaticPaths: GetStaticPaths<StateParams> = async () => {
  const states: State[] = (
    await getAllPropertiesByState()
  );

  return {
    paths: states.map((p) => ({
      params: { 
        stateUrl: p.stateUrl
      },
    })),
    fallback: false,
  };
};

const pagePath = "/senior-living/[stateUrl]";

export const getStaticProps: GetStaticProps<
  StatePageProps,
  StateParams
> = async (context) => {

  const stateUrl = context.params?.stateUrl;

  if (!stateUrl) {
    throw new Error("Missing state Url");
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
            propertyByStateFetcher:{
              props: {
                stateUrl: stateUrl
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );

  return { props: { plasmicData, queryCache, stateUrl } };
};

const CityPage: NextPage<StatePageProps> = ({
  plasmicData,
  queryCache,
  stateUrl
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
            propertyByStateFetcher:{
              props: {
                stateUrl: stateUrl
              }
            }
          }}
        />
      </PlasmicRootProvider>
    </ChakraProvider>
  );
};

export default CityPage;
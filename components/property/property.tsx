import { 
  ComponentMeta,
  DataProvider,
  repeatedElement, 
  useSelector 
} from "@plasmicapp/host";
import { usePlasmicQueryData } from "@plasmicapp/query";
import L from "lodash";
import React, { ReactNode, useContext } from "react";
import { 
  getProperty,
  getPropertiesByState,
  getPropertiesByCity,
} from "@components/property/api";
import documentToContent from '@components/renderDocument/documentToContent';


interface PropertyByStateProps {
  stateUrl?: string;
  limit?:number;
  children?: ReactNode;
  className?: string;
}

export const PropertyByStateFetcherMeta: ComponentMeta<PropertyByStateProps> = {
  name: "PropertyByStateFetcher",
  displayName: "Property By State Fetcher",
  description: "Retrieve property data from GraphQL by state",
  importName: "PropertyByStateFetcher",
  importPath: './components/property/',
  props: {
    stateUrl: {
      type: "string",
      defaultValue: "south-carolina",
      options: ["south-carolina"],
    },
    limit: {
      type: "number",
      defaultValue: 10,
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox",
        children: [
          {
            type: "component",
            name: "PropertyField",
          },
        ],
      },
    },
  },
  providesData: true
}

export function PropertyByStateFetcher({
  stateUrl,
  limit,
  children,
  className,
} : PropertyByStateProps ) {

  const data = usePlasmicQueryData<any[] | null>(
    JSON.stringify({ stateUrl }),
    async () => {
      return getPropertiesByState(stateUrl, limit);
    }
  );

  if (!data?.data) {
    return <div>Could not find collection.</div>;
  }

  return (
    <div className={className}>
      {data?.data.map((item, index) => (
        <DataProvider key={item.slug} name={"propertyItem"} data={item}>
          {repeatedElement(index, children)}
        </DataProvider>
      ))}
    </div>
  );
}

interface PropertyByCityProps {
  stateUrl?: string;
  cityUrl?: string;
  limit?:number;
  children?: ReactNode;
  className?: string;
}

export const PropertyByCityFetcherMeta: ComponentMeta<PropertyByCityProps> = {
  name: "PropertyByCityFetcher",
  displayName: "Property By City Fetcher",
  description: "Retrieve property data from GraphQL by City",
  importName: "PropertyByCityFetcher",
  importPath: './components/property/',
  props: {
    stateUrl: {
      type: "string",
      defaultValue: "south-carolina",
      options: ["south-carolina"],
    },
    cityUrl: {
      type: "string",
      defaultValue: "charleston",
      options: ["charleston", "hilton-head-island"],
    },
    limit: {
      type: "number",
      defaultValue: 10,
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox",
        children: [
          {
            type: "component",
            name: "PropertyField",
          },
        ],
      },
    },
  },
  providesData: true
}

export function PropertyByCityFetcher({
  stateUrl,
  cityUrl,
  limit,
  children,
  className,
} : PropertyByCityProps ) {

  const data = usePlasmicQueryData<any[] | null>(
    JSON.stringify({ stateUrl, cityUrl }),
    async () => {
      return getPropertiesByCity(stateUrl, cityUrl, limit);
    }
  );

  if (!data?.data) {
    return <div>Could not find collection.</div>;
  }

  return (
    <div className={className}>
      {data?.data.map((item, index) => (
        <DataProvider key={item.slug} name={"propertyItem"} data={item}>
          {repeatedElement(index, children)}
        </DataProvider>
      ))}
    </div>
  );
}

interface PropertyFetcherProps {
  stateUrl?: string;
  cityUrl?: string;
  propertyUrl?: string;
  children?: ReactNode;
  className?: string;
}

export const PropertyFetcherMeta: ComponentMeta<PropertyFetcherProps> = {
  name: "PropertyFetcher",
  displayName: "Property Fetcher",
  description: "Retrieve property data from GraphQL",
  importName: "PropertyFetcher",
  importPath: './components/property/',
  props: {
    stateUrl: {
      type: "string",
      defaultValue: "south-carolina",
      options: ["south-carolina"],
    },
    cityUrl: {
      type: "string",
      defaultValue: "charleston",
      options: ["charleston", "hilton-head-island"],
    },
    propertyUrl: {
      type: "string",
      defaultValue: "oaks-at-charleston",
      options: ["oaks-at-charleston", "the-bayshore-on-hilton-head-island"],
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox",
        children: [
          {
            type: "component",
            name: "PropertyField",
          },
        ],
      },
    },
  },
  providesData: true
}

export function PropertyFetcher({
  stateUrl,
  cityUrl,
  propertyUrl,
  children,
  className,
} : PropertyFetcherProps ) {

  const data = usePlasmicQueryData<any[] | null>(
    JSON.stringify({ stateUrl, cityUrl, propertyUrl }),
    async () => {
      return getProperty(stateUrl, cityUrl, propertyUrl);
    }
  );

  if (!data?.data) {
    return <div>Could not find collection.</div>;
  }

  return (
    <div className={className}>
      {data?.data.map((item, index) => (
        <DataProvider key={item.id.toString()} name={"propertyItem"} data={item}>
          {repeatedElement(index, children)}
        </DataProvider>
      ))}
    </div>
  );
}

interface PropertyFieldProps {
  className?: string;
  path?: string;
  setControlContextData: (data: any) => void;
}

export const PropertyFieldMeta: ComponentMeta<PropertyFieldProps> = {
  name: "PropertyField",
  displayName: "Property Field",
  description: "Use to select a property field",
  importName: "PropertyField",
  importPath: './components/property/',
  props: {
    path: {
      type: "choice",
      options: (props, ctx) => ctx.fields,
    },
  },
}

export function PropertyField({
  className,
  path,
  setControlContextData,
} : PropertyFieldProps ) {
  
  const item = useSelector("propertyItem");

  if (!item) {
    return <div>PropertyField must be used within a PropertyFetcher</div>;
  }

  setControlContextData?.({ fields: Object.keys(item) });

  if (!path) {
    return <div>Field must specify a path.</div>;
  }
  const data = L.get(item, path);

  if(data?.json) {
    return documentToContent(data);
  } else if (data?.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={data.url} alt={data.description}/>;
  } else {
    return <div className={className}>{data}</div>;
  }
}
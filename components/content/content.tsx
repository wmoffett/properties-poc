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
  // getAllContent,
  getContent
} from "@components/content/api";
import documentToContent from '@components/renderDocument/documentToContent';


interface ContentFetcherProps {
  url?: string;
  children?: ReactNode;
  className?: string;
}

export const ContentFetcherMeta: ComponentMeta<ContentFetcherProps> = {
  name: "ContentFetcher",
  displayName: "Content Fetcher",
  description: "Retrieve content data from GraphQL",
  importName: "ContentFetcher",
  importPath: './components/content/',
  props: {
    url: {
      type: "string",
      defaultValue: "/senior-living/south-carolina/charleston",
      options: ["/senior-living/south-carolina/charleston"],
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

export function ContentFetcher({
  url,
  children,
  className,
} : ContentFetcherProps ) {

  const data = usePlasmicQueryData<any[] | null>(
    JSON.stringify({ url }),
    async () => {
      return getContent(url);
    }
  );

    console.log("!ContentFetcher", data);

  if (!data?.data) {
    return <div>Could not find collection.</div>;
  }

  return (
    <div className={className}>
      {data?.data.map((item, index) => (
        <DataProvider key={item.url} name={"contentItem"} data={item}>
          {repeatedElement(index, children)}
        </DataProvider>
      ))}
    </div>
  );
}

interface ContentFieldProps {
  className?: string;
  path?: string;
  setControlContextData: (data: any) => void;
}

export const ContentFieldMeta: ComponentMeta<ContentFieldProps> = {
  name: "ContentField",
  displayName: "Content Field",
  description: "Use to select a content field",
  importName: "ContentField",
  importPath: './components/content/',
  props: {
    path: {
      type: "choice",
      options: (props, ctx) => ctx.fields,
    },
  },
}

export function ContentField({
  className,
  path,
  setControlContextData,
} : ContentFieldProps ) {
  
  const item = useSelector("contentItem");

  if (!item) {
    return <div>ContentField must be used within a Content Fetcher</div>;
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

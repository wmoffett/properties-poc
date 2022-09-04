import { 
  // ComponentMeta,
  DataProvider,
  // GlobalContextMeta, 
  repeatedElement, 
  useSelector 
} from "@plasmicapp/host";
import { usePlasmicQueryData } from "@plasmicapp/query";
import L from "lodash";
import React, { ReactNode, useContext } from "react";
import { 
  getProperty
  // getAllPostsForHome, 
  // getPreviewPostBySlug 
} from "@components/property/api";
import documentToContent from '@components/renderDocument/documentToContent';

export function PropertyFetcher({
  stateUrl,
  cityUrl,
  propertyUrl,
  children,
  className,
}: {
  stateUrl?: string;
  cityUrl?: string;
  propertyUrl?: string;
  children?: ReactNode;
  className?: string;
}) {

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
        <DataProvider key={item.slug} name={"propertyItem"} data={item}>
          {repeatedElement(index, children)}
        </DataProvider>
      ))}
    </div>
  );
}

export function PropertyField({
  className,
  path,
  setControlContextData,
}: {
  className?: string;
  path?: string;
  setControlContextData: (data: any) => void;
}) {
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
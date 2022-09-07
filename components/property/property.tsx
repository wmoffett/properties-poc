import { 
  ComponentMeta,
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




// PLASMIC.registerComponent(PropertyFetcher, {
//   name: "PropertyFetcher",
//   props: {
//     stateUrl: {
//       type: "string",
//       defaultValue: "south-carolina",
//       options: ["south-carolina"],
//     },
//     cityUrl: {
//       type: "string",
//       defaultValue: "charleston",
//       options: ["charleston", "hilton-head-island"],
//     },
//     propertyUrl: {
//       type: "string",
//       defaultValue: "oaks-at-charleston",
//       options: ["oaks-at-charleston", "the-bayshore-on-hilton-head-island"],
//     },
//     children: {
//       type: "slot",
//       defaultValue: {
//         type: "vbox",
//         children: [
//           {
//             type: "component",
//             name: "PropertyField",
//           },
//         ],
//       },
//     },
//   },
//   providesData: true
// });

// PLASMIC.registerComponent(PropertyField, {
//   name: "PropertyField",
//   props: {
//     path: {
//       type: "choice",
//       options: (props, ctx) => ctx.fields,
//     },
//   },
// });




// export const FooterMeta: ComponentMeta<FooterProps> = {

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
        <DataProvider key={item.slug} name={"propertyItem"} data={item}>
          {repeatedElement(index, children)}
        </DataProvider>
      ))}
    </div>
  );
}

// PLASMIC.registerComponent(PropertyField, {
//   name: "PropertyField",
//   props: {
//     path: {
//       type: "choice",
//       options: (props, ctx) => ctx.fields,
//     },
//   },
// });

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
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { PropertyFetcher, PropertyField } from "@components/property/property";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "hEjxg3oDqYiejQDXZXwgPg",
      token: "9wi9WAkGmDNX9mkZepOrco5i1E5eCTdJbY75chlnYLdQFycQ7DsAQuT8YSkWLZbbmPxXOpQ3N9lSaRtIwN8Q",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);

PLASMIC.registerComponent(PropertyField, {
  name: "PropertyField",
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
});

PLASMIC.registerComponent(PropertyField, {
  name: "PropertyField",
  props: {
    path: {
      type: "choice",
      options: (props, ctx) => ctx.fields,
    },
  },
});
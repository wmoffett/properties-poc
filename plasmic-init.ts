import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { 
  PropertyFetcher, 
  PropertyFetcherMeta,
  PropertyByStateFetcher,
  PropertyByStateFetcherMeta,
  PropertyByCityFetcher,
  PropertyByCityFetcherMeta,
  PropertyField, 
  PropertyFieldMeta
} from "@components/property/property";

import { 
  ContentFetcher,
  ContentFetcherMeta,
  ContentField,
  ContentFieldMeta 
} from "@components/content/content";

import { 
  StarsReview,
  StarsReviewMeta
 } from "@components/StarsReview";

import { Footer, FooterMeta } from "@components/Footer";

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
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);

////////// Data Components
PLASMIC.registerComponent(
  PropertyFetcher,
  PropertyFetcherMeta
);


PLASMIC.registerComponent(
  PropertyByStateFetcher,
  PropertyByStateFetcherMeta
);

PLASMIC.registerComponent(
  PropertyByCityFetcher,
  PropertyByCityFetcherMeta
);

PLASMIC.registerComponent(
  PropertyField,
  PropertyFieldMeta
);


PLASMIC.registerComponent(
  ContentFetcher,
  ContentFetcherMeta
);

PLASMIC.registerComponent(
  ContentField,
  ContentFieldMeta
);

////////// Presentation Components

PLASMIC.registerComponent(
  StarsReview,
  StarsReviewMeta
);

PLASMIC.registerComponent(
  Footer,
  FooterMeta
);

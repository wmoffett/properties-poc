import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { 
  PropertyFetcher, 
  PropertyField 
} from "@components/property/property";

import { Footer } from "@components/Footer";

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

PLASMIC.registerComponent(PropertyFetcher, {
  name: "PropertyFetcher",
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

//////////

PLASMIC.registerComponent(Footer, {
  name: "Footer",
  props: {
    sections: {
      type: "object",
      defaultValue: [
        {
          title: "Our Services",
          links: [
            {
              title: "Senior Living Directory",
              url: "/senior-living/",
            },
            {
              title: "Senior Care Directory",
              url: "/senior-care/",
            },
            {
              title: "Caregiving Resources",
              url: "/caregivers/",
            },
            {
              title: "Sitemap",
              url: "/sitemap/",
            },
          ],
        },
        {
          title: "Partners",
          links: [
            {
              title: "Advertising",
              url: "/advertising/",
            },
            {
              title: "Get Referrals",
              url: "/get-listed/",
            },
            {
              title: "For Our Partners",
              url: "https://partners.caring.com/",
            },
          ],
        },
        {
          title: "Who We Are",
          links: [
            {
              title: "About Caring.com",
              url: "/about/",
            },
            {
              title: "Mission",
              url: "/about/mission/",
            },
            {
              title: "Contact",
              url: "/about/contact/",
            },
            {
              title: "Newsroom",
              url: "/about/news/",
            },
            {
              title: "Careers",
              url: "/about/careers/",
            },
          ],
        },
        {
          title: "Legal",
          links: [
            {
              title: "Terms of Use",
              url: "/about/terms/",
            },
            {
              title: "Privacy Policy",
              url: "/about/privacy/",
            },
            {
              title: "Do not sell my personal information",
              url: "/about/privacy/do-not-sell/",
            },
            {
              title: "Control your information",
              url: "/about/privacy/control-your-information/",
            },
          ],
        },
      ],
    },
    aboutText: {
      type:"string",
      defaultValue: `Caring.com is a leading online destination for caregivers seeking information and support as they care for aging parents, spouses, and other loved ones. We offer thousands of original articles, helpful tools, advice from more than 50 leading experts, a community of caregivers, and a comprehensive directory of caregiving services.
      The material on this site is for informational purposes only and is not a substitute for legal, financial, professional, or medical advice or diagnosis or treatment.`
    }
  },
  providesData: false
});

import {
  Box,
  ButtonGroup,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Container from "~/components/Container";
import FacebookIcon from "~/components/icons/FacebookIcon";
import LinkedInIcon from "~/components/icons/LinkedIn";
import TwitterIcon from "~/components/icons/TwitterIcon";
import WhiteLogo from "~/components/icons/WhiteLogo";
import { 
  ComponentMeta,
} from "@plasmicapp/host";

interface FooterLink {
  title: string;
  url: string;
}

interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterLinkSection[]; 
  aboutText?: string; 
}

export const FooterMeta: ComponentMeta<FooterProps> = {
  name: "Footer",
  displayName: "Footer",
  description: "This is a footer component",
  importName: "Footer",
  importPath: './components/',
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
};


// const ReviewStars: React.FC<Props> = ({ rating, size = "6" }) => {
//   export function StarsReview({
//     rating,
//     totalReviews,
//     size
//   }: {
//     rating: number;
//     totalReviews: number;
//     size?: IconProps["boxSize"];
//   }) {

export function Footer({
  sections,
  aboutText
} : FooterProps) {

  if (!sections) {
    return <div>Could not find sections.</div>;
  }

  return (
  
    <Box as="footer" role="contentinfo" bg="caringGreen.700" textColor="white">
        <Container>
          <Box paddingY="8" marginX="auto" paddingX={{ base: "4", lg: "0" }}>
            <Stack spacing="8">
              <Grid templateColumns="repeat(3, 1fr)">
                <GridItem
                  colSpan={{
                    base: 3,
                    md: 1,
                  }}
                  pr={{
                    base: 0,
                    md: 8,
                  }}
                  mb={{
                    base: 8,
                    md: 0,
                  }}
                >
                  <Box
                    textAlign={{
                      md: "left",
                      base: "center",
                    }}
                  >
                    <WhiteLogo width={10} height={51} />
                  </Box>
                  <Text fontSize="md" mt={7}>
                    {aboutText}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={{
                    base: 3,
                    md: 2,
                  }}
                >
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: `repeat(${sections.length}, 1fr)`,
                    }}
                    templateRows={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(1, 1fr)",
                    }}
                    minWidth={{ md: "xl" }}
                    rowGap={8}
                    columnGap={8}
                  >
                    {sections.map((section) => (
                      <VStack key={section.title} alignItems="start" spacing="8">
                        <Heading size="sm">{section.title}</Heading>
                        <UnorderedList spacing="1">
                          {section.links.map((link) => (
                            <ListItem ml={4} key={link.url}>
                              <Text fontSize="md">
                                <Link href={link.url}>{link.title}</Link>
                              </Text>
                            </ListItem>
                          ))}
                        </UnorderedList>
                      </VStack>
                    ))}
                  </Grid>
                </GridItem>
              </Grid>
              <Divider colorScheme="whiteAlpha" />
              <Stack
                direction={{ base: "column-reverse", md: "row" }}
                justifyContent={{ base: "center", md: "space-between" }}
                alignItems="center"
              >
                <Box>
                  <Text fontSize="sm">
                    &copy; {new Date().getFullYear()} Caring, Inc. All rights
                    reserved.
                  </Text>
                </Box>
                <Box>
                  <ButtonGroup>
                    <HStack justifyContent="space-between">
                      <IconButton
                        bg="caringGreen.700"
                        _hover={{ bg: "caringGreen.800" }}
                        as="a"
                        href="https://www.linkedin.com/company/caring-com"
                        aria-label="LinkedIn"
                        icon={<LinkedInIcon boxSize={7} />}
                      />
                      <IconButton
                        bg="caringGreen.700"
                        _hover={{ bg: "caringGreen.800" }}
                        as="a"
                        href="https://www.twitter.com/caring"
                        aria-label="Twitter"
                        icon={<TwitterIcon boxSize={7} />}
                      />
                      <IconButton
                        bg="caringGreen.700"
                        _hover={{ bg: "caringGreen.800" }}
                        as="a"
                        href="https://www.facebook.com/caringcom"
                        aria-label="Facebook"
                        icon={<FacebookIcon boxSize={7} />}
                      />
                    </HStack>
                  </ButtonGroup>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    
  );
}

export default Footer;

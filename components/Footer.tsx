
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

interface FooterLink {
  title: string;
  url: string;
}

interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections: FooterLinkSection[]; 
  aboutText: string; 
}

export function Footer({
  sections,
  aboutText
}: {
  sections?: FooterLinkSection[];
  aboutText?: string;
}) {


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

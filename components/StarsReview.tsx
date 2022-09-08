import React from "react";
import { Box, Heading, Stack, VStack, HStack, Button, Icon, IconProps, Text } from "@chakra-ui/react";
import { MdStar, MdStarHalf, MdStarOutline, MdEdit } from "react-icons/md";
import { ComponentMeta } from "@plasmicapp/host";

export const pluralize = (
  count: number,
  word: string,
  suffix = "s"
): string => {
  if (count === 1) return word;
  return `${word}${suffix}`;
};

interface StarsReviewProps {
  rating: number;
  totalReviews: number;
  size?: IconProps["boxSize"];
  className?: string;
}

export const StarsReviewMeta: ComponentMeta<StarsReviewProps> = {
  name: "StarsReview",
  displayName: "Stars Review",
  description: "Display Rating stars and review counts",
  importName: "StarsReview",
  importPath: './components/',
  props: {
    rating: {
      type: "number",
      displayName: "Rating",
      description: "The rating value",
      defaultValue: 4.5,
    },
    totalReviews: {
      type: "number",
      displayName: "The total review count",
      description: "The total number of reviews",
      defaultValue: 19,
    },
  },
};

export function StarsReview({
  rating,
  totalReviews,
  size,
  className
} : StarsReviewProps) {

  // I saw this outside the component
  const ratingAdjustment = Math.round(rating * 10) / 10;
  const ratingInteger = Math.floor(ratingAdjustment);
  const formattedRating = ratingAdjustment;

  const roundedRating = Number(formattedRating);
  const fullStars = Math.floor(roundedRating);
  const ratingFraction = roundedRating - fullStars;
  const isRatingFractionHalf = ratingFraction >= 0.5;
  const halfStar = isRatingFractionHalf ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <Stack className={className} direction="row" color="caringRed.400" alignItems="center">
      <VStack align="start">
        <Heading
          as="p"
          size="3xl"
          aria-label={`${formattedRating} star rating`}
        >
          {formattedRating}
        </Heading>
        <Box alignSelf="center">
          <HStack
            spacing="0.25"
            role="img"
            aria-label={`${formattedRating} star rating`}
          >
            {[...Array(fullStars)].map((_, i) => (
              <Icon
                key={i}
                as={MdStar}
                boxSize={size}
                color="caringRed.400"
                role="presentation"
                data-testid={"full-star"}
              />
            ))}
            {halfStar > 0 && (
              <Icon
                as={MdStarHalf}
                boxSize={size}
                color="caringRed.400"
                role="presentation"
                data-testid={"half-star"}
              />
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <Icon
                key={i}
                as={MdStarOutline}
                boxSize={size}
                color="caringRed.400"
                role="presentation"
                data-testid={"empty-star"}
              />
            ))}
          </HStack>
        </Box>
      </VStack>
      <VStack align="start" spacing="2.5">
        <Text color="gray.800" fontSize="lg">
          {totalReviews} {pluralize(totalReviews, "review")}
        </Text>
        {/* { Simulate write a review button */}
        <Button
          title="Write a review"
          style={{ textDecoration: "none" }}
          colorScheme="caringGreen"
          variant="solid"
          leftIcon={<MdEdit />}
          size="xs"
          paddingX="2"
        >
          Write a review
        </Button>
      </VStack>
    </Stack>
  );

};

export default StarsReview;
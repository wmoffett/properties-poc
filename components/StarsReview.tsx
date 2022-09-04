import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

import { 
  ComponentMeta,
  // DataProvider,
  // GlobalContextMeta, 
  // repeatedElement, 
  // useSelector 
} from "@plasmicapp/host";

interface StarsReviewProps {
  rating: number;
  totalReviews: number;
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
  totalReviews
}: {
  rating: number;
  totalReviews: number;
}) {

  // I saw this outside the component
  const ratingAdjustment = Math.round(rating * 10) / 10;
  // const StarsReview: React.FC<Props> = ({ rating, totalReviews }) => {
  const ratingInteger = Math.floor(ratingAdjustment);

  console.log(ratingInteger);
  // return (<HStack spacing="0.25"></HStack>);

  return (
    <HStack spacing="0.25">
      {[...Array(ratingInteger)].map((_, i) => (
        <Icon key={i} as={MdStar} boxSize="5" color="caringRed.400" />
      ))}
      <Text fontSize="sm">({totalReviews})</Text>
    </HStack>
  );
};

export default StarsReview;
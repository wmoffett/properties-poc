import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  Heading, 
  HeadingProps 
} from '@chakra-ui/react';

const HeadingOne = ({
  node: _node,
  ...props
}: NodeRendererProps & HeadingProps): React.ReactElement => (
  <Heading as="h1" size={"2xl"} m={1} {...props} />
);

export default HeadingOne;
import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  Heading, 
  HeadingProps 
} from '@chakra-ui/react';

const HeadingTwo = ({
  node: _node,
  ...props
}: NodeRendererProps & HeadingProps): React.ReactElement => (
  <Heading as="h2" size={"xl"} m={1} {...props} />
);

export default HeadingTwo;
import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  Heading, 
  HeadingProps 
} from '@chakra-ui/react';

const HeadingFive = ({
  node: _node,
  ...props
}: NodeRendererProps & HeadingProps): React.ReactElement => (
  <Heading as="h5" size={"sm"} m={1} {...props} />
);

export default HeadingFive;
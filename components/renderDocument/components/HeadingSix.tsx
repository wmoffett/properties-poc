import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  Heading, 
  HeadingProps 
} from '@chakra-ui/react';

const HeadingSix = ({
  node: _node,
  ...props
}: NodeRendererProps & HeadingProps): React.ReactElement => (
  <Heading as="h6" size={"xs"} m={1} {...props} />
);

export default HeadingSix;
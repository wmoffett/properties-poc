import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  UnorderedList as ChakraUnorderedList,
  ListProps,
} from '@chakra-ui/react';

const UnorderedList = ({
  node: _node,
  ...props
}: NodeRendererProps & ListProps): React.ReactElement => (
  <ChakraUnorderedList disablePadding component="ul" m={10} my={1} {...props} />
);

export default UnorderedList;
import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  OrderedList as ChakraOrderedList,
  ListProps,
} from '@chakra-ui/react';

const OrderedList = ({
  node: _node, // silences linter; prevents node from being spread into the component
  ...props
}: NodeRendererProps & ListProps): React.ReactElement => (
  <ChakraOrderedList disablePadding component="ol" m={10} my={1} {...props} />
);

export default OrderedList;
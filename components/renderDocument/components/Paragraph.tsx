import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Text,
  TextProps,
} from '@chakra-ui/react'

const Paragraph = ({
  node: _node,
  ...props
}: NodeRendererProps & TextProps): React.ReactElement => (
  <Text {...props} m={2} />
);

export default Paragraph;
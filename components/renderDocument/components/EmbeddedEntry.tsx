import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Box,
  BoxProps
} from "@chakra-ui/react";

const EmbeddedEntry = ({
  node: _node, // silences linter; prevents node from being spread into the component
  ...props
}: NodeRendererProps & BoxProps): React.ReactElement => <Box {...props} />;

export default EmbeddedEntry;
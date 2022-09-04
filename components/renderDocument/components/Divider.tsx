import { 
  NodeRendererProps 
} from '../documentToContent';
import { 
  Divider as ChakraDivider, 
  DividerProps 
} from '@chakra-ui/react';

const Divider = ({
  node: _node,
  ...props
}: NodeRendererProps & DividerProps): React.ReactElement => (
  <ChakraDivider  {...props} />
);

export default Divider;
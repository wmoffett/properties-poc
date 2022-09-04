import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Tr as ShakraTableRow,
  TableRowProps,
} from '@chakra-ui/react';

const TableCell = ({
  node: _node,
  ...props
}: NodeRendererProps & TableRowProps): React.ReactElement => (
  <ShakraTableRow {...props}></ShakraTableRow>
);

export default TableCell;
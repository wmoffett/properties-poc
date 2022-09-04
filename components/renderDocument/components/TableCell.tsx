import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Td as ShakraTableCell,
  TableCellProps,
} from '@chakra-ui/react';

const TableCell = ({
  node: _node,
  ...props
}: NodeRendererProps & TableCellProps): React.ReactElement => (
  <ShakraTableCell {...props}></ShakraTableCell>
);

export default TableCell;
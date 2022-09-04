import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Td as ShakraTableCell,
  TableCellProps,
} from '@chakra-ui/react';

const TableHeadCell = ({
  node: _node,
  ...props
}: NodeRendererProps & TableCellProps): React.ReactElement => (
  <ShakraTableCell {...props} component="th"></ShakraTableCell>
);

export default TableHeadCell;
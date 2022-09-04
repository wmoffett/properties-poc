import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Thead as ShakraTableHead,
  TableHeadProps,
  TableRowProps,
} from '@chakra-ui/react';

const TableHead = ({
  node: _node,
  ...props
}: NodeRendererProps & TableHeadProps & TableRowProps) : React.ReactElement => (
  <ShakraTableHead {...props}/>

);

export default TableHead;
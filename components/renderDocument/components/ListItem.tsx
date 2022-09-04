import { 
  NodeRendererProps 
} from '../documentToContent';

import { 
  ListItem as ChakraListItem, 
  ListItemProps 
} from '@chakra-ui/react';

const ListItem = ({
  node: _node, // silences linter; prevents node from being spread into the component
  ...props
}: ListItemProps & NodeRendererProps): React.ReactElement => (
  <ChakraListItem button={false as any} disableGutters {...props} />
);

export default ListItem;
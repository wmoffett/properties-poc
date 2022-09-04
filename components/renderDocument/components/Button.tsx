import { 
  NodeRendererProps 
} from '../documentToContent';

import {
  Button as ChakraButton,
  ButtonProps
} from "@chakra-ui/react";

const Button = ({
  node: _node,
  ...props
}: NodeRendererProps & ButtonProps): React.ReactElement => <ChakraButton {...props} />;

export default Button;
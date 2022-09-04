import { Container as ChakraContainer } from "@chakra-ui/react";

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <ChakraContainer px={{ base: 4, lg: 8 }} maxW="container.xl">
      {children}
    </ChakraContainer>
  );
};

export default Container;
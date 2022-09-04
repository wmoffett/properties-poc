
import * as React from 'react';
import Script from 'next/script';
import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../plasmic-init';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@styles/theme';

export default function PlasmicHost() {
  return PLASMIC && <ChakraProvider theme={theme}><PlasmicCanvasHost /></ChakraProvider>;
}
    
import {
  Block,
  Inline,
} from '@contentful/rich-text-types';

import { 
  Box, 
  Image 
} from '@chakra-ui/react';

interface Sys {
  id: string;
  __typename: string;
}
interface AssetEntryProps {
  data: {
    links?: any;
  }
  node: Block | Inline;
}

export function assetEntry({
  node,
  data,
}: AssetEntryProps): React.ReactElement | null {

  const entry = data.links.assets.block.find(
    ({ sys }: { sys: Sys }) => sys.id === node.data.target.sys.id
  );

  if (entry) {
    return <Asset data={entry} />;
  }

  return null;
}
export interface Asset {
  title: string;
  description: string;
  fileName?: string;
  size?: number;
  url: string;
  width: number;
  height: number;
}

interface AssetProps {
  data: Asset;
}

const Asset = <T extends AssetProps>(props: T): React.ReactElement => {
  const {
    data: { url, width, height, description },
  } = props;

  return (
    <Box>
      <source srcSet={`${url}?fm=webp`} type="image/webp" />
      <source srcSet={`${url}?fm=avif`} type="image/avif" />
      <source srcSet={`${url}?fm=png`} type="image/png" />
      <source srcSet={`${url}?fm=jpg`} type="image/jpg" />
      <Image
        alt={description}
        src={url}
        width={width}
        height={height}
        loading="lazy"
      />
    </Box>
  );
};

export default Asset;

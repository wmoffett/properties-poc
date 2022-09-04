import {
  documentToReactComponents,
  RenderNode,
  NodeRenderer,
  RenderMark,
  RenderText,
  Options,
} from '@contentful/rich-text-react-renderer';

import {
  Document,
  BLOCKS,
  TopLevelBlock,
  MARKS,
  Block,
  Inline,
} from '@contentful/rich-text-types';

import {
  assetEntry,
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
  HeadingSix,
  EmbeddedEntry,
  UnorderedList,
  OrderedList,
  ListItem,
  Table,
  TableHeadCell,
  TableRow,
  TableCell
} from './components';

import {
  Code,
  Text,
  Divider,
} from '@chakra-ui/react'

export interface NodeRendererProps {
  node: Block | Inline;
  children: React.ReactNode;
}

const renderNodeFactory =
  (Component: React.ElementType): NodeRenderer =>
  // Fix Error: Component definition is missing display name  react/display-name
  // eslint-disable-next-line react/display-name
  (node, children) =>
    <Component node={node}>{children}</Component>;

const defaultMarkRenderers: RenderMark = {
  [MARKS.BOLD]: (text) => <Text as={"b"}>{text}</Text>,
  [MARKS.ITALIC]: (text) => <Text as={"i"}>{text}</Text>,
  [MARKS.UNDERLINE]: (text) => <Text as={"u"}>{text}</Text>,
  [MARKS.CODE]: (text) => <Code>{text}</Code>,
};

export const defaultNodeRenderers: RenderNode = {
  [BLOCKS.DOCUMENT]: (node, children) => children,
  [BLOCKS.PARAGRAPH]: renderNodeFactory(Paragraph),
  [BLOCKS.HEADING_1]: renderNodeFactory(HeadingOne),
  [BLOCKS.HEADING_2]: renderNodeFactory(HeadingTwo),
  [BLOCKS.HEADING_3]: renderNodeFactory(HeadingThree),
  [BLOCKS.HEADING_4]: renderNodeFactory(HeadingFour),
  [BLOCKS.HEADING_5]: renderNodeFactory(HeadingFive),
  [BLOCKS.HEADING_6]: renderNodeFactory(HeadingSix),
  [BLOCKS.EMBEDDED_ENTRY]: renderNodeFactory(EmbeddedEntry),
  [BLOCKS.UL_LIST]: renderNodeFactory(UnorderedList),
  [BLOCKS.OL_LIST]: renderNodeFactory(OrderedList),
  [BLOCKS.TABLE]: renderNodeFactory(Table),
  [BLOCKS.TABLE_HEADER_CELL]: renderNodeFactory(TableHeadCell),
  [BLOCKS.TABLE_ROW]: renderNodeFactory(TableRow),
  [BLOCKS.TABLE_CELL]: renderNodeFactory(TableCell),
  [BLOCKS.LIST_ITEM]: (node) => {
    const document = {
      nodeType: 'document' as BLOCKS.DOCUMENT,
      data: {},
      content: [node] as TopLevelBlock[],
    };
    const transformedChildren = documentToReactComponents(document, {
      renderMark: defaultMarkRenderers,
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => children,
        [BLOCKS.LIST_ITEM]: renderNodeFactory(ListItem),
      },
    });
    return transformedChildren;
  },
  [BLOCKS.HR]: () => <Divider />,
  [BLOCKS.QUOTE]: (node, children) => <Text as={"blockquote"}>{children}</Text>,
};

export const defaultTextRenderer: RenderText = (text) => text;

export default function documentToContent(
  data: {
    json: Document,
    links: any,
  },
  options: Options = {}
  ) : React.ReactElement {
  
  const mergedOptions: Options = {
    renderNode: Object.assign(
      {
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => assetEntry({ node, data })
      },
      defaultNodeRenderers,
      options.renderNode ?? {}
    ),
    renderMark: Object.assign(
      {},
      defaultMarkRenderers,
      options.renderMark ?? {}
    ),
    renderText: defaultTextRenderer,
  };
  if (options.renderText) {
    mergedOptions.renderText = options.renderText;
  }

  return <>{documentToReactComponents(data.json, mergedOptions)}</>;
}
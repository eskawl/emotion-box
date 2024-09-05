import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import type {
  BoxProps,
  ContainerProps,
  FlexProps,
  ThemeFragment,
  ThemeValue,
} from "./types";
import { getValueFromTheme } from "./utils";

import type { CSSProperties, PropsWithChildren } from "react";

export type BoxProps = {
  padding?: string | number;
  paddingHorizontal?: string | number;
  paddingVertical?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;

  margin?: string | number;
  marginHorizontal?: string | number;
  marginVertical?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;

  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;

  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;

  position?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
};

export type FlexProps = {
  direction?: CSSProperties["flexDirection"];
  alignment?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];

  gap?: string | number;
  gapHorizontal?: string | number;
  gapVertical?: string | number;

  flex?: string | number;
} & BoxProps;

export type ContainerProps = PropsWithChildren<
  {
    alignHorizontal: string;
    alignVertical: string;
  } & Omit<BoxProps, "alignment" | "justify">
>;

export type ThemeValue = string | number;
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type ThemeFragment = ThemeValue[] & { [key: string]: ThemeValue };

export const getValueFromTheme = (
  themeFragment: ThemeFragment,
  key: string | number
) => {
  if (themeFragment[key]) {
    return `${themeFragment[key]}px`;
  }

  return undefined;
};

const propsNotForwarded = new Set(["height", "width", "direction"]);

const shouldForwardProp = (prop: string) => {
  return isPropValid(prop) && !propsNotForwarded.has(prop);
};

const getSpaceFromTheme = (props: { theme?: Theme }): ThemeFragment => {
  const defaultSpace: ThemeValue[] = [];

  if (!props.theme) {
    return defaultSpace as ThemeFragment;
  }

  const theme = props.theme as Record<string, unknown>;
  const space = theme.space;

  if (space !== null && space !== undefined) {
    return space as ThemeFragment;
  }

  return defaultSpace as ThemeFragment;
};

const getSizesFromTheme = (props: { theme?: Theme }) => {
  const defaultSize: ThemeValue[] = [];

  if (!props.theme) {
    return defaultSize as ThemeFragment;
  }

  const theme = props.theme as Record<string, unknown>;
  const sizes = theme.sizes;

  if (sizes !== null && sizes !== undefined) {
    return sizes as ThemeFragment;
  }

  return defaultSize as ThemeFragment;
};

export const Box = styled("div", {
  shouldForwardProp,
})<BoxProps>`
  ${(props) =>
    props.padding &&
    `
    padding: ${
      getValueFromTheme(getSpaceFromTheme(props), props.padding) ??
      props.padding
    };
  `}
  ${(props) =>
    props.paddingHorizontal &&
    `
    padding-left: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingHorizontal) ??
      props.paddingHorizontal
    };
    padding-right: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingHorizontal) ??
      props.paddingHorizontal
    };
  `}
  ${(props) =>
    props.paddingVertical &&
    `
    padding-top: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingVertical) ??
      props.paddingVertical
    };
    padding-bottom: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingVertical) ??
      props.paddingVertical
    };
  `}
  ${(props) =>
    props.paddingTop &&
    `
    padding-top: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingTop) ??
      props.paddingTop
    };
  `}
  ${(props) =>
    props.paddingBottom &&
    `
    padding-bottom: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingBottom) ??
      props.paddingBottom
    };
  `}
  ${(props) =>
    props.paddingLeft &&
    `
    padding-left: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingLeft) ??
      props.paddingLeft
    };
  `}
  ${(props) =>
    props.paddingRight &&
    `
    padding-right: ${
      getValueFromTheme(getSpaceFromTheme(props), props.paddingRight) ??
      props.paddingRight
    };
  `}
  ${(props) =>
    props.margin &&
    `
    margin: ${
      getValueFromTheme(getSpaceFromTheme(props), props.margin) ?? props.margin
    };
  `}
  ${(props) =>
    props.marginHorizontal &&
    `
    margin-left: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginHorizontal) ??
      props.marginHorizontal
    };
    margin-right: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginHorizontal) ??
      props.marginHorizontal
    };
  `}
  ${(props) =>
    props.marginVertical &&
    `
    margin-top: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginVertical) ??
      props.marginVertical
    };
    margin-bottom: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginVertical) ??
      props.marginVertical
    };
  `}
  ${(props) =>
    props.marginTop &&
    `
    margin-top: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginTop) ??
      props.marginTop
    };
  `}
  ${(props) =>
    props.marginBottom &&
    `
    margin-bottom: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginBottom) ??
      props.marginBottom
    };
  `}
  ${(props) =>
    props.marginLeft &&
    `
    margin-left: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginLeft) ??
      props.marginLeft
    };
  `}
  ${(props) =>
    props.marginRight &&
    `
    margin-right: ${
      getValueFromTheme(getSpaceFromTheme(props), props.marginRight) ??
      props.marginRight
    };
  `}
  ${(props) =>
    props.width &&
    `
    width: ${
      getValueFromTheme(getSizesFromTheme(props), props.width) ?? props.width
    };
  `}
  ${(props) =>
    props.maxWidth &&
    `
    max-width: ${
      getValueFromTheme(getSizesFromTheme(props), props.maxWidth) ??
      props.maxWidth
    };
  `}
  ${(props) =>
    props.minWidth &&
    `
    min-width: ${
      getValueFromTheme(getSizesFromTheme(props), props.minWidth) ??
      props.minWidth
    };
  `}
  ${(props) =>
    props.height &&
    `
    height: ${
      getValueFromTheme(getSizesFromTheme(props), props.height) ?? props.height
    };
  `}
  ${(props) =>
    props.maxHeight &&
    `
    max-height: ${
      getValueFromTheme(getSizesFromTheme(props), props.maxHeight) ??
      props.maxHeight
    };
  `}
  ${(props) =>
    props.minHeight &&
    `
    min-height: ${
      getValueFromTheme(getSizesFromTheme(props), props.minHeight) ??
      props.minHeight
    };
  `}
  ${(props) =>
    props.position &&
    `
    position: ${props.position};
  `}
  ${(props) =>
    props.top &&
    `
    top: ${getValueFromTheme(getSizesFromTheme(props), props.top) ?? props.top};
  `}
  ${(props) =>
    props.right &&
    `
    right: ${
      getValueFromTheme(getSizesFromTheme(props), props.right) ?? props.right
    };
  `}
  ${(props) =>
    props.bottom &&
    `
    bottom: ${
      getValueFromTheme(getSizesFromTheme(props), props.bottom) ?? props.bottom
    };
  `}
  ${(props) =>
    props.left &&
    `
    left: ${
      getValueFromTheme(getSizesFromTheme(props), props.left) ?? props.left
    };
  `}
`;

const Flex = styled(Box)<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "row"};
  align-items: ${(props) => props.alignment ?? "normal"};
  justify-content: ${(props) => props.justify ?? "normal"};
  ${(props) =>
    props.gap &&
    `
    gap: ${getValueFromTheme(getSpaceFromTheme(props), props.gap) ?? props.gap};
  `}
  ${(props) =>
    props.gapHorizontal &&
    `
    row-gap: ${
      getValueFromTheme(getSpaceFromTheme(props), props.gapHorizontal) ??
      props.gapHorizontal
    };
  `}
  ${(props) =>
    props.gapVertical &&
    `
    column-gap: ${
      getValueFromTheme(getSpaceFromTheme(props), props.gapVertical) ??
      props.gapVertical
    };
  `}
  ${(props) =>
    props.flex &&
    `
    flex: ${props.flex};
  `}
`;

// Alignment is horizontal. Prefer it.
export const Row = ({ children, ...others }: ContainerProps) => {
  const { alignHorizontal, alignVertical, ...otherParsed } = others;

  return (
    <Flex
      direction="row"
      justify={alignHorizontal}
      alignment={alignVertical}
      {...otherParsed}
    >
      {children}
    </Flex>
  );
};

// Alignment is horizontal. Prefer it.
export const Column = ({ children, ...others }: ContainerProps) => {
  const { alignHorizontal, alignVertical, ...otherParsed } = others;

  return (
    <Flex
      direction="column"
      justify={alignVertical}
      alignment={alignHorizontal}
      {...otherParsed}
    >
      {children}
    </Flex>
  );
};

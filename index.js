import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

export const getValueFromTheme = (themeFragment, key) => {
  if(themeFragment[key]) {
    return `${themeFragment[key]}px`;
  }

  return undefined;
}

const propsNotForwared = new Set([
  'height',
  'width',
  'direction',
]);

const shouldForwardProp = prop => {
  return isPropValid(prop) && !propsNotForwared.has(prop)
}

const getSpaceFromTheme = props => {
  return props.theme.space || [];
}

const getSizesFromTheme = props => {
  return props.theme.sizes || [];
}

export const Box = styled('div', {
  shouldForwardProp,
})`
  ${props => props.padding && `
    padding: ${getValueFromTheme(getSpaceFromTheme(props), props.padding) || props.padding};
  `}
  ${props => props.paddingHorizontal && `
    padding-left: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingHorizontal) || props.paddingHorizontal};
    padding-right: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingHorizontal) || props.paddingHorizontal};
  `}
  ${props => props.paddingVertical && `
    padding-top: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingVertical) || props.paddingVertical};
    padding-bottom: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingVertical) || props.paddingVertical};
  `}
  ${props => props.paddingTop && `
    padding-top: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingTop) || props.paddingTop};
  `}
  ${props => props.paddingBottom && `
    padding-bottom: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingBottom) || props.paddingBottom};
  `}
  ${props => props.paddingLeft && `
    padding-left: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingLeft) || props.paddingLeft};
  `}
  ${props => props.paddingRight && `
    padding-right: ${getValueFromTheme(getSpaceFromTheme(props), props.paddingRight) || props.paddingRight};
  `}
  ${props => props.margin && `
    margin: ${getValueFromTheme(getSpaceFromTheme(props), props.margin) || props.margin};
  `}
  ${props => props.marginHorizontal && `
    margin-left: ${getValueFromTheme(getSpaceFromTheme(props), props.marginHorizontal) || props.marginHorizontal};
    margin-right: ${getValueFromTheme(getSpaceFromTheme(props), props.marginHorizontal) || props.marginHorizontal};
  `}
  ${props => props.marginVertical && `
    margin-top: ${getValueFromTheme(getSpaceFromTheme(props), props.marginVertical) || props.marginVertical};
    margin-bottom: ${getValueFromTheme(getSpaceFromTheme(props), props.marginVertical) || props.marginVertical};
  `}
  ${props => props.marginTop && `
    margin-top: ${getValueFromTheme(getSpaceFromTheme(props), props.marginTop) || props.marginTop};
  `}
  ${props => props.marginBottom && `
    margin-bottom: ${getValueFromTheme(getSpaceFromTheme(props), props.marginBottom) || props.marginBottom};
  `}
  ${props => props.marginLeft && `
    margin-left: ${getValueFromTheme(getSpaceFromTheme(props), props.marginLeft) || props.marginLeft};
  `}
  ${props => props.marginRight && `
    margin-right: ${getValueFromTheme(getSpaceFromTheme(props), props.marginRight) || props.marginRight};
  `}
  ${props => props.width && `
    width: ${getValueFromTheme(getSizesFromTheme(props), props.width) || props.width};
  `}
  ${props => props.maxWidth && `
    max-width: ${getValueFromTheme(getSizesFromTheme(props), props.maxWidth) || props.maxWidth};
  `}
  ${props => props.minWidth && `
    min-width: ${getValueFromTheme(getSizesFromTheme(props), props.minWidth) || props.minWidth};
  `}
  ${props => props.height && `
    height: ${getValueFromTheme(getSizesFromTheme(props), props.height) || props.height};
  `}
  ${props => props.maxHeight && `
    max-height: ${getValueFromTheme(getSizesFromTheme(props), props.maxHeight) || props.maxHeight};
  `}
  ${props => props.minHeight && `
    min-height: ${getValueFromTheme(getSizesFromTheme(props), props.minHeight) || props.minHeight};
  `}
`;

const Flex = styled(Box)`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignment || 'normal'};
  justify-content: ${props => props.justify || 'normal'};
  ${props => props.gap && `
    gap: ${getValueFromTheme(getSpaceFromTheme(props), props.gap) || props.gap};
  `}
  ${props => props.gapHorizontal && `
    row-gap: ${getValueFromTheme(getSpaceFromTheme(props), props.gapHorizontal) || props.gapHorizontal};
  `}
  ${props => props.gapVertical && `
    column-gap: ${getValueFromTheme(getSpaceFromTheme(props), props.gapVertical) || props.gapVertical};
  `}
  ${props => props.flex && `
    flex: ${props.flex};
  `}
`
// Alignement is horizontal. Prefer it.
export const Row = ({ children, alignment, justify, ...others }) => {
  return <Flex direction="row" justify={alignment} alignment={justify} {...others}>{children}</Flex>
}

// Alignement is horizontal. Prefer it.
export const Column = ({ children, ...others }) => {
  return <Flex direction="column" {...others}>{children}</Flex>
}
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

// TODO: Make theme optional
export const Box = styled('div', {
  shouldForwardProp,
})`
  ${props => props.padding && `
    padding: ${getValueFromTheme(props.theme.space, props.padding) || props.padding};
  `}
  ${props => props.paddingHorizontal && `
    padding-left: ${getValueFromTheme(props.theme.space, props.paddingHorizontal) || props.paddingHorizontal};
    padding-right: ${getValueFromTheme(props.theme.space, props.paddingHorizontal) || props.paddingHorizontal};
  `}
  ${props => props.paddingVertical && `
    padding-top: ${getValueFromTheme(props.theme.space, props.paddingVertical) || props.paddingVertical};
    padding-bottom: ${getValueFromTheme(props.theme.space, props.paddingVertical) || props.paddingVertical};
  `}
  ${props => props.paddingTop && `
    padding-top: ${getValueFromTheme(props.theme.space, props.paddingTop) || props.paddingTop};
  `}
  ${props => props.paddingBottom && `
    padding-bottom: ${getValueFromTheme(props.theme.space, props.paddingBottom) || props.paddingBottom};
  `}
  ${props => props.paddingLeft && `
    padding-left: ${getValueFromTheme(props.theme.space, props.paddingLeft) || props.paddingLeft};
  `}
  ${props => props.paddingRight && `
    padding-right: ${getValueFromTheme(props.theme.space, props.paddingRight) || props.paddingRight};
  `}
  ${props => props.margin && `
    margin: ${getValueFromTheme(props.theme.space, props.margin) || props.margin};
  `}
  ${props => props.marginHorizontal && `
    margin-left: ${getValueFromTheme(props.theme.space, props.marginHorizontal) || props.marginHorizontal};
    margin-right: ${getValueFromTheme(props.theme.space, props.marginHorizontal) || props.marginHorizontal};
  `}
  ${props => props.marginVertical && `
    margin-top: ${getValueFromTheme(props.theme.space, props.marginVertical) || props.marginVertical};
    margin-bottom: ${getValueFromTheme(props.theme.space, props.marginVertical) || props.marginVertical};
  `}
  ${props => props.marginTop && `
    margin-top: ${getValueFromTheme(props.theme.space, props.marginTop) || props.marginTop};
  `}
  ${props => props.marginBottom && `
    margin-bottom: ${getValueFromTheme(props.theme.space, props.marginBottom) || props.marginBottom};
  `}
  ${props => props.marginLeft && `
    margin-left: ${getValueFromTheme(props.theme.space, props.marginLeft) || props.marginLeft};
  `}
  ${props => props.marginRight && `
    margin-right: ${getValueFromTheme(props.theme.space, props.marginRight) || props.marginRight};
  `}
  ${props => props.width && `
    width: ${getValueFromTheme(props.theme.sizes, props.width) || props.width};
  `}
  ${props => props.maxWidth && `
    max-width: ${getValueFromTheme(props.theme.sizes, props.maxWidth) || props.maxWidth};
  `}
  ${props => props.minWidth && `
    min-width: ${getValueFromTheme(props.theme.sizes, props.minWidth) || props.minWidth};
  `}
  ${props => props.height && `
    height: ${getValueFromTheme(props.theme.sizes, props.height) || props.height};
  `}
  ${props => props.maxHeight && `
    max-height: ${getValueFromTheme(props.theme.sizes, props.maxHeight) || props.maxHeight};
  `}
  ${props => props.minHeight && `
    min-height: ${getValueFromTheme(props.theme.sizes, props.minHeight) || props.minHeight};
  `}
`;

const Flex = styled(Box)`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignment || 'normal'};
  justify-content: ${props => props.justify || 'normal'};
  ${props => props.gap && `
    gap: ${getValueFromTheme(props.theme.space, props.gap) || props.gap};
  `}
  ${props => props.gapHorizontal && `
    row-gap: ${getValueFromTheme(props.theme.space, props.gapHorizontal) || props.gapHorizontal};
  `}
  ${props => props.gapVertical && `
    column-gap: ${getValueFromTheme(props.theme.space, props.gapVertical) || props.gapVertical};
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
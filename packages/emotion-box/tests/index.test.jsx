import { ThemeProvider } from '@emotion/react';
import { create } from 'react-test-renderer';
import { Box, Column, Row, getValueFromTheme as defaultGetThemeValue } from '..';

// Sample theme
const space = [0, 4, 8, 16, 32, 64, 128, 256];

space.xxsmall = space[1];
space.xsmall = space[2];
space.small = space[3];
space.medium = space[4];
space.large = space[5];
space.xlarge = space[6];
space.xxlarge = space[7];

const sizes = [0, 8, 16, 32, 64, 128, 256, 300, 360];

const theme = {
  space,
  sizes,
};

const render = (target, providedTheme=theme) => {
  return create(
    <ThemeProvider theme={providedTheme}>
      {target}
    </ThemeProvider>
  );
}

const boxTests = ({ 
  getValueFromTheme=defaultGetThemeValue,
  render=render,
  Component=Box,
}={}) => {
  test('Box with compound props', () => {
    const props = {
      padding: 2,
      margin: 2,
      width: 3,
      maxWidth: 3,
      minWidth: 3,
      height: 3,
      maxHeight: 3,
      minHeight: 3,
    };

    const wrapper = render(<Component {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('padding', getValueFromTheme(theme.space, props.padding));
    expect(wrapper).toHaveStyleRule('margin', getValueFromTheme(theme.space, props.margin));
    
    expect(wrapper).toHaveStyleRule('width', getValueFromTheme(theme.sizes, props.width));
    expect(wrapper).toHaveStyleRule('height', getValueFromTheme(theme.sizes, props.height));
    expect(wrapper).toHaveStyleRule('max-height', getValueFromTheme(theme.sizes, props.maxHeight));
    expect(wrapper).toHaveStyleRule('max-width', getValueFromTheme(theme.sizes, props.maxWidth));
    expect(wrapper).toHaveStyleRule('min-height', getValueFromTheme(theme.sizes, props.minHeight));
    expect(wrapper).toHaveStyleRule('min-width', getValueFromTheme(theme.sizes, props.minWidth));

    Object.keys(props).forEach(expect(wrapper.props).not.toHaveProperty);
  });

  test('Box with horizontal and vertical props', () => {
    const props = {
      paddingHorizontal: 2,
      paddingVertical: 2,
      marginHorizontal: 2,
      marginVertical: 2,
    };

    const wrapper = render(<Component {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('padding-left', getValueFromTheme(theme.space, props.paddingHorizontal));
    expect(wrapper).toHaveStyleRule('padding-right', getValueFromTheme(theme.space, props.paddingHorizontal));
    expect(wrapper).toHaveStyleRule('padding-top', getValueFromTheme(theme.space, props.paddingVertical));
    expect(wrapper).toHaveStyleRule('padding-bottom', getValueFromTheme(theme.space, props.paddingVertical));

    expect(wrapper).toHaveStyleRule('margin-left', getValueFromTheme(theme.space, props.marginHorizontal));
    expect(wrapper).toHaveStyleRule('margin-right', getValueFromTheme(theme.space, props.marginHorizontal));
    expect(wrapper).toHaveStyleRule('margin-top', getValueFromTheme(theme.space, props.marginVertical));
    expect(wrapper).toHaveStyleRule('margin-bottom', getValueFromTheme(theme.space, props.marginVertical));

    Object.keys(props).forEach(expect(wrapper.props).not.toHaveProperty);
  });

  test('Box with explicit props', () => {
    const props = {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 2,
      marginRight: 2,
    };

    const wrapper = render(<Component {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('padding-left', getValueFromTheme(theme.space, props.paddingLeft));
    expect(wrapper).toHaveStyleRule('padding-right', getValueFromTheme(theme.space, props.paddingRight));
    expect(wrapper).toHaveStyleRule('padding-top', getValueFromTheme(theme.space, props.paddingTop));
    expect(wrapper).toHaveStyleRule('padding-bottom', getValueFromTheme(theme.space, props.paddingBottom));

    expect(wrapper).toHaveStyleRule('margin-left', getValueFromTheme(theme.space, props.marginLeft));
    expect(wrapper).toHaveStyleRule('margin-right', getValueFromTheme(theme.space, props.marginRight));
    expect(wrapper).toHaveStyleRule('margin-top', getValueFromTheme(theme.space, props.marginTop));
    expect(wrapper).toHaveStyleRule('margin-bottom', getValueFromTheme(theme.space, props.marginBottom));

    Object.keys(props).forEach(expect(wrapper.props).not.toHaveProperty);
  });

  test('Box with position props', () => {
    const props = {
      position: 'absolute',
      top: 2,
      right: 2,
      bottom: 2,
      left: 2,
    };

    const wrapper = render(<Component {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('position', props.position);
    expect(wrapper).toHaveStyleRule('left', getValueFromTheme(theme.sizes, props.left));
    expect(wrapper).toHaveStyleRule('right', getValueFromTheme(theme.sizes, props.right));
    expect(wrapper).toHaveStyleRule('top', getValueFromTheme(theme.sizes, props.top));
    expect(wrapper).toHaveStyleRule('bottom', getValueFromTheme(theme.sizes, props.bottom));
  })
}

describe('Box', () =>{
  test('Default Box', () => {
    const wrapper = render(<Box />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe('Valid theme indices', () => {
    boxTests({
      getValueFromTheme: defaultGetThemeValue,
      render: render,
    })
  });

  describe('Invalid theme indices', () => {
    const emptyTheme = {
      space: [],
      sizes: [],
    }

    boxTests({
      getValueFromTheme: (_, propValue) => `${propValue}`,
      render: (target) => render(target, emptyTheme)
    });
  });

  describe('No theme provided', () => {
    boxTests({
      getValueFromTheme: (_, propValue) => `${propValue}`,
      render: create,
    });
  });
});

describe('Layout', () => {
  test('Default Row', () => {
    const wrapper = render(<Row />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('display', 'flex');
    expect(wrapper).toHaveStyleRule('flex-direction', 'row');
    expect(wrapper).toHaveStyleRule('align-items', 'normal');
    expect(wrapper).toHaveStyleRule('justify-content', 'normal');

    expect(wrapper).not.toHaveStyleRule('flex');
    expect(wrapper).not.toHaveStyleRule('gap');
    expect(wrapper).not.toHaveStyleRule('row-gap');
    expect(wrapper).not.toHaveStyleRule('column-gap');

    expect(wrapper.props).not.toHaveProperty('direction');
  });

  test('Row', () => {
    const props = {
      alignment: 'left',
      justify: 'flex-start',
      flex: '1 0 auto',
      gap: 2,
      gapHorizontal: 2,
      gapVertical: 2,
    }

    const getValueFromTheme = defaultGetThemeValue;

    const wrapper = render(<Row {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('align-items', props.justify);
    expect(wrapper).toHaveStyleRule('justify-content', props.alignment);
    expect(wrapper).toHaveStyleRule('flex', props.flex);
    
    expect(wrapper).toHaveStyleRule('gap', getValueFromTheme(theme.space, props.gap));
    expect(wrapper).toHaveStyleRule('column-gap', getValueFromTheme(theme.space, props.gapVertical));
    expect(wrapper).toHaveStyleRule('row-gap', getValueFromTheme(theme.space, props.gapHorizontal));

    Object.keys(props).forEach(expect(wrapper.props).not.toHaveProperty);
  });

  const flexComponents = [
    { name: 'Row', Component: Row },
    { name: 'Column', Component: Column }
  ];

  describe.each(flexComponents)('$name invalid theme indices', ({ Component, name }) => {
    test(`${name} with invalid theme indices`, () => {
      const props = {
        gap: '20%',
        gapHorizontal: '20%',
        gapVertical: '20%',
      }
    
      const wrapper = render(<Component {...props} />).toJSON();
    
      expect(wrapper).toHaveStyleRule('gap', props.gap);
      expect(wrapper).toHaveStyleRule('column-gap', props.gapVertical);
      expect(wrapper).toHaveStyleRule('row-gap', props.gapHorizontal);
    });
  });


  test('Default Column', () => {
    const wrapper = render(<Column />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('display', 'flex');
    expect(wrapper).toHaveStyleRule('flex-direction', 'column');
    expect(wrapper).toHaveStyleRule('align-items', 'normal');
    expect(wrapper).toHaveStyleRule('justify-content', 'normal');

    expect(wrapper).not.toHaveStyleRule('flex');
    expect(wrapper).not.toHaveStyleRule('gap');
    expect(wrapper).not.toHaveStyleRule('row-gap');
    expect(wrapper).not.toHaveStyleRule('column-gap');

    expect(wrapper.props).not.toHaveProperty('direction');
  });

  test('Column', () => {
    const props = {
      alignment: 'left',
      justify: 'flex-start',
      flex: '1 0 auto',
      gap: 2,
      gapHorizontal: 2,
      gapVertical: 2,
    }

    const getValueFromTheme = defaultGetThemeValue;

    const wrapper = render(<Column {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toHaveStyleRule('align-items', props.alignment);
    expect(wrapper).toHaveStyleRule('justify-content', props.justify);
    expect(wrapper).toHaveStyleRule('flex', props.flex);
    
    expect(wrapper).toHaveStyleRule('gap', getValueFromTheme(theme.space, props.gap));
    expect(wrapper).toHaveStyleRule('column-gap', getValueFromTheme(theme.space, props.gapVertical));
    expect(wrapper).toHaveStyleRule('row-gap', getValueFromTheme(theme.space, props.gapHorizontal));

    Object.keys(props).forEach(expect(wrapper.props).not.toHaveProperty);
  });


  describe.each(flexComponents)('$name forwards props', ({ Component }) => {
    boxTests({
      render,
      Component,
    });
  });
});

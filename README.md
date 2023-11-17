## Emotion Box

### Installation

```npm install @eskawl/emotion-box```

### Usage

1. Provide a theme to your app

```js
import { ThemeProvider } from "@emotion/react";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
        <MyApp>
    </ThemeProvider>
  )
}
```

2. Use the box component

```js
import { Column, Row } from "@eskawl/emotion-box";

<Row gap="2">
    <Column spacing="4"></Column>
    <Column spacing="4"></Column>
</Row>
```

### API

#### Theme
The theme should be an object which should contain two properties.
- sizes: Array|Object List of sizes keyed according to the magnitude in pixels. `px` suffix is not to be provided.
- space: Array|Object List of space keyed according to magnitude in pixels. `px` suffix is not to be provided.

It is recommeded to have a `0` keyed size and space to represent `0`. `px` suffix is automatically added.
If the requested key is not found in the theme, the provided value is used directly. This can be used in cases where a value
outside the theme is needed for instance a percentage (%) width / height.

> **_NOTE:_**  The theme is completly optional. If the theme is not provided through `ThemeProvider` the provided prop value will be used directly.

#### Box
Box is a container. It renders a `div` with a requested size and spacing.

```js
import { Box } from "@eskawl/emotion-box";
```

- `padding`, `paddingHorizontal`, `paddingVertical`, `padding(Left|Right|Top|Bottom)`: 
  - Sets padding of the box. Ex: `<Box paddingLeft={2} />`.
  - Uses `space` property of theme.
- `margin`, `marginHorizontal`, `marginVertical`, `margin(Left|Right|Top|Bottom)`: 
  - Sets margin of the box. Ex: `<Box marginRight={2} />`
  - Uses `space` proptery of theme.
- `width`, `maxWidth`, `minWidth`: 
  - Sets width of the box.
  - Uses `sizes` property of theme.
- `height`, `maxHeight`, `minHeight`: 
  - Sets height of the box.
  - Uses `sizes` property of theme.
- `position`: Set the css `position` property. Eg: `absolute`, `fixed` etc
  - `top`, `right`, `bottom`, `left`: 
    - Sets the offsets.
    - User `sizez` property fo theme.

#### Row
Row is a `flex` container, which lays out items in a row.
- `alignment`: Horizontal alignment of items. Accepts values for `main-axis` alignment i.e., `justify-content`. Ex: `space-between, left`
- `justify`: Vertical alignment of items. Accepts values for `cross-axis` alignment i.e., `align-items`. Ex: `flex-start`
- `flex`: Controls the flex css prop. Useful if this row is a flex item, '1 0 auto'
- `gap`, `gapHorizontal`, `gapVertical`: 
  - Sets the gap between the items.
  - Uses `space` properlty of theme.
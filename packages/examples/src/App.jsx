import { Box, Row, Column } from '@eskawl/emotion-box';
import { ThemeProvider } from '@emotion/react';

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

const BorderBox = ({children}) => {
  return <div style={{ border: '1px solid black'}}>
    <Box padding="20px">
    {children}
    </Box>
  </div>
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h2>Simple Box</h2>
      <Box>Box</Box>

      <h2>Box with padding</h2>
      <div style={{ border: '1px solid black'}}>
        <Box padding="large">Padding Box</Box>
      </div>
      <hr />

      <h2>Row</h2>
      <Row>
        <BorderBox>1</BorderBox>
        <BorderBox>2</BorderBox>
      </Row>
      <hr />

      <h2>Row alignHorizontal="right"</h2>
      <Row alignHorizontal="right">
        <BorderBox>1</BorderBox>
        <BorderBox>2</BorderBox>
      </Row>
      <hr />

      <h2>Row alignVertical="center" </h2>
      <Row alignVertical="center" height="200px" border="1px solid black">
        <BorderBox>1</BorderBox>
        <BorderBox>2</BorderBox>
      </Row>
      <hr />

      <h2>Column</h2>
      <Column>
        <BorderBox>1</BorderBox>
        <BorderBox>2</BorderBox>
      </Column>
      <hr />

      <h2>Column alignHorizontal="flex-end"</h2>
      <Column alignHorizontal="flex-end">
        <BorderBox>1</BorderBox>
        <BorderBox>2</BorderBox>
      </Column>
      <hr />

      <h2>Column alignVertical="center" </h2>
      <Column alignVertical="center" height="400px" border="1px solid black">
        <BorderBox>1</BorderBox>
        <BorderBox>2</BorderBox>
      </Column>
      <hr />

    </ThemeProvider>
  )
}

export default App

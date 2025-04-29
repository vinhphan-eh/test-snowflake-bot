import React from "react";
import { Button, Empty, Card } from "@hero-design/rn";
import styled from "@emotion/native";

// Snowflakes using styled-components
const StyledButton = styled(Button)`
  padding: 10px;
`;

// @snowflake-guard/approved-styled-components
const ApprovedStyledButton = styled(Button)`
  padding: 10px;
`;

const StyledLinkButton = styled(Button.Icon)`
  color: red;
`;

const { Icon } = Button;
const StyledIcon = styled(Icon)`
  color: red;
`;

const customBtnStyles = {
  padding: 30,
};

const styles = {
  btn: {
    padding: 30,
  },
  badge: {
    pt: 10,
  },
};

const Sample = () => {
  <>
    {/* Snowflakes using style prop */}
    <Tabs barStyle={{ padding: 10 }} />
    <Tabs.Scroll barStyle={{ padding: 10 }} />
    <Tabs containerStyle={{ padding: 10, backgroundColor: "red" }} />
    <Tabs containerStyle={{ width: 100 }} />
    <Tabs.Scroll containerStyle={{ padding: 10, backgroundColor: "red" }} />
    <Tabs.Scroll containerStyle={{ width: 100 }} />
    <TextInput textStyle={{ color: "red", borderColor: "red" }} />
    <Search.OneLine textStyle={{ color: "red", borderColor: "red" }} />
    <Toolbar.Message textStyle={{ color: "red", borderColor: "red" }} />
    {/* Snowflakes using styled components */}
    <StyledButton />
    <StyledLinkButton />
    <StyledIcon />
    {/* Snowflakes using style prop */}
    <Button style={{ width: 200 }} /> {/* acceptable */}
    <Empty style={{ width: 200 }} />
    <Card style={{ width: 200 }} /> {/* acceptable */}
    <Button.Utility style={{ width: 200 }} />
    <Button style={customBtnStyles} />
    <Button variant="text" style={{ ...customBtnStyles }} />
    <Button style={styles.btn} />
    <Button style={{ ...styles.btn }} />
    <Icon style={{ padding: 20 }} />
    {/* @snowflake-guard/approved-inline-style attributes: height, padding */}
    <Icon style={{ padding: 20, height: 40 }} />
    <Icon
      style={{
        padding: 20,
        backgroundColor: "red",
      }}
    />
  </>;
};

export default Sample;

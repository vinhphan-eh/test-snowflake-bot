import { Button, Alert } from "@hero-design/rn";
import styled from "@emotion/native";

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.colors.danger,
}));

const Test = () => (
  <>
    <StyledAlert style={{ padding: 50 }} />
    <Button text="Test" onClick={() => {}} style={{ backgroundColor: "red" }} />
  </>
);

export default Test;

import React from "react";
import { Text, FlexRow } from "../styles";

export const Star = ({ checked, onClick }: any) => {
  return (
    <Text onClick={onClick} margin="0 12px 0 0" fontSize="24px">
      {checked ? "★" : "☆"}
    </Text>
  );
};

const RatingInputField = ({ field: { value }, form }: any) => {
  return (
    <FlexRow justifyContent="flex-start" margin="12px 0 22px;">
      {[1, 2, 3, 4, 5].map((val) => (
        <Star
          key={val}
          checked={value >= val}
          onClick={() => {
            if (value === val) form.setFieldValue("rating", 0);
            else form.setFieldValue("rating", val);
          }}
        />
      ))}
    </FlexRow>
  );
};

export default RatingInputField;

import React from "react";
import { FlexRow, Text } from "../../styles";

export const Star = ({ checked }: any) => {
  return <Text fontSize="20px">{checked ? "★" : "☆"}</Text>;
};

const RatingDisplay = ({ rating, style }: any) => {
  return (
    <FlexRow justifyContent="flex-start" style={style}>
      {[1, 2, 3, 4, 5].map((val) => (
        <Star key={val} checked={rating >= val} />
      ))}
    </FlexRow>
  );
};

export default RatingDisplay;

import React from "react";
import { Text, Heading } from "@chakra-ui/react";

interface Props {
  lampState: boolean;
}

export const State: React.FC<Props> = ({ lampState }) => {
  return (
    <>
      <Heading size="md">Estado da lâmpada</Heading>
      <Text as="span">{lampState ? "Ligado" : "Desligado"}</Text>
    </>
  );
};

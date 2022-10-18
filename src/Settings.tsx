import React, { useState } from "react";
import {
  Button,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";

interface Props {
  luminosity: number;
  lampTime: number;
  onSave: ({
    luminosity,
    lampTime,
  }: {
    luminosity: number;
    lampTime: number;
  }) => void;
}

const labelStyles = {
  // mt: "2",
  // ml: "-2.5",
  fontSize: "md",
};

export const Settings: React.FC<Props> = ({ luminosity, lampTime, onSave }) => {
  const [currentLuminosity, setCurrentLuminosity] = useState(luminosity);
  const [currentLampTime, setCurrentLampTime] = useState(lampTime);

  return (
    <>
      <Heading size="md" style={{ marginBottom: "32px" }}>
        Configurações
      </Heading>
      <Slider
        defaultValue={currentLuminosity}
        value={currentLuminosity}
        min={0}
        max={4095}
        onChange={(value) => setCurrentLuminosity(value)}
      >
        <SliderMark value={1000} {...labelStyles}>
          1000
        </SliderMark>
        <SliderMark value={2000} {...labelStyles}>
          2000
        </SliderMark>
        <SliderMark value={3000} {...labelStyles}>
          3000
        </SliderMark>
        <SliderMark
          value={currentLuminosity}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="14"
          fontSize="sm"
        >
          {currentLuminosity}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <InputGroup style={{ marginTop: "32px" }}>
        <InputLeftAddon children="Intervalo de atualização" />
        <Input
          value={currentLampTime}
          onChange={(e) => setCurrentLampTime(Number(e.target.value))}
        />
        <InputRightAddon children="ms" />
      </InputGroup>

      <Button
        colorScheme="blue"
        onClick={() => onSave({ luminosity, lampTime })}
        style={{ width: "100%", marginTop: "50px" }}
      >
        Salvar
      </Button>
    </>
  );
};

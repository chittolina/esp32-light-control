import React, { useEffect, useState } from "react";
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
  Text,
} from "@chakra-ui/react";

interface Props {
  minTemp: number;
  maxTemp: number;
  minLuminosity: number;
  minHumidity: number;
  onSave: ({
    minLuminosity,
    minTemp,
    maxTemp,
    minHumidity,
  }: {
    minTemp: number;
    maxTemp: number;
    minLuminosity: number;
    minHumidity: number;
  }) => void;
}

const labelStyles = {
  fontSize: "md",
};

export const Settings: React.FC<Props> = ({
  minTemp,
  maxTemp,
  minLuminosity,
  minHumidity,
  onSave,
}) => {
  const [currentMinLuminosity, setCurrentMinLuminosity] =
    useState(minLuminosity);
  const [currentMinTemp, setCurrentMinTemp] = useState(minTemp);
  const [currentMaxTemp, setCurrentMaxTemp] = useState(maxTemp);
  const [currentMinHumidity, setCurrentMinHumidity] = useState(minHumidity);

  useEffect(() => {
    setCurrentMinTemp(minTemp);
    setCurrentMaxTemp(maxTemp);
    setCurrentMinLuminosity(minLuminosity);
    setCurrentMinHumidity(minHumidity);
  }, [minTemp, maxTemp, minLuminosity, minHumidity]);

  return (
    <>
      <Heading size="md" style={{ marginBottom: "32px" }}>
        Configurações
      </Heading>
      <Text>Sensibilidade da luz</Text>
      <Slider
        defaultValue={currentMinLuminosity}
        value={currentMinLuminosity}
        min={0}
        max={4095}
        onChange={(value) => setCurrentMinLuminosity(value)}
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
          value={currentMinLuminosity}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="14"
          fontSize="sm"
        >
          {currentMinLuminosity}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <InputGroup style={{ marginTop: "32px" }}>
        <InputLeftAddon children="Temperatura mínima" />
        <Input
          value={currentMinTemp}
          onChange={(e) => setCurrentMinTemp(Number(e.target.value))}
        />
        <InputRightAddon children="segundos" />
      </InputGroup>

      <InputGroup style={{ marginTop: "32px" }}>
        <InputLeftAddon children="Temperatura máxima" />
        <Input
          value={currentMaxTemp}
          onChange={(e) => setCurrentMaxTemp(Number(e.target.value))}
        />
        <InputRightAddon children="°C" />
      </InputGroup>

      <InputGroup style={{ marginTop: "32px" }}>
        <InputLeftAddon children="Umidade mínima" />
        <Input
          value={currentMinHumidity}
          onChange={(e) => setCurrentMinHumidity(Number(e.target.value))}
        />
        <InputRightAddon children="%" />
      </InputGroup>

      <Button
        colorScheme="blue"
        onClick={() =>
          onSave({
            minLuminosity: currentMinLuminosity,
            minTemp: currentMinTemp,
            maxTemp: currentMaxTemp,
            minHumidity: currentMinHumidity,
          })
        }
        style={{ width: "100%", marginTop: "50px" }}
      >
        Salvar
      </Button>
    </>
  );
};

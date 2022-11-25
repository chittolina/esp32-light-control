import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Spinner,
  Center,
  Divider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Settings } from "./Settings";
import { State } from "./State";
import Service, { UpdateVariables } from "./service";

export const App = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [minLuminosity, setMinLuminosity] = useState(1000);
  const [minTemp, setMinTemp] = useState(15);
  const [maxTemp, setMaxTemp] = useState(30);
  const [minHumidity, setMinHumidity] = useState(100);
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [incandenscentLampState, setIncandescentLampState] = useState(false);
  const [fluorescentLampState, setFluorescentLampState] = useState(false);

  useEffect(() => {
    fetch();
    setInterval(fetch, 2000);
  }, []);

  const fetch = async () => {
    if (isUpdating) {
      return;
    }

    try {
      const state = await Service.getCurrentState();
      setIncandescentLampState(state.lamp_incandenscent);
      setFluorescentLampState(state.lamp_fluorescent);
      setMinLuminosity(state.min_luminosity);
      setMinTemp(state.min_temp);
      setMaxTemp(state.max_temp);
      setMinHumidity(state.min_humidity);
      setHumidity(state.humidity);
      setTemp(state.temp);
    } catch (err) {
      console.log("err:", err);
    }

    setIsFetching(false);
  };

  const update = async (data: UpdateVariables) => {
    setIsUpdating(true);
    try {
      await Service.updateSettings(data);
    } catch (err) {
      console.log("error");
    }
    setIsUpdating(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Center>
          <Grid
            style={{
              width: "800px",
              marginTop: "100px",
              borderRadius: "10px",
              border: "1px solid #eee",
              padding: "16px",
            }}
            p={3}
          >
            <VStack spacing={8}>
              {isFetching || isUpdating ? (
                <Spinner />
              ) : (
                <>
                  <Box>
                    <State
                      incandenscentLampState={incandenscentLampState}
                      fluorescentLampState={fluorescentLampState}
                      temp={temp}
                      humidity={humidity}
                    />
                  </Box>
                  <Divider />
                  <Box>
                    <Settings
                      minLuminosity={minLuminosity}
                      minTemp={minTemp}
                      maxTemp={maxTemp}
                      minHumidity={minHumidity}
                      onSave={({
                        minLuminosity,
                        minTemp,
                        maxTemp,
                        minHumidity,
                      }) => {
                        setMinLuminosity(minLuminosity);
                        setMinTemp(minTemp);
                        setMaxTemp(maxTemp);
                        setMinHumidity(minHumidity);

                        update({
                          min_luminosity: minLuminosity,
                          min_temp: minTemp,
                          max_temp: maxTemp,
                          min_humidity: minHumidity,
                        });
                      }}
                    />
                  </Box>
                </>
              )}
            </VStack>
          </Grid>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

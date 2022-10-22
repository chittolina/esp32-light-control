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
  const [lampTime, setLampTime] = useState(120);
  const [lampState, setLampState] = useState(false);

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
      setMinLuminosity(state.lamp_sensibility);
      setLampState(!!state.lamp_state);
      setLampTime(state.lamp_time / 1000);
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
                    <State lampState={lampState} />
                  </Box>
                  <Divider />
                  <Box>
                    <Settings
                      luminosity={minLuminosity}
                      lampTime={lampTime}
                      onSave={({ luminosity, lampTime }) => {
                        setMinLuminosity(luminosity);
                        setLampTime(lampTime);
                        update({
                          lamp_sensibility: luminosity,
                          lamp_time: lampTime,
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

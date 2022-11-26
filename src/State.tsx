import React from "react";
import { Text, Heading, Divider } from "@chakra-ui/react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
interface Props {
  incandenscentLampState: boolean;
  fluorescentLampState: boolean;
  temp: number;
  humidity: number;
}

export const State: React.FC<Props> = ({
  incandenscentLampState,
  fluorescentLampState,
  temp,
  humidity,
}) => {
  return (
    <>
      <Heading size="md">Estado atual</Heading>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
        <div style={{ padding: "0 20px", textAlign: "center" }}>
          <Text
            as="span"
            style={{
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Lamp. Incandenscente
          </Text>

          {incandenscentLampState ? (
            <>
              <Text as="p" style={{ fontSize: "16px" }}>
                Ligada
              </Text>
            </>
          ) : (
            <>
              <Text as="p" style={{ fontSize: "16px" }}>
                Desligada
              </Text>
            </>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Text
            as="span"
            style={{
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Lamp. Fluorescente
          </Text>

          {fluorescentLampState ? (
            <>
              <Text as="p" style={{ fontSize: "16px" }}>
                Ligada
              </Text>
            </>
          ) : (
            <>
              <Text as="p" style={{ fontSize: "16px" }}>
                Desligada
              </Text>
            </>
          )}
        </div>
        <div style={{ padding: "0 20px", textAlign: "center" }}>
          <Text
            as="span"
            style={{
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Temperatura
          </Text>
          <Text as="p" style={{ fontSize: "16px" }}>
            {temp}°C
          </Text>
        </div>
        <div>
          <Text
            as="span"
            style={{
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Umidade do solo
          </Text>
          <Text as="p" style={{ fontSize: "16px" }}>
            {humidity}%
          </Text>
        </div>
      </div>
      {/* <Divider orientation="vertical" /> */}
      {/* <FaRegLightbulb /> */}
      <span className="icon">
        <i className="fas fa-home"></i>
      </span>
    </>
  );
};

import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  render,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { SchemaType } from "@/app/validations/schema";

const SuccessMail = (data: SchemaType) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                "hc-gray-400": "#8F9BBA",
                "hc-gray-500": "#68769F",
                "hc-gray-600": "#707EAE",
                "hc-gray-700": "#42559E",
                "hc-gray-800": "#1B2559",
                "hc-gray-900": "#485585",
                brand: "#007291",
                primary: "#4318FF",
              },
              fontFamily: {
                Inter: ['"Inter"', '"system-ui"', '"sans-serif"'],
              },
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-white font-sans text-hc-gray-800">
          <Container className="mx-auto my-[40px] w-[550px] rounded-lg border border-solid border-[#eaeaea] p-[20px] drop-shadow-xl">
            <Heading className="mx-0 my-[10px] p-0 text-center text-[24px] font-normal ">
              Your details
            </Heading>
            <Text className="text-[14px] leading-[24px] flex flex-col gap-3 justify-center item-center">
              {Object.keys(data).map((keyName) => (
                <Text className="block" key={keyName}>
                  <strong>{keyName}</strong>:{" "}
                  <span>{data[keyName as keyof SchemaType]}</span>
                </Text>
              ))}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SuccessMailEmailHTML = (props: SchemaType) =>
  render(<SuccessMail {...props} />);
export default SuccessMail;

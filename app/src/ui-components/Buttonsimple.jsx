/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function Buttonsimple(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="368px"
      height="60px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Buttonsimple")}
      {...rest}
    >
      <View
        width="368px"
        height="60px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        boxShadow="0px 1px 2px rgba(0, 0, 0, 0.0006000000284984708)"
        borderRadius="30px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(126,209,230,1)"
        {...getOverrideProps(overrides, "Rectangle 1")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="18px"
        fontWeight="700"
        color="rgba(255,255,255,1)"
        textTransform="uppercase"
        lineHeight="21.784090042114258px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="31.67%"
        bottom="31.67%"
        left="42.39%"
        right="42.39%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Login"
        {...getOverrideProps(overrides, "Login")}
      ></Text>
    </View>
  );
}

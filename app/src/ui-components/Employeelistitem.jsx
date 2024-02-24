/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Image, Text, View } from "@aws-amplify/ui-react";
export default function Employeelistitem(props) {
  const { employees, overrides, ...rest } = props;
  return (
    <View
      width="396px"
      height="80px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Employeelistitem")}
      {...rest}
    >
      <View
        width="396px"
        height="80px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        borderRadius="20px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Rectangle 3")}
      ></View>
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        position="absolute"
        top="50%"
        bottom="17.5%"
        left="78.79%"
        right="5.56%"
        borderRadius="20px"
        padding="5px 15px 5px 15px"
        backgroundColor="rgba(255,175,50,1)"
        {...getOverrideProps(overrides, "Frame 16")}
      >
        <Text
          fontFamily="Inter"
          fontSize="13px"
          fontWeight="600"
          color="rgba(22,71,142,1)"
          lineHeight="15.732954025268555px"
          textAlign="right"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={employees?.points}
          {...getOverrideProps(overrides, "0 pts")}
        ></Text>
      </Flex>
      <Image
        width="14.14%"
        height="70%"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="15%"
        bottom="15%"
        left="2.02%"
        right="83.84%"
        border="3px SOLID rgba(237,237,237,1)"
        borderRadius="28px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        src={employees?.profile_picture}
        {...getOverrideProps(overrides, "Rectangle 10")}
      ></Image>
      <Text
        fontFamily="Inter"
        fontSize="18px"
        fontWeight="600"
        color="rgba(0,0,0,1)"
        lineHeight="21.784090042114258px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="16.25%"
        bottom="56.25%"
        left="20.45%"
        right="68.18%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={employees?.name}
        {...getOverrideProps(overrides, "Demi")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
        color="rgba(2,5,10,1)"
        lineHeight="16.94318199157715px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="57.5%"
        bottom="21.25%"
        left="20.45%"
        right="74.49%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="RN"
        {...getOverrideProps(overrides, "RN")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
        color="rgba(2,5,10,0.5)"
        lineHeight="16.94318199157715px"
        textAlign="right"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="22.5%"
        bottom="56.25%"
        left="75.76%"
        right="9.34%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={employees?.status}
        {...getOverrideProps(overrides, "Available")}
      ></Text>
      <Icon
        width="10px"
        height="10px"
        viewBox={{ minX: 0, minY: 0, width: 10, height: 10 }}
        paths={[
          {
            d: "M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z",
            fill: "rgba(126,230,155,1)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="27.5%"
        bottom="60%"
        left="91.92%"
        right="5.56%"
        {...getOverrideProps(overrides, "Ellipse 2")}
      ></Icon>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="400"
        color="rgba(22,71,142,1)"
        lineHeight="16.94318199157715px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="57.5%"
        bottom="21.25%"
        left="33.33%"
        right="34.34%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={employees?.email}
        {...getOverrideProps(overrides, "demi@outlook.com")}
      ></Text>
    </View>
  );
}

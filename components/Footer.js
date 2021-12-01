import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { HiOutlineMail } from 'react-icons/hi'

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>made with ♥️ </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Website"} href={"https://cryptofund-blockchain.vercel.app/"}>
              {" "}
              <FaGlobe />
            </SocialButton>

            <SocialButton label={"Github"} href={"https://github.com/subhendu17620/cryptofund-blockchain"}>
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={"Email"}
              href={"mailto:subhendu17620@gmail.com"}
            >
              <HiOutlineMail />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

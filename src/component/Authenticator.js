import React from "react";
import {
  Authenticator as AmplifyAuthenticator,
  ThemeProvider as AmplifyThemeProvider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Typography } from "@mui/material";

export const Authenticator = ({ children }) => {
    const theme = {
      name: "bookshelf",
      tokens: {
        colors: {
          font: {
            secondary: { value: "{colors.brand.primary.90}" },
          },
          brand: {
            primary: {
              10: { value: "{colors.overlay.10}" },
              20: { value: "{colors.overlay.20}" },
              40: { value: "{colors.overlay.40}" },
              60: { value: "{colors.overlay.60}" },
              80: { value: "{colors.overlay.90}" },
              90: { value: "{colors.black}" },
              100: { value: "{colors.black}" },
            },
            secondary: {
              10: { value: "{colors.neutral.10}" },
              20: { value: "{colors.neutral.20}" },
              40: { value: "{colors.neutral.40}" },
              60: { value: "{colors.neutral.60}" },
              80: { value: "{colors.neutral.80}" },
              90: { value: "{colors.neutral.90}" },
              100: { value: "{colors.neutral.100}" },
            },
          },
        },
        radii: {
          small: { value: "0.75rem" },
        },
        components: {
          authenticator: {
            modal: {
              backgroundColor: { value: "{colors.brand.primary.80}" },
            },
            router: {
              borderWidth: { value: "0" },
            },
            state: {
              inactive: {
                backgroundColor: { value: "{colors.brand.primary.100}" },
              },
            },
          },
          tabs: {
            item: {
              color: { value: "{colors.white}" }, // Default text color
              backgroundColor: { value: "{colors.black}" }, // Default background
              borderColor: { value: "{colors.brand.primary.100}" },
              _active: {
                backgroundColor: { value: "{colors.brand.primary.100}" },
                color: { value: "{colors.white}" }, // Active text color
                borderColor: { value: "{colors.brand.secondary.40}" },
              },
              _hover: {
                backgroundColor: { value: "{colors.brand.primary.10}" }, // Hover background for inactive
                color: { value: "{colors.white}" }, // Hover text color for inactive
              },
              _focus: {
                backgroundColor: { value: "{colors.white}" },
                color: { value: "{colors.black}" },
              },
            },
          },
        },
      },
    };

  return (
    <AmplifyThemeProvider theme={theme}>
      <AmplifyAuthenticator
        variation="modal"
        signUpAttributes={["name"]}
        components={{
          Header: () => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                background: "#000",
                color: "#fff",
                py: "1rem",
                borderRadius: "1rem 1rem 0 0",
                marginTop: "4.5rem"
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 650, fontFamily: "Red Hat Display" }}
              >
                Tourable
              </Typography>
            </Box>
          ),
          Footer: () => (
            <Box
              sx={{
                background: "#fff",
                borderRadius: "0 0 1rem 1rem",
                py: "0.4rem",
              }}
            ></Box>
          ),
        }}
        formFields={{
          signIn: {
            username: {
              label: "Email",
              placeholder: "Enter your email",
            },
          },
          signUp: {
            name: {
              label: "Full Name",
              placeholder: "Enter your full name",
            },
          },
        }}
      >
        {children}
      </AmplifyAuthenticator>
    </AmplifyThemeProvider>
  );
};

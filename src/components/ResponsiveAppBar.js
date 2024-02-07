import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";
import { pages } from "../constants";

function ResponsiveAppBar({ balance }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountBalanceIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              to={`/`}
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Bank App
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <div key={index} style={{ marginRight: "10px" }}>
                {page === "Transactions" ? (
                  <Link
                    to={`/`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Link>
                ) : (
                  <Link
                    to={`/${page}`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Link>
                )}
              </div>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div>Balance: {balance}$</div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

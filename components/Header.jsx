import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { removeLocal } from "@/assets/localStorage";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PROJECTS } from "@/schema/gql/QuerysAndMutations";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "76ch",
    },
  },
}));

export default function PrimarySearchAppBar({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const router = useRouter();

  const [searchProjects, { loading, error, data }] =
    useLazyQuery(SEARCH_PROJECTS);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    searchProjects({ variables: { name: event.target.value } });
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function handleLogout() {
    removeLocal("token");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="mt-12"
    >
      <Link href="/profile">
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className="mt-12"
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static" className="header">
        <Toolbar>
          <Link href="/inicio">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Image
                width={100}
                height={100}
                alt="Logo"
                src={"/My_Logo.jpg"}
                className="rounded-full w-14"
              />
            </Typography>
          </Link>
          <Search className="w-[50%]">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className="!w-12 !h-12" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al buscar proyectos: {error.message}</p>
      ) : data && data.searchProjects ? (
        data.searchProjects.length > 0 ? (
          data.searchProjects.map((project) => (
            <Card key={project.id}>
              <a href={`/proyectos/${project.id}`}>
                <CardContent className="hover:bg-gray-300 transition-all ease-in-out">
                  <h3>{project.name}</h3>
                  <p>{project.image}</p>
                </CardContent>
              </a>
            </Card>
          ))
        ) : (
          <p>No se encontraron proyectos.</p>
        )
      ) : (
        ""
      )}
    </Box>
  );
}

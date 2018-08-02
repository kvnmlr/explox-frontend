<template>
  <Header>
    <navbar position="sticky-top" class="navbar-expand-lg black navbar-dark shadow">
      <mdb-navbar-brand href="/">
        <router-link to='/'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Logo_Strava.png" height="30px">
        </router-link>
      </mdb-navbar-brand>
      <navbar-collapse class="collapse">
        <navbar-nav class="mr-auto">
          <form class="form-inline">
            <input class="form-control mr-auto p-2" type="text" placeholder="Search" aria-label="Search">
          </form>
          <router-link to='/explore'><navbar-item><b>Explore</b></navbar-item></router-link>
          <router-link to='/routes'><navbar-item><b>Routes</b></navbar-item></router-link>
          <router-link to='/about'><navbar-item><b>About</b></navbar-item></router-link>

        </navbar-nav>
        <btn color="amber">Login</btn>
        <btn color="elegant">Register</btn>

        <dropdown>
          <dropdown-toggle tag="btn" style="margin-right: 15px;" color="amber" slot="toggle">
            <i class="fa fa-plus"></i>
            New
          </dropdown-toggle>
          <dropdown-menu left>
            <dropdown-item>Create Route</dropdown-item>
            <dropdown-item>Create Plan</dropdown-item>
            <dropdown-item>Find Routes</dropdown-item>
          </dropdown-menu>
        </dropdown>
        <dropdown>
          <dropdown-toggle tag="btn" color="elegant" slot="toggle">
            <i class="fa fa-user"></i>
            Profile
          </dropdown-toggle>
          <dropdown-menu right>
            <dropdown-item>Profile</dropdown-item>
            <dropdown-item>Statistics</dropdown-item>
            <dropdown-item>Friends</dropdown-item>
          </dropdown-menu>
        </dropdown>
      </navbar-collapse>
    </navbar>
  </Header>
</template>

<script>
  import {
    Navbar,
    NavbarCollapse,
    NavbarItem,
    NavbarNav,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    mdbNavbarBrand,
    Btn
  } from 'mdbvue';

  export default {
    components: {
      Navbar, NavbarNav, NavbarItem, NavbarCollapse, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Btn, mdbNavbarBrand
    },
    name: "header"
  }
</script>

<style scoped>
</style>

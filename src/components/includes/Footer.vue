<template>
  <Footer color="orange" class="font-small pt-4 mt-4">
    <container class="text-left">
      <row>
        <column sm="6">
          <h5 class="title">Footer Content</h5>
          <p>Here you can use rows and columns here to organize your footer content.</p>
        </column>
        <column sm="6">
          <h5 class="title">Links</h5>
          <ul>
            <li class="list-unstyled"><a href="#!">Link 1</a></li>
            <li class="list-unstyled"><a href="#!">Link 2</a></li>
            <li class="list-unstyled"><a href="#!">Link 3</a></li>
            <li class="list-unstyled"><a href="#!">Link 4</a></li>
          </ul>
        </column>
      </row>
    </container>
    <div class="footer-copyright text-center py-3">
      <container fluid>
        &copy; 2018 Copyright: <a href="https://www.MDBootstrap.com"> Explox.com </a>
      </container>
    </div>
  </Footer>
</template>

<script>
  import {Footer, Row, Column, Container} from 'mdbvue';

  export default {
    components: {
      Footer, Column, Row, Container
    },
    name: "footer"
  }
</script>

<style scoped>
  Footer
  {
    clear: both;
    color: White;
    vertical-align: middle;
    margin: 0;
    position: relative;
    bottom: 0px;
    width: 100%;
  }
</style>

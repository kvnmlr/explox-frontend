<template>
  <div>
    <h1>Welcome Athletes!</h1>

    <p>Tired of running or cycling the same old routes over and over again? Explox takes your and other
      atheltes' activity history and creates new and unique routes for you. All you need is an account on Strava.</p>

    <btn outline="orange darken-1">Log In</btn>
    &nbsp;
    <btn color="orange darken-1">Sign Up</btn>
    <div class="separator"></div>
    <!-- Page Features-->
    <row class="text-center">
      <column class="col-lg-4 col-md-6 mb-4">
        <card class="shadow">
          <card-img src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"></card-img>
          <card-body>
            <card-title>Strava Routes</card-title>
            <card-text>Find out which routes other athletes take, try them out and give feedback.</card-text>
          </card-body>
          <card-footer>
            <btn color="orange darken-1">Find Out More</btn>
            <btn color="orange darken-1">See Routes</btn>
          </card-footer>
        </card>
      </column>
      <column class="col-lg-4 col-md-6 mb-4">
        <card class="shadow">
          <card-img src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"></card-img>
          <card-body>
            <card-title>Activity Map</card-title>
            <card-text>Mix up your routine by finding areas that you have not visited yet.</card-text>
          </card-body>
          <card-footer>
            <btn color="orange darken-1">Find Out More</btn>
            <btn color="orange darken-1">See Yours</btn>
          </card-footer>
        </card>
      </column>
      <column class="col-lg-4 col-md-6 mb-4">
        <card class="shadow">
          <card-img src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"></card-img>
          <card-body>
            <card-title>Route Generation</card-title>
            <card-text>Get personalized route recommendations and explore your area.</card-text>
          </card-body>
          <card-footer class="card-footer">
            <btn color="orange darken-1">Find Out More</btn>
            <btn color="orange darken-1">Start Now</btn>
          </card-footer>
        </card>
      </column>
    </row>
  </div>
</template>

<script>
  import {Card, CardImg, CardBody, CardFooter, CardTitle, CardText, Btn, Row, Column} from 'mdbvue';

  export default {
    components: {
      Card,
      CardImg,
      CardBody,
      CardTitle,
      CardText,
      Btn,
      Row,
      Column,
      CardFooter
    },
    name: 'Landing Page'
  }
</script>

<style>
</style>

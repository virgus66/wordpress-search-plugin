<?php 

function ucado_add_scripts() {
  wp_enqueue_style('ucado-main-style', plugins_url().'/ucado-plugin/css/style.css',array(), time());
  wp_enqueue_style('material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
  wp_enqueue_script('ucado-data-transfer', plugins_url().'/ucado-plugin/js/DataTransfer.js','',false,true);
  wp_enqueue_script('ucado-scripts', plugins_url().'/ucado-plugin/js/main.js','',false,true);
  wp_enqueue_script('google-api-scripts', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBgQ5E4Laeib6D2d7XgMJegFuPMZsBv4-k&libraries=places&callback=initAutocomplete','',false,true);
}

add_action('wp_enqueue_scripts', 'ucado_add_scripts');

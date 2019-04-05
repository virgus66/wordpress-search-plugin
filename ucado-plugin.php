<?php
/**
 * Plugin Name: Ucado Searchbar Plugin
 * Plugin URI: http://www.ucado.co.uk/app
 * Description: The very first plugin that I have ever created.
 * Version: 1.2
 * Author: David Cabala
 * Author URI: 
 */

// add_action('admin_menu', "ucadoAddMenu");
// function ucadoAddMenu() {
//   add_menu_page("example option", "Example options 1", 4, "example-options", "exampleMenu");
//   add_submenu_page('example-options', 'option 1', 'option 1', 4, 'example-option-1', 'option-1');
// }
// function exampleMenu() {
//   echo "hello from menu";
// }


defined('ABSPATH') or die('You don\'t have an access here human');
if ( !function_exists('add_action') ) {
  echo "can't access file silly human!";
  exit;
}

require_once( plugin_dir_path(__FILE__).'/ucado-plugin-scripts.php' );



if (!class_exists('UcadoSearchWidget')) {
  class UcadoSearchWidget extends WP_Widget {

    public function __construct() {
      parent::WP_Widget(false,'Ucado SearchBar Widget');
    }

    public function form($instance) {
      if (!empty($instance)) {
        $title = $instance['title'];
        $desc  = $instance['description'];
      }
      else {
        $title = '-';
        $desc  = '-';
      }

      ?>
          <label for="<?php echo $this->get_field_id('title'); ?>">Search:</label>
          <input name="<?php echo $this->get_field_name('title'); ?>" id="<?php echo $this->get_field_id('title'); ?>" type="text" value="<?php echo $title; ?>"/>

          <label for="<?php echo $this->get_field_id('description'); ?>">Description</label>
          <textarea name="<?php echo $this->get_field_name('description'); ?>" id="<?php echo $this->get_field_id('description'); ?>"><?php echo $desc; ?></textarea>
      <?php
    }

    public function update( $new_instance, $old_instance ) {
      $instance = $old_instance;
      $instance['title'] = $new_instance['title'];
      $instance['description'] = $new_instance['description'];
      return $instance;
    }

    public function widget( $args, $instance ) {
      echo $args['before_widget'];

      $radiusOptions = '';
      // for ($i=10;$i<=150;$i+=10) {
      //   $radiusOptions .= "<option value='{$i}'>+{$i} miles</option>";
      // }
      $radiusOptions .= "<option value='1'>1 mile</option>";
      $radiusOptions .= "<option value='2'>2 miles</option>";
      $radiusOptions .= "<option value='5'>5 miles</option>";
      $radiusOptions .= "<option value='10'>10 miles</option>";
      $radiusOptions .= "<option value='20'>20 miles</option>";
      $radiusOptions .= "<option value='50'>50 miles</option>";
      $radiusOptions .= "<option value='100'>100 miles</option>";
      $radiusOptions .= "<option value='200'>200 miles</option>";


      $bedsOptions = '';
      $bedsOptions .= '<option value="1">1 Bed</option>';
      $bedsOptions .= '<option value="2">2 Bed</option>';
      $bedsOptions .= '<option value="3">3 Bed</option>';
      $bedsOptions .= '<option value="4">4 Bed</option>';
      $bedsOptions .= '<option value="5">5 Bed</option>';
      $bedsOptions .= '<option value="6">6 Bed</option>';
      $bedsOptions .= '<option value="7">7 Bed</option>';
      $bedsOptions .= '<option value="8">8 Bed</option>';
      $bedsOptions .= '<option value="9">9 Bed</option>';
      $bedsOptions .= '<option value="10">10 Bed</option>';
      $bedsOptions .= '<option value="0">Max Bed</option>';


      $propertyTypes = ['Apartment'=>5, 'Bungalow'=>4, 'Coastal'=>9, 'Country Estate'=>6, 'Detached'=>1, /* 'Dormer Bungalow'=>4,  */
                        'Farm'=>7, /* 'Houseboat'=>8, */ 'Plot'=>10, 'Semi Detached'=>2, 'Terrace'=>3];
      $typesOptions = '';
      foreach( $propertyTypes as $type => $id ) {
        $typesOptions .= "<option value={$id}>{$type}</option>";
      }

      echo "
        <div style='height:1px; width: 100%; background-color:#feb217;'></div>

        <form onsubmit='return false;' style='margin-top:15px;'>
          <div class='row search-div'>
            <div class=' col-lg-7 col-md-7 col-sm-12 col-xs-7' style='position:relative;'>
              <img src='". plugins_url() ."/ucado-plugin/css/search.svg' class='search-image'>
              <input type='text' name='input1' id='location-input' placeholder='{$instance['title']}'/>
            </div>
            <div class=' col-lg-5 col-md-5 col-sm-12 col-xs-5'>
              <p>Get Started Today</p>
              <p>Find your perfect property</p>
            </div>
            </div>
            
            <div class='row search-div' style='margin-bottom:0;'>
              <div class='col-lg-4 col-md-12 col-sm-12' id='get-location-button'>
                <img src='". plugins_url() ."/ucado-plugin/css/image.svg'  id='image1'>
                <img src='". plugins_url() ."/ucado-plugin/css/loader.gif' id='image2' style='display:none; width: 20px;'> 
                <span style='margin-left:5px'>Use current location</span>
              </div>
            </div>
        </form>
      ";

      echo $args['after_widget'];
    }
  }

  function register_my_widget() {
    register_widget("UcadoSearchWidget");
  }
  add_action("widgets_init","register_my_widget");

}

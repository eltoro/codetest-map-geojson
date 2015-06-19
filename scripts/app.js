'use strict';

// Using Browserify so this loads the modules
var $ = require('jquery');
global.jQuery = require("jquery");
require('mapbox.js');


$(document).ready(function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoiZWxhbWlzb24iLCJhIjoiSUpBbmZVUSJ9.CucBgoflPx6SpwQn78TTjQ';
  var map = L.mapbox.map('map', 'mapbox.streets',{
      center: [39.8282, -98.5795],
      zoom: 6
  });

  // Load the GeoJSON file and add the popups for each feature
  var featureLayer = L.mapbox.featureLayer().loadURL('/data/states.json')
    .on('ready', function(layer) {
      // Could replace this with a spinner
      $('#loader').hide();
      this.eachLayer(function(locale) {
        var prop = locale.feature.properties;
        var popup = '<div class="panel panel-default"><div class="panel-body"><h2><i class="fa fa-map-marker"></i>'+prop.NAME+'</h2><div>';
        popup += 'GEO_ID: '+prop.GEO_ID+'<br>'
        popup += 'STATE: '+prop.STATE+'<br>'
        popup += 'LSAD: '+prop.LSAD+'<br>'
        popup += 'CENSUSAREA: '+prop.CENSUSAREA+'<br>'
        popup += '</div></div>'
        locale.bindPopup(popup);
      });
    }).addTo(map);
});

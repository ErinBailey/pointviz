// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
var extent = [312.570315, 23.790972, 312.574253, 25.277709]; //min lon, min lat, max lon, max lat

//Mouse position
var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(7),
  projection: projection,
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

var projection = new ol.proj.Projection({
  units: 'degrees',
  extent: extent
});

var heatmapLayer = new ol.layer.Heatmap({
		source: new ol.source.GeoJSON({
		url: '/static/geojson.json',
		projection: projection,
    })
});

var backgroundLayer = new ol.layer.Image({
      source: new ol.source.ImageStatic({
        url: '/static/images/SP_2B2_01_01399_N245_E3126.jpg',
        projection: projection,
        imageExtent: extent
    })
});

var pointsLayer = new ol.layer.Vector({
	  title: 'points',
	  source: new ol.source.GeoJSON({
		url: '/static/geojson.json'
	  }),
	  style: new ol.style.Style({
		image: new ol.style.Circle({
		  radius: 3,
		  fill: new ol.style.Fill({color: 'red'})
		})
	  })
});

var map = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
		  collapsible: false
		})
	  }).extend([mousePositionControl]),
  layers: [backgroundLayer, pointsLayer, heatmapLayer],
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: ol.extent.getCenter(extent),
    zoom: 1
  })
});

var visiblePT = new ol.dom.Input(document.getElementById('visiblePT'));
visiblePT.bindTo('checked', pointsLayer, 'visible');

var opacityPT = new ol.dom.Input(document.getElementById('opacityPT'));
opacityPT.bindTo('value', pointsLayer, 'opacity')
    .transform(parseFloat, String);
	
var visibleHM = new ol.dom.Input(document.getElementById('visibleHM'));
visibleHM.bindTo('checked', heatmapLayer, 'visible');

var opacityHM = new ol.dom.Input(document.getElementById('opacityHM'));
opacityHM.bindTo('value', heatmapLayer, 'opacity')
    .transform(parseFloat, String);

var blurHM = new ol.dom.Input(document.getElementById('blurHM'));
blurHM.bindTo('value', heatmapLayer, 'blur')
    .transform(parseFloat, String);

var radiusHM = new ol.dom.Input(document.getElementById('radiusHM'));
radiusHM.bindTo('value', heatmapLayer, 'radius')
    .transform(parseFloat, String);
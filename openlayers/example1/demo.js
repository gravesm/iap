$(function() {

    var map, baselayer;
    
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913"
    });
    
    baselayer = new OpenLayers.Layer.Google("Google Layer");
    
    map.addLayer(baselayer);
    
    map.zoomToMaxExtent();
 
});
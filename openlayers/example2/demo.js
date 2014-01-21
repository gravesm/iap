$(function() {
    var map, baselayer, point, feature, points;
    
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913"
    });

    baselayer = new OpenLayers.Layer.Google("Google Layer");
    map.addLayer(baselayer);

    point = new OpenLayers.Geometry.Point(-71.063, 42.358).transform(
        "EPSG:4326", "EPSG:900913");
    feature = new OpenLayers.Feature.Vector(point);

    points = new OpenLayers.Layer.Vector("Points");
    points.addFeatures([feature]);
    map.addLayer(points);

    map.zoomToMaxExtent();

});
$(function() {

    var map, baselayer, points, center;
    
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913"
    });

    baselayer = new OpenLayers.Layer.Google("Google Layer");
    map.addLayer(baselayer);

    points = new OpenLayers.Layer.Vector("Points", {
        projection: "EPSG:4326",
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "/gh/gist/response.xml/7758221/",
            format: new OpenLayers.Format.KML()
        })
    });

    map.addLayer(points);
    center = new OpenLayers.LonLat(-71.063, 42.358).transform(
        "EPSG:4326", "EPSG:900913");
    map.setCenter(center, 14);
    
});
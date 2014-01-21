$(function() {
    
    var map, baselayer, bridges, center;
    
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:3857",
        numZoomLevels: 20
    });

    baselayer = new OpenLayers.Layer.Google("Google Layer");
    map.addLayer(baselayer);

    bridges = new OpenLayers.Layer.Vector("Bridges", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        protocol: new OpenLayers.Protocol.WFS({
            url: "http://delisle.mit.edu:8080/geoserver/wfs",
            featureType: "paris_bridges"
        })
    });

    map.addLayer(bridges);

    map.addControl(new OpenLayers.Control.SelectFeature(
        bridges, {
            autoActivate: true,
            eventListeners: {
                featurehighlighted: function(ev) {
                    $("#output").text(ev.feature.attributes.NAME);
                }
        }
    }));

    center = new OpenLayers.LonLat(2.35, 48.853).transform("EPSG:4326", "EPSG:3857");
    map.setCenter(center, 14);

});
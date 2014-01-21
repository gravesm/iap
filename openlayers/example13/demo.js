$(function() {

    var map, baselayer, paris;

    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:3857",
        numZoomLevels: 20
    });

    baselayer = new OpenLayers.Layer.Google("Google Layer");
    map.addLayer(baselayer);

    paris = new OpenLayers.Layer.WMS("WMS", "http://delisle.mit.edu:8080/geoserver/wms", {
        transparent: true,   
        layers: "iap:fourth_arrondissement",
        tiled: true
    }, {
        opacity: 0.7
    });

    map.addLayer(paris);

    map.addControl(new OpenLayers.Control.GetFeature({
        protocol: OpenLayers.Protocol.WFS.fromWMSLayer(paris),
        eventListeners: {
            featureselected: function(ev) {
                $("#output").text(ev.feature.attributes.NAME);
            }
        },
        autoActivate: true
    }));

    center = new OpenLayers.LonLat(2.35, 48.853).transform("EPSG:4326", "EPSG:3857");
    map.setCenter(center, 14);

});
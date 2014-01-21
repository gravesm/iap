$(function() {

    var map, baselayer, paris, max, panel, editable, modify;

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

    editable = new OpenLayers.Layer.Vector("Editable");

    map.addLayer(editable);

    max = new OpenLayers.Control.ZoomToMaxExtent();
    panel = new OpenLayers.Control.Panel({
        allowDepress: true
    });

    modify = new OpenLayers.Control.ModifyFeature(editable, {
        mode: OpenLayers.Control.ModifyFeature.RESIZE |
              OpenLayers.Control.ModifyFeature.DRAG |
              OpenLayers.Control.ModifyFeature.ROTATE
    });

    panel.addControls([max, modify]);
    map.addControl(panel);

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
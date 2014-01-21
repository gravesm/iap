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
    feature = new OpenLayers.Feature.Vector(point, {
        name: "Boston",
        size: 20
    });

    points = new OpenLayers.Layer.Vector("Points", {
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                pointRadius: "${size}",
                fillColor: "#FFC900",
                fillOpacity: 0.4,
                strokeWidth: 1,
                strokeColor: "#FFFFFF"
            }, {
                context: {
                    size: function(feature) {
                        var size = feature.attributes.size;
                        return Math.max(1, Math.log(size)) * 3;
                    }
                }
            }),
            select: new OpenLayers.Style({
                fillColor: "#25D500"
            })
        })
    });

    points.addFeatures([feature]);
    map.addLayer(points);

    map.addControl(new OpenLayers.Control.SelectFeature(
        points, {
            hover: true,
            highlightOnly: true,
            autoActivate: true
        })
    );
    
    map.addControl(new OpenLayers.Control.SelectFeature(
        points, {
            autoActivate: true,
            eventListeners: {
                featurehighlighted: function(ev) {
                    $("#output").text(ev.feature.attributes.name);
                }
        }
    }));
    
    map.zoomToMaxExtent();

});
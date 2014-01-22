$(function() {

    var map, baselayer, point, feature, points;

    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913"
    });

    baselayer = new OpenLayers.Layer.Google("Google Layer");
    map.addLayer(baselayer);

    point1 = new OpenLayers.Geometry.Point(-71.063, 42.358).transform(
        "EPSG:4326", "EPSG:900913");
    feature1 = new OpenLayers.Feature.Vector(point1, {
        name: "Boston",
        size: 20
    });

    point2 = new OpenLayers.Geometry.Point(2.35, 48.853).transform(
        "EPSG:4326", "EPSG:900913");
    feature2 = new OpenLayers.Feature.Vector(point2, {
        name: "Paris",
        size: 30
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
                },
                rules: [
                    new OpenLayers.Rule({
                        filter: new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.GREATER_THAN,
                            property: "size",
                            value: 20
                        }),
                        symbolizer: {
                            fillColor: "blue",
                            label: "${name}",
                            fontColor: "#ff3300",
                            fontWeight: "bold"
                        }
                    }),
                    new OpenLayers.Rule({
                        elseFilter: true
                    })
                ]
            }),
            select: new OpenLayers.Style({
                fillColor: "#25D500"
            })
        })
    });

    points.addFeatures([feature1, feature2]);
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
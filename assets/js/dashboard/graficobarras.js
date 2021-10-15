am4core.useTheme(am4themes_animated);
var data = [{
  "carrera": "Medicina",
  "ramos": 20,
  "mtData": [{
    "value": 10,
    "title": "Sin Cambios"
  }, {
    "value": 3,
    "title": "Realizados"
  }, {
    "value": 7,
    "title": "Sin Realizar"
  }]
}, {
  "carrera": "Enfermeria",
  "ramos": 12,
  "mtData": [{
    "value": 2,
    "title": "Sin Cambios"
  }, {
    "value": 8,
    "title": "Realizados"
  }, {
    "value": 2,
    "title": "Sin Realizar"
  }]
}, {
  "carrera": "Kinesiología",
  "ramos": 6,
  "mtData": [{
    "value": 4,
    "title": "Sin Cambios"
  }, {
    "value": 2,
    "title": "Realizados"
  }, {
    "value": 0,
    "title": "Sin Realizar"
  }]
}];


// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

// Add data
chart.data = data;

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "carrera";
categoryAxis.renderer.grid.template.disabled = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Modificaciones Transitorias";
valueAxis.min = 0;
valueAxis.renderer.baseGrid.disabled = true;
valueAxis.renderer.grid.template.strokeOpacity = 0.07;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "ramos";
series.dataFields.categoryX = "carrera";
series.tooltip.pointerOrientation = "vertical";


var columnTemplate = series.columns.template;
// add tooltip on column, not template, so that slices could also have tooltip
columnTemplate.column.tooltipText = "Datos: {name}\nCarrera: {categoryX}\nAsignaturas: {valueY}";
columnTemplate.column.tooltipY = 0;
columnTemplate.column.cornerRadiusTopLeft = 20;
columnTemplate.column.cornerRadiusTopRight = 20;
columnTemplate.strokeOpacity = 0;


// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
columnTemplate.adapter.add("fill", function(fill, target) {
  var color = chart.colors.getIndex(target.dataItem.index * 3);
  return color;
});

// create pie chart as a column child
var pieChart = series.columns.template.createChild(am4charts.PieChart);
pieChart.width = am4core.percent(80);
pieChart.height = am4core.percent(80);
pieChart.align = "center";
pieChart.valign = "middle";
pieChart.dataFields.data = "mtData";

var pieSeries = pieChart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "title";
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;
pieSeries.slices.template.strokeWidth = 1;

pieSeries.slices.template.adapter.add("stroke", function(stroke, target) {
  return chart.colors.getIndex(target.parent.parent.dataItem.index * 3);
});

pieSeries.slices.template.adapter.add("fill", function(fill, target) {
  return am4core.color("#ffffff")
});

pieSeries.slices.template.adapter.add("fillOpacity", function(fillOpacity, target) {
  return (target.dataItem.index + 1) * 0.2;
});

pieSeries.hiddenState.properties.startAngle = -90;
pieSeries.hiddenState.properties.endAngle = 270;

// this moves the pie out of the column if column is too small
pieChart.adapter.add("verticalCenter", function(verticalCenter, target) {
  var point = am4core.utils.spritePointToSprite({ x: 0, y: 0 }, target.seriesContainer, chart.plotContainer);
  point.y -= target.dy;

  if (point.y > chart.plotContainer.measuredHeight - 15) {
    target.dy = -target.seriesContainer.measuredHeight - 15;
  }
  else {
    target.dy = 0;
  }
  return verticalCenter
})
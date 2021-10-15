// Create chart instance
var chart2 = am4core.create("chartdiv2", am4charts.RadarChart);

// Add data
chart2.data = [{
  "Carrera": "Kinesiología",
  "value": 80,
  "full": 100
}, {
  "Carrera": "Enfermería",
  "value": 35,
  "full": 100
}, {
  "Carrera": "Odontología",
  "value": 92,
  "full": 100
}, {
  "Carrera": "Medicina",
  "value": 68,
  "full": 100
}];

// Make chart not full circle
chart2.startAngle = -90;
chart2.endAngle = 180;
chart2.innerRadius = am4core.percent(20);

// Set number format
chart2.numberFormatter.numberFormat = "#.#'%'";

// Create axes
var categoryAxis = chart2.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "Carrera";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.fontWeight = 100;
categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
  return (target.dataItem.index >= 0) ? chart2.colors.getIndex(target.dataItem.index) : fill;
});
categoryAxis.renderer.minGridDistance = 10;

var valueAxis = chart2.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.max = 100;
valueAxis.strictMinMax = true;

// Create series
var series1 = chart2.series.push(new am4charts.RadarColumnSeries());
series1.dataFields.valueX = "full";
series1.dataFields.categoryY = "Carrera";
series1.clustered = false;
series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
series1.columns.template.fillOpacity = 0.08;
series1.columns.template.cornerRadiusTopLeft = 20;
series1.columns.template.strokeWidth = 0;
series1.columns.template.radarColumn.cornerRadius = 20;

var series2 = chart2.series.push(new am4charts.RadarColumnSeries());
series2.dataFields.valueX = "value";
series2.dataFields.categoryY = "Carrera";
series2.clustered = false;
series2.columns.template.strokeWidth = 0;
series2.columns.template.tooltipText = "{Carrera}: [bold]{value}[/]";
series2.columns.template.radarColumn.cornerRadius = 20;

series2.columns.template.adapter.add("fill", function(fill, target) {
  return chart2.colors.getIndex(target.dataItem.index);
});

// Add cursor
chart2.cursor = new am4charts.RadarCursor();
// randomly generated data (acceleration)

var values = readData();

degreesFormatter = function (timestamp, data) {
    var timestampFormatter = this.options.timestampFormatter || SmoothieChart.timeFormatter,
        lines = [timestampFormatter(new Date(timestamp))],
        label;

    for (var i = 0; i < data.length; ++i) {
      label = data[i].series.options.tooltipLabel || ''
      if (label !== ''){
          label = label + ' ';
      }
      lines.push('<span style="color:' + data[i].series.options.strokeStyle + '">' +
      label +
      this.options.yMaxFormatter(data[i].value, this.options.labels.precision) +
      ' &deg;C' +
      '</span>');
    }

    return lines.join('<br>');
};

percentRHFormatter = function (timestamp, data) {
    var timestampFormatter = this.options.timestampFormatter || SmoothieChart.timeFormatter,
        lines = [timestampFormatter(new Date(timestamp))],
        label;

    for (var i = 0; i < data.length; ++i) {
      label = data[i].series.options.tooltipLabel || ''
      if (label !== ''){
          label = label + ' ';
      }
      lines.push('<span style="color:' + data[i].series.options.strokeStyle + '">' +
      label +
      this.options.yMaxFormatter(data[i].value, this.options.labels.precision) +
      ' %RH' +
      '</span>');
    }

    return lines.join('<br>');
};

accelFormatter = function (timestamp, data) {
    var timestampFormatter = this.options.timestampFormatter || SmoothieChart.timeFormatter,
        lines = [timestampFormatter(new Date(timestamp))],
        label;

    for (var i = 0; i < data.length; ++i) {
      label = data[i].series.options.tooltipLabel || ''
      if (label !== ''){
          label = label + ' ';
      }
      lines.push('<span style="color:' + data[i].series.options.strokeStyle + '">' +
      label +
      this.options.yMaxFormatter(data[i].value, this.options.labels.precision) +
      ' m/s&sup2;' +
      '</span>');
    }

    return lines.join('<br>');
};

pressureFormatter = function (timestamp, data) {
    var timestampFormatter = this.options.timestampFormatter || SmoothieChart.timeFormatter,
        lines = [timestampFormatter(new Date(timestamp))],
        label;

    for (var i = 0; i < data.length; ++i) {
      label = data[i].series.options.tooltipLabel || ''
      if (label !== ''){
          label = label + ' ';
      }
      lines.push('<span style="color:' + data[i].series.options.strokeStyle + '">' +
      label +
      this.options.yMaxFormatter(data[i].value, this.options.labels.precision) +
      ' kPa' +
      '</span>');
    }

    return lines.join('<br>');
};

altitudeFormatter = function (timestamp, data) {
    var timestampFormatter = this.options.timestampFormatter || SmoothieChart.timeFormatter,
        lines = [timestampFormatter(new Date(timestamp))],
        label;

    for (var i = 0; i < data.length; ++i) {
      label = data[i].series.options.tooltipLabel || ''
      if (label !== ''){
          label = label + ' ';
      }
      lines.push('<span style="color:' + data[i].series.options.strokeStyle + '">' +
      label +
      this.options.yMaxFormatter(data[i].value, this.options.labels.precision) +
      ' m' +
      '</span>');
    }

    return lines.join('<br>');
};

photodiodeFormatter = function (timestamp, data) {
    var timestampFormatter = this.options.timestampFormatter || SmoothieChart.timeFormatter,
        lines = [timestampFormatter(new Date(timestamp))],
        label;

    for (var i = 0; i < data.length; ++i) {
      label = data[i].series.options.tooltipLabel || ''
      if (label !== ''){
          label = label + ' ';
      }
      lines.push('<span style="color:' + data[i].series.options.strokeStyle + '">' +
      label +
      this.options.yMaxFormatter(data[i].value, this.options.labels.precision) +
      ' mV' +
      '</span>');
    }

    return lines.join('<br>');
};

var ts_accel = new TimeSeries();
setInterval(function() {
  ts_accel.append(new Date().getTime(), values['accel']);
}, 100);

var ts_temp = new TimeSeries();
setInterval(function() {
  ts_temp.append(new Date().getTime(), values['Temperature']);
}, 100);

var ts_humid = new TimeSeries();
setInterval(function() {
  ts_humid.append(new Date().getTime(), values['Humidity']);
}, 100);

var ts_photodiode = new TimeSeries();
setInterval(function() {
  ts_photodiode.append(new Date().getTime(), values['photodiode']);
}, 100);

var ts_co2 = new TimeSeries();
setInterval(function() {
  ts_co2.append(new Date().getTime(), values['CO2']);
}, 100);

var ts_tvoc = new TimeSeries();
setInterval(function() {
  ts_tvoc.append(new Date().getTime(), values['TVOC']);
}, 100);

var ts_alt = new TimeSeries();
setInterval(function() {
  ts_alt.append(new Date().getTime(), values['Altitude']);
}, 100);

var ts_pressure = new TimeSeries();
setInterval(function() {
  ts_pressure.append(new Date().getTime(), values['Pressure']);
}, 100);

var ts_satellites = new TimeSeries();
setInterval(function() {
  ts_satellites.append(new Date().getTime(), values['satellites']);
}, 100);

function createTimeline() {
  var chart_accel = new SmoothieChart({
    tooltip: true,
    maxValueScale: 1.5,
    minValueScale: 1.5,
    millisPerPixel: 11,
    scaleSmoothing: 0.56,
    tooltipFormatter: accelFormatter,
    grid: {
      fillStyle: '#3b4253',
      strokeStyle: '#3b4253',
      verticalSections: 0
    },
    labels: {
      fillStyle: '#e5e9f0',
    }
  });
  chart_accel.addTimeSeries(ts_accel, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_accel.streamTo(document.getElementById("chart_accel"), 75);

  var chart_temp = new SmoothieChart({
    tooltip: true,
    maxValueScale: 1.5,
    minValueScale: 1.5,
    millisPerPixel: 11,
    scaleSmoothing: 0.56,
    tooltipFormatter: degreesFormatter,
    grid: {
      fillStyle: '#3b4253',
      strokeStyle: '#3b4253',
      verticalSections: 0
    },
    labels: {
      fillStyle: '#e5e9f0'
    }
  });
  chart_temp.addTimeSeries(ts_temp, {
    lineWidth: 2,
    strokeStyle: '#a2bf8a'
  });
  chart_temp.streamTo(document.getElementById("chart_temp"), 75);

  var chart_humid = new SmoothieChart({
    tooltip: true,
    maxValueScale: 1.5,
    minValueScale: 1.5,
    millisPerPixel: 11,
    scaleSmoothing: 0.56,
    tooltipFormatter: percentRHFormatter,
    grid: {
      fillStyle: '#3b4253',
      strokeStyle: '#3b4253',
      verticalSections: 0
    },
    labels: {
      fillStyle: '#e5e9f0'
    }
  });
  chart_humid.addTimeSeries(ts_humid, {
    lineWidth: 2,
    strokeStyle: '#edcc87'
  });
  chart_humid.streamTo(document.getElementById("chart_humid"), 75);

  var chart_pressure = new SmoothieChart({
    tooltip: true,
    maxValueScale: 1.5,
    minValueScale: 1.5,
    millisPerPixel: 11,
    scaleSmoothing: 0.56,
    tooltipFormatter: pressureFormatter,
    grid: {
      fillStyle: '#3b4253',
      strokeStyle: '#3b4253',
      verticalSections: 0
    },
    labels: {
      fillStyle: '#e5e9f0'
    }
  });
  chart_pressure.addTimeSeries(ts_pressure, {
    lineWidth: 2,
    strokeStyle: '#e5e9f0'
  });
  chart_pressure.streamTo(document.getElementById("chart_co2"), 75);

  var chart_tvoc = new SmoothieChart({
    tooltip: true,
    maxValueScale: 1.5,
    minValueScale: 1.5,
    millisPerPixel: 11,
    scaleSmoothing: 0.56,
    tooltipFormatter: altitudeFormatter,
    grid: {
      fillStyle: '#3b4253',
      strokeStyle: '#3b4253',
      verticalSections: 0
    },
    labels: {
      fillStyle: '#e5e9f0'
    }
  });
  chart_tvoc.addTimeSeries(ts_alt, {
    lineWidth: 2,
    strokeStyle: '#b58dae'
  });
  chart_tvoc.streamTo(document.getElementById("chart_tvoc"), 75);

  var chart_photodiode = new SmoothieChart({
    tooltip: true,
    maxValueScale: 1.5,
    minValueScale: 1.5,
    millisPerPixel: 11,
    scaleSmoothing: 0.56,
    tooltipFormatter: photodiodeFormatter,
    grid: {
      fillStyle: '#3b4253',
      strokeStyle: '#3b4253',
      verticalSections: 0
    },
    labels: {
      fillStyle: '#e5e9f0'
    }
  });
  chart_photodiode.addTimeSeries(ts_photodiode, {
    lineWidth: 2,
    strokeStyle: '#86c0d1'
  });
  chart_photodiode.streamTo(document.getElementById("chart_photodiode"), 75);
}

createTimeline();

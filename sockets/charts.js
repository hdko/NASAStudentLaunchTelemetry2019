$(window).on('resize', function(){
  $(".smoothie-chart").each(function(){
    $(this)[0].width = $(".chart").width();
    $(this)[0].height = $(document).width()/10;
  });
});

$(document).ready(function(){
  $(".smoothie-chart").each(function(){
    $(this)[0].width = $(".chart").width();
    $(this)[0].height = $(document).width()/10;
  });
});
var values = readData();

tempFormatter = function (timestamp, data) {
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

speedFormatter = function (timestamp, data) {
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
      ' knots' +
      '</span>');
    }

    return lines.join('<br>');
};

satellitesFormatter = function (timestamp, data) {
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
      ' satellites' +
      '</span>');
    }

    return lines.join('<br>');
};

angleFormatter = function (timestamp, data) {
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
      '&deg;' +
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

magnometerFormatter = function (timestamp, data) {
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
      ' &#181;T' +
      '</span>');
    }

    return lines.join('<br>');
};

gyroscopeFormatter = function (timestamp, data) {
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
      ' rad/s' +
      '</span>');
    }

    return lines.join('<br>');
};

var ts_accel = new TimeSeries();
setInterval(function() {
  ts_accel.append(new Date().getTime(), values['accel']);
}, 100);

var ts_accelx = new TimeSeries();
setInterval(function() {
  ts_accelx.append(new Date().getTime(), values['accel_x']);
}, 100);

var ts_accely = new TimeSeries();
setInterval(function() {
  ts_accely.append(new Date().getTime(), values['accel_y']);
}, 100);

var ts_accelz = new TimeSeries();
setInterval(function() {
  ts_accelz.append(new Date().getTime(), values['accel_z']);
}, 100);

var ts_gyrox = new TimeSeries();
setInterval(function() {
  ts_gyrox.append(new Date().getTime(), values['gyro_x']);
}, 100);

var ts_gyroy = new TimeSeries();
setInterval(function() {
  ts_gyroy.append(new Date().getTime(), values['gyro_y']);
}, 100);

var ts_gyroz = new TimeSeries();
setInterval(function() {
  ts_gyroz.append(new Date().getTime(), values['gyro_z']);
}, 100);

var ts_magx = new TimeSeries();
setInterval(function() {
  ts_magx.append(new Date().getTime(), values['mag_x']);
}, 100);

var ts_magy = new TimeSeries();
setInterval(function() {
  ts_magy.append(new Date().getTime(), values['mag_y']);
}, 100);

var ts_magz = new TimeSeries();
setInterval(function() {
  ts_magz.append(new Date().getTime(), values['mag_z']);
}, 100);

var ts_temp = new TimeSeries();
setInterval(function() {
  ts_temp.append(new Date().getTime(), values['Temperature']);
}, 100);

var ts_humid = new TimeSeries();
setInterval(function() {
  ts_humid.append(new Date().getTime(), values['Humidity']);
}, 100);

var ts_alt = new TimeSeries();
setInterval(function() {
  ts_alt.append(new Date().getTime(), values['Altitude']);
}, 100);

var ts_pressure = new TimeSeries();
setInterval(function() {
  ts_pressure.append(new Date().getTime(), values['Pressure']);
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

var ts_speed = new TimeSeries();
setInterval(function() {
  ts_speed.append(new Date().getTime(), values['speed']);
}, 100)

var ts_angle = new TimeSeries();
setInterval(function() {
  ts_angle.append(new Date().getTime(), values['angle']);
}, 100)

var ts_gps_alt = new TimeSeries();
setInterval(function() {
  ts_gps_alt.append(new Date().getTime(), values['gps_alt']*100);
}, 100)

var ts_satellites = new TimeSeries();
setInterval(function() {
  ts_satellites.append(new Date().getTime(), values['satellites']);
}, 100);

function createAccel() {
  var chart_accel = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: accelFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_accel.addTimeSeries(ts_accel, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_accelx = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: accelFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_accelx.addTimeSeries(ts_accelx, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_accely = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: accelFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_accely.addTimeSeries(ts_accely, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_accelz = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: accelFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_accelz.addTimeSeries(ts_accelz, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_accel_all = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: accelFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_accel_all.addTimeSeries(ts_accelx, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_accel_all.addTimeSeries(ts_accely, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_accel_all.addTimeSeries(ts_accelz, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  chart_accel.streamTo(document.getElementById("chart_accel"), 75);
  //chart_accelx.streamTo(document.getElementById("chart_accelx"), 75);
  //chart_accely.streamTo(document.getElementById("chart_accely"), 75);
  //chart_accelz.streamTo(document.getElementById("chart_accelz"), 75);
  //chart_accel_all.streamTo(document.getElementById("chart_accel_all"), 75);
}

function createGyro() {
  var chart_gyrox = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: gyroscopeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_gyrox.addTimeSeries(ts_gyrox, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_gyroy = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: gyroscopeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_gyroy.addTimeSeries(ts_gyroy, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_gyroz = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: gyroscopeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_gyroz.addTimeSeries(ts_gyroz, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_gyro_all = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: gyroscopeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_gyro_all.addTimeSeries(ts_gyrox, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_gyro_all.addTimeSeries(ts_gyroy, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_gyro_all.addTimeSeries(ts_gyroz, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  //chart_gyrox.streamTo(document.getElementById("chart_gyrox"), 75);
  //chart_gyroy.streamTo(document.getElementById("chart_gyroy"), 75);
  //chart_gyroz.streamTo(document.getElementById("chart_gyroz"), 75);
  chart_gyro_all.streamTo(document.getElementById("chart_gyro_all"), 75);
}

function createMag() {
  var chart_magx = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: magnometerFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_magx.addTimeSeries(ts_magx, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_magy = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: magnometerFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_magy.addTimeSeries(ts_magy, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_magz = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: magnometerFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_magz.addTimeSeries(ts_magz, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_mag_all = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: magnometerFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_mag_all.addTimeSeries(ts_magx, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_mag_all.addTimeSeries(ts_magy, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_mag_all.addTimeSeries(ts_magz, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  //chart_magx.streamTo(document.getElementById("chart_magx"), 75);
  //chart_magy.streamTo(document.getElementById("chart_magy"), 75);
  //chart_magz.streamTo(document.getElementById("chart_magz"), 75);
  chart_mag_all.streamTo(document.getElementById("chart_mag_all"), 75);
}

function createAtmo(){
  var chart_temp = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: tempFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_temp.addTimeSeries(ts_temp, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_pressure = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: pressureFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_pressure.addTimeSeries(ts_pressure, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_alt = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: altitudeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_alt.addTimeSeries(ts_alt, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_humid = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: percentRHFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_humid.addTimeSeries(ts_humid, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_tvoc = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: magnometerFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_tvoc.addTimeSeries(ts_tvoc, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_co2 = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: magnometerFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_co2.addTimeSeries(ts_co2, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_photodiode = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: photodiodeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_photodiode.addTimeSeries(ts_photodiode, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  chart_temp.streamTo(document.getElementById("chart_temp"), 75);
  chart_pressure.streamTo(document.getElementById("chart_pressure"), 75);
  //chart_alt.streamTo(document.getElementById("chart_alt"), 75);
  chart_humid.streamTo(document.getElementById("chart_humid"), 75);
  //chart_tvoc.streamTo(document.getElementById("chart_tvoc"), 75);
  //chart_co2.streamTo(document.getElementById("chart_co2"), 75);
  //chart_photodiode.streamTo(document.getElementById("chart_photodiode"), 75);
}

function createGPS(){
  var chart_speed = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: speedFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_speed.addTimeSeries(ts_speed, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_angle = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: angleFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_angle.addTimeSeries(ts_angle, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_gps_alt = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: altitudeFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_gps_alt.addTimeSeries(ts_gps_alt, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });

  var chart_satellites = new SmoothieChart({tooltip: true, maxValueScale: 1.5, minValueScale: 1.5, millisPerPixel: 11, scaleSmoothing: 0.56,
    tooltipFormatter: satellitesFormatter, grid: {fillStyle: '#3b4253', strokeStyle: '#3b4253',verticalSections: 0},labels: {fillStyle: '#e5e9f0',}});
  chart_satellites.addTimeSeries(ts_satellites, {
    lineWidth: 2,
    strokeStyle: '#c16069'
  });
  //chart_speed.streamTo(document.getElementById("chart_speed"), 75);
  //chart_angle.streamTo(document.getElementById("chart_angle"), 75);
  //chart_gps_alt.streamTo(document.getElementById("chart_gps_alt"), 75);
  //chart_satellites.streamTo(document.getElementById("chart_satellites"), 75);
}

createAccel();
createGyro();
createMag();
createAtmo();
//createGPS();

var RealTimeData = function(criteria) {
        this.criteria = criteria
        this.layers = 1;
        this.timestamp = new Date().getTime();
    };

    RealTimeData.prototype.rand = function() {
        return parseInt(values[this.criteria]);
    };

    RealTimeData.prototype.history = function(entries) {
        if (typeof(entries) != 'number' || !entries) {
            entries = 1;
        }

        var history = [];
        for (var k = 0; k < this.layers; k++) {
            history.push({ values: [] });
        }

        for (var i = 0; i < entries; i++) {
            for (var j = 0; j < this.layers; j++) {
                history[j].values.push({time: this.timestamp, y: this.rand()});
            }
            this.timestamp++;
        }

        return history;
    };

    RealTimeData.prototype.next = function() {
        var entry = [];
        for (var i = 0; i < this.layers; i++) {
            entry.push({ time: this.timestamp, y: this.rand() });
        }
        this.timestamp++;
        return entry;
    }

    window.RealTimeData = RealTimeData;


$(function() {
var data = new RealTimeData('accel');

var graph_accel = $('#graph_accel').epoch({
    type: 'time.area',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

var graph_temp = $('#graph_temp').epoch({
    type: 'time.bar',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

var graph_humid = $('#graph_humid').epoch({
    type: 'time.line',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

var graph_co2 = $('#graph_co2').epoch({
    type: 'time.line',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

var graph_tvoc = $('#graph_tvoc').epoch({
    type: 'time.line',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

var graph_photodiode = $('#graph_photodiode').epoch({
    type: 'time.line',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

var graph_payload = $('#graph_payload').epoch({
    type: 'time.line',
    data: data.history(),
    axes: ['left', 'bottom', 'right']
});

setInterval(function() { graph_accel.push(data.next()); }, 100);
graph_accel.push(data.next());


setInterval(function() { graph_temp.push(data.next()); }, 100);
graph_temp.push(data.next());

setInterval(function() { graph_humid.push(data.next()); }, 100);
graph_humid.push(data.next());

setInterval(function() { graph_co2.push(data.next()); }, 100);
graph_co2.push(data.next());

setInterval(function() { graph_tvoc.push(data.next()); }, 100);
graph_tvoc.push(data.next());

setInterval(function() { graph_photodiode.push(data.next()); }, 100);
graph_photodiode.push(data.next());

setInterval(function() { graph_payload.push(data.next()); }, 100);
graph_payload.push(data.next());
});

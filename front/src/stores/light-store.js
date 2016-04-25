var Reflux = require('reflux');
var Firebase = require('firebase');
var Moment = require('moment');
var Action = require('../actions/app-action');
var rootUrl  = 'https://nccu-iot.firebaseio.com/';
var ref = new Firebase(rootUrl + 'devices/');

module.exports = Reflux.createStore({
  listenables: Action,
  init: function(){
    this.data = {
      light_a: true,
      light_b: true,
      light_c: true,
    };
    this.triggerChange("Light State fetched");
  },
  setLightInterval: function(devices){
    setInterval(function(){
      var old_status = devices.light_c;
      devices.light_c = !old_status;
      // this.triggerChange("Device Updates");
    }, 1000);

  },

  toggleLightState: function(id, status){
    var newStatus = !status
    this.data[id] = newStatus;
    console.log(status);
    console.log(this.data);
    this.triggerChange("Device Updates");
  },

  triggerChange: function(event){
    this.trigger(event, this.data);
  },

})

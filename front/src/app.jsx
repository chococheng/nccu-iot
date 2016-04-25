/* require nodejs module */
var React = require('react');
var Reflux = require('reflux');
var ReactFire = require('reactfire');
var ReactDOM = require('react-dom');
var Moment = require('moment');
var Highcharts = require('react-highcharts');

/* require action file */
var Action = require('./actions/app-action');

/* require stores files */
var LightStateStore = require('./stores/light-store');

/* require component file */
var Section = require('./components/section');

/* require constant file */
var Constant = require('./constants/light-constant');

var interval;
var status = true;

var app = React.createClass({

  /*
   * 以下為react定義的property
   * 詳細資訊請參照 https://facebook.github.io/react/docs/component-specs.html
   */
  mixins:[
		ReactFire,
    Reflux.listenTo(LightStateStore, 'onLightStateChange'),
	],
  getInitialState: function() {
    return {
      data : {},
      light: false,
      color: '#ffffff',
      devices: {},

    };
  },
  componentWillMount: function() {
    Action.getLightState();
    Action.init();
  },
  componentDidMount: function() {

  },
  render: function() {
    return <div>
      <h1 className="red">
        Hello!
      </h1>
      <div className="row">
        <Section
          color="#ffe680"
          id="light_a"
          status={this.state.devices.light_a}
          onBtnClick={this.whenBtnClick} />
        <Section
          color="#DD614A"
          id="light_b"
          status={this.state.devices.light_b}
          onBtnClick={this.whenBtnClick} />
        <Section
          color="#B6EA58"
          id="light_c"
          status={this.state.devices.light_c}
          onBtnClick={this.whenBtnClick} />
      </div>
    </div>
  },

  /*
   * 以下property為自訂，
   * 用來根據資料狀態render版型
   * 以下在render裡頭被呼叫
   */
  renderDevices: function(){
    if(this.state.devices){
      var items = [];
      this.state.devices.map(function(el){
        var color;
        if(el.now.status){
          color = Constant[el.id]['on'];
        }else{
          color = Constant[el.id]['off'];
        }
        items.push(
          <Section
            color={color}
            id={el.id}
            status={el.now.status}
            onBtnClick={this.whenBtnClick} />
        );
      }.bind(this));
      return items
    }
  },

  /*
   * 以下property定義元件的事件
  */
  whenBtnClick: function(id, status){
    Action.toggleLightState(id, status);
    // Action.getDevicesInfo(this.state.map);
  },

  /*
   * 以下property定義當監聽到的store發生改變後，
   * 所執行的function
   */
  onLightStateChange: function(event, data) {
    this.setState({ devices: data });
    clearInterval(interval);

    interval = setInterval(function(){
      Action.toggleLightState('light_c', status);
      status = !status;
      console.log(status);
    }, 1000);
  },
});

var element = React.createElement(app, {});
ReactDOM.render(element, document.querySelector('.container'));

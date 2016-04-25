var React = require('react');
var Reflux = require('reflux');
var Light = require('./light');

module.exports =  React.createClass({

  render: function() {
    var status;
    if(this.props.status){
      status = "Close";
    }else{
      status = "Open"
    };
    return (
      <div className="col-md-3 light-wrapper">
        <Light color={this.props.status? this.props.color: '#ffffff'} id={this.props.id} />
        <button onClick={this.whenBtnClick} className="btn btn-primary btn-lg" type="button">
          {status}
        </button>
      </div>
    );
  },
  whenBtnClick: function(){
    this.props.onBtnClick(this.props.id, this.props.status);
  }

});

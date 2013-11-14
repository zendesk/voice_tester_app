(function() {

  return {
    BASE_URL: "https://voice-tester-service.herokuapp.com",

    requests: {
      answerCall: function() {
        return {
          url: "%@/answer".fmt(this.BASE_URL)
        };
      },
      denyCall: function() {
        return {
          url: "%@/deny".fmt(this.BASE_URL)
        };
      }
    },

    events: {
      'app.activated':               'onActivation',
      'click .answer':               'onAnswerClick',
      'click .deny':                 'onDenyClick',
      'click .goback':               'onGoBack',
      'notification.incoming_call':  'handleCall'
    },

    handleCall: function(data) {
      console.log('incoming call');
      console.log(data);
      this.switchTo('call', { caller: data });
      this.sid = data;

      // Delay is added to the app for demo purposes
      setTimeout(this.popover.bind(this), 2000);
    },

    onActivation: function() {
      console.log('App activated');
      this.switchTo('call');
    },

    onAnswerClick: function(event) {
      event.preventDefault();
      console.log('Answering');
      this.ajax('answerCall');
      this.switchTo('onCall', { caller: this.sid });
    },

    onDenyClick: function(event) {
      event.preventDefault();
      console.log('Denying');
      this.ajax('denyCall');
      this.switchTo('nocall');
    },

    onGoBack: function(event) {
      event.preventDefault();
      this.switchTo('call');
    }
  };

}());

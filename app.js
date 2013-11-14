(function() {

  return {
//    BASE_URL: "http://localhost:8000",
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
      'app.activated': 'onActivation',
      'click .answer': 'onAnswerClick',
      'click .deny':   'onDenyClick',
      'notification.incoming_call': 'handleCall'
    },

    handleCall: function(data) {
      console.log('incoming call');
      console.log(data);
      this.switchTo('call', { sid: data });

      // Delay is added to the app for demo purposes
      setTimeout(this.popover.bind(this), 2000);
    },

    onActivation: function() {
      console.log('Twilio Test App activated');
      this.switchTo('call');
    },

    onAnswerClick: function(event) {
      event.preventDefault();
      console.log('Answering');
      this.ajax('answerCall');
      this.switchTo
    },

    onDenyClick: function(event) {
      event.preventDefault();
      console.log('Denying');
      this.ajax('denyCall');
      this.switchTo('nocall');
    }
  };

}());

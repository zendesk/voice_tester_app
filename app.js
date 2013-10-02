(function() {

  return {
//    BASE_URL: "http://localhost:8000",
    BASE_URL: "http://voice-tester-service.herokuapp.com",

    requests: {
      pollCall: function() {
        return {
          url: "%@/poll/".fmt(this.BASE_URL)
        };
      },
      answerCall: function() {
        return {
          url: "%@/answer/".fmt(this.BASE_URL)
        };
      },
      denyCall: function() {
        return {
          url: "%@/deny/".fmt(this.BASE_URL)
        };
      }
    },

    events: {
      'app.activated': 'onActivation',
      'pollCall.done': 'onPollCallDone',
      'click .answer': 'onAnswerClick',
      'click .deny':   'onDenyClick'
    },

    onActivation: function() {
      console.log('Twilio Test App activated');
      this.poll();
    },

    poll: function() {
      this.ajax('pollCall');
      _.delay(this.poll.bind(this), 5000); // poll every 5 secs
    },

    onPollCallDone: function(data) {
      console.log('POLL RESULT: %@'.fmt(data));
      if (data.has_call) {
        this.switchTo('call', data);
      }
      else {
        this.switchTo('nocall');
      }
    },

    onAnswerClick: function(event) {
      event.preventDefault();
      console.log('Answering');
      this.ajax('answerCall');
    },

    onDenyClick: function(event) {
      event.preventDefault();
      console.log('Denying');
      this.ajax('denyCall');
    }
  };

}());

require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000
const axios = require('axios')
const { RestClient } = require('@signalwire/compatibility-api');


app.post("/connect", async (req, res, next) => {
  var response = new RestClient.LaML.VoiceResponse();
  token_request = await axios.post(`${process.env.TOKEN_ENDPOINT}join?title=${process.env.MEETING_ID}&name=SIPUser&region=us-east-1`, {});
  console.log(token_request.data.JoinInfo)
  var token = token_request.data.JoinInfo.Attendee.Attendee.JoinToken;
  var meetingId = token_request.data.JoinInfo.Meeting.Meeting.MeetingId;
  var url = `sip:+17035550122@${process.env.SIP_HOST_ADDRESS};transport=tls?X-chime-join-token=${token}&X-chime-meeting-id=${meetingId}`
  console.log("dialing: " + url);
  const dial = response.dial({callerId: 'sip:+12019712404@sip.signalwire.com'});
  dial.sip(url);

  // var response = new RestClient.LaML.VoiceResponse();
  // if (req.body.Digits) {
  //   if (req.body.Digits == '1234') {
  //     response.say('Connecting you now');
  //     token_request = await axios.post(`${process.env.TOKEN_ENDPOINT}join?title=${process.env.MEETING_ID}&name=SIPUser&region=us-east-1`, {});
  //     var token = token_request.data.JoinInfo.Attendee.Attendee.JoinToken;
  //     var url = `sip:+17035550122@${process.env.SIP_HOST_ADDRESS};transport=udp;X-chime-join-token=${token}`
  //     console.log("dialing: " + url);
  //     const dial = response.dial();
  //     dial.sip(url);

  //   } else {
  //     response.say('Sorry, input was invalid');
  //     response.redirect('/connect')
  //   }
  // } else {
  //   gather = response.gather({ timeout: 5, numDigits: 4 })
  //   gather.say("Please enter your pin number.")
  // }

  console.log("LAML: " + response.toString());
  res.send(response.toString());
});


app.listen(port, () => {
  console.log(`API ready on port ${port}`);
});
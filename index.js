require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000
const axios = require('axios')
const { RestClient } = require('@signalwire/compatibility-api');


app.post("/connect", async (req, res, next) => {
  // set up the signalwire client to generate XML later
  var response = new RestClient.LaML.VoiceResponse();
  // note that we are hardcoding the meeting ID here, but you can use the meeting ID from the request or somewhere else
  // same goes for the user name
  token_request = await axios.post(`${process.env.TOKEN_ENDPOINT}join?title=${process.env.MEETING_ID}&name=SIPUser&region=us-east-1`, {});
  console.log(token_request.data.JoinInfo)
  var token = token_request.data.JoinInfo.Attendee.Attendee.JoinToken;
  var meetingId = token_request.data.JoinInfo.Meeting.Meeting.MeetingId;
  // the number should ALWAYS be the same, but the token and meeting ID will change
  // https://docs.aws.amazon.com/chime-sdk/latest/dg/mtgs-sdk-cvc.html
  // X-chime-meeting-id is needed if you are using a non-zoned connector URL
  var url = `sip:+17035550122@${process.env.SIP_HOST_ADDRESS};transport=tls?X-chime-join-token=${token}&X-chime-meeting-id=${meetingId}`
  console.log("dialing: " + url);

  // use the SignalWire client to generate the XML
  const dial = response.dial({callerId: 'sip:+12019712404@sip.signalwire.com'});
  dial.sip(url);

  console.log("LAML: " + response.toString());
  res.send(response.toString());
});


app.listen(port, () => {
  console.log(`API ready on port ${port}`);
});
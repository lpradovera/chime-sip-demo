# AWS Chime and SignalWire demo

`npm install`

Copy `env.example` to `.env`, filling in the environment variables.

`node index.js`

## Amazon Chime setup

Set Chime up with a connector, enable Termination, add all SignalWire IPs.

Note the connector name.

To get the SignalWire SIP IPs, use `dig sip.signalwire.com`

Since Chime only supports 10 IP addresses, you will have to ask support to raise that limit.

## SignalWire setup

The easiest way to test the demo is to point a tunnel to your localhost:3000/connect URL, using something like `ngrok`.

In your SignalWire console, set up a phone number to point to the tunnel webhook you set up earlier, and call that number.
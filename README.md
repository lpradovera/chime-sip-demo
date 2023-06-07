# AWS Chime and SignalWire demo

`npm install`

Copy `env.example` to `.env`, filling in the environment variables.

`node index.js`

## Amazon Chime setup

Set Chime up with a connector, enable Termination, add all SignalWire IPs.

Note the connector name.

To get the SignalWire SIP IPs, use `dig sip.signalwire.com`

Since Chime only supports 10 IP addresses, you will have to ask support to raise that limit.

![image](https://github.com/lpradovera/chime-sip-demo/assets/240074/daf3d1d7-4650-4c9e-8db8-d9dce18ad5e0)

![image](https://github.com/lpradovera/chime-sip-demo/assets/240074/04cc627f-8b9a-4d11-8327-3551a8c4bae1)


## SignalWire setup

The easiest way to test the demo is to point a tunnel to your localhost:3000/connect URL, using something like `ngrok`.

In your SignalWire console, set up a phone number to point to the tunnel webhook you set up earlier, and call that number.

![image](https://github.com/lpradovera/chime-sip-demo/assets/240074/43a0a105-67a2-435b-ad1d-d76ff95e624c)

## Chime demo application

The easiest way to set up a Chime demo application is the [serverless browser demo](https://github.com/aws/amazon-chime-sdk-js#deploying-the-serverless-browser-demo) from Amazon, which includes the token generation endpoint the Node application uses.

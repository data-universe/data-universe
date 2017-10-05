# `data-universe`

`data-universe` makes your data accessible and understandable by enabling dynamic exploration and visualization in a Virtual Reality space.

## About

The goal of `data-universe` is to simplify the way in how data can be explored and analyzed, in order to make it accessible and understandable for a wide and diverse audience. 

To reach this goal, we believe in taking advantage of the natural curiosity which we all possess, and putting the user inside the data, rather than in front of it. By representing the data in a Virtual Reality, the user is enabled to move around and explore based on instinct and experiment with direct visual feedback. The data jungle is moved from away from static websites and database interfaces, into an open and accessible world where the user is in the center and enabled with the controls.

Currently we are working with the use case of visualizing available employment opportunities in collaboration with the Swedish Employment Agency ([Arbetsförmedlingen](https://www.arbetsformedlingen.se/)). This is also what triggered the creation of `data-universe` at an [OpenHack](http://www.openhack.io) event, which is a hackathon focused on addressing humanitarian and social challenges. 

In the future we aim to broaden the scope to include further use cases, in order to make the world of data more accessible and understandable. 

## Setup

The project is currently in an early state why it may not be ready to most end-users. However, if you have the technical background needed, and interested in setting it up, we encourage you to download the project and try it out! It is based on the [three.js](https://threejs.org/) framework and currently only tested on an iPhone mobile handset device with Virtual Reality capabilities.

`data-universe` is implemented entirely in Javascript, which means it runs in your web browser. Unfortunately the support for VR is still only available in unstable versions of web browsers. We recommend installing Firefox Nightly (https://www.mozilla.org/en-US/firefox/channel/desktop/), which supports the API:s we use. After installing it, use `about:config` to enable WebVR.

Please follow the official guidelines on how to setup your HTC Vive device (https://www.vive.com/eu/setup/). Once setup, follow these steps to setup the server.

```
npm install
npm start
```

After this is done, type in the address of the server (or `localhost` if ran locally) and specify the port `8080` in Firefox Nightly and the application should start on your HTC Vive.

## Contributing

Do you wish to join us in our quest? We are an open community and welcome anyone who wishes to join! You can reach us on <data-universe@openhack.io>.

## Contributors

* Lukas Leander
* Johan Linåker
* Simon Persson
* Marcus Rettig
* Karl-Oskar Rikås

### Based on a hackathon project by:

* Carmen Geanina Dana
* Mao Jiyan
* Mark Meszaros
* Simon Persson
* Marcus Rettig
* Karl-Oskar Rikås
* Hamed Yahyaei

const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const menuServer = 'http://ec2-52-43-228-173.us-west-2.compute.amazonaws.com/grub-reactor/2/';
const nearbyServer = 'http://ec2-13-57-220-156.us-west-1.compute.amazonaws.com/';
const bannerServer = 'http://ec2-54-193-75-21.us-west-1.compute.amazonaws.com/';
const reviewServer = 'http://ec2-34-221-253-114.us-west-2.compute.amazonaws.com/grubhub/5/allreviews/';


app.use('/grubhub/:id', express.static('public'));

app.all('/grub-reactor/:rest-Id/menu/*', function(req, res) {
  apiProxy.web(req, res, {target: menuServer});
});

app.all('/restaurant/:id', function(req, res) {
  apiProxy.web(req, res, {target: nearbyServer});
});

app.all("/restaurants/banners/:rest_id", function(req, res) {
  apiProxy.web(req, res, {target: bannerServer});
});

app.all("/grubhub/:rest_id/allreviews/*", function(req, res) {
  apiProxy.web(req, res, {target: reviewServer});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
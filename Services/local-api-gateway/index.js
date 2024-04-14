const express = require('express');

const {
  createProxyMiddleware,
  fixRequestBody,
} = require('http-proxy-middleware');

const cors = require('cors');

const app = express();

// Define routes for services

// Route requests to services
app.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://auth-service:5001',
    onProxyReq: fixRequestBody,
    changeOrigin: true,
    pathRewrite: {
      '/auth': '/',
    },
  })
);

//Industry Service Call
app.use(
  '/adds',
  createProxyMiddleware({
    target: 'http://add-service:5000',
    onProxyReq: fixRequestBody,
    changeOrigin: true,
    pathRewrite: {
      '/adds': '/',
    },
  })
);

app.use(
  '/user',
  createProxyMiddleware({
    target: 'http://user-service:5003',
    onProxyReq: fixRequestBody,
    changeOrigin: true,
    pathRewrite: {
      '/user': '/',
    },
  })
);

app.use(
  '/review',
  createProxyMiddleware({
    target: 'http://review-service:5002',
    onProxyReq: fixRequestBody,
    changeOrigin: true,
    pathRewrite: {
      '/review': '/',
    },
  })
);

app.use(
  '/deliver',
  createProxyMiddleware({
    target: 'http://deliver-service:5004',
    onProxyReq: fixRequestBody,
    changeOrigin: true,
    pathRewrite: {
      '/deliver': '/',
    },
  })
);

app.use(
  '/order',
  createProxyMiddleware({
    target: 'http://orderManagement-service:5005',
    onProxyReq: fixRequestBody,
    changeOrigin: true,
    pathRewrite: {
      '/order': '/',
    },
  })
);

app.use(cors());
// Start the server


app.listen(8000, () =>
  console.log('Local API Gateway listening on port 8000!')
);
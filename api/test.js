// File: /api/test.js
module.exports = (req, res) => {
  res.status(200).json({
    message: 'The test API endpoint is working!',
    timestamp: new Date().toISOString()
  });
};
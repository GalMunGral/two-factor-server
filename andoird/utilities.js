const createRequestBody = (deviceToken, title, body) => JSON.stringify({
  message: {
    token: deviceToken,
    android: {
      collapse_key: 'test_group',
      notification: { title, body, color: '#00ff00' }
    }
  }
});

module.exports = {
  createRequestBody
}

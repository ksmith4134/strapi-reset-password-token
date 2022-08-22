module.exports = {
  routes: [
    {
      method: "POST",
      path: "/get-token",
      handler: "get-token.resetPasswordToken",
      config: {
        auth: false
      } // make congif.auth true before deployment
    }
  ]
}
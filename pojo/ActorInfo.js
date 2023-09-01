class ActorInfo {
  constructor(requestBody) {
    this.first_name = requestBody.first_name;
    this.last_name = requestBody.last_name;
  }
}
module.exports = ActorInfo;

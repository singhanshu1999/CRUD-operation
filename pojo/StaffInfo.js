class StaffInfo {
  constructor(requestBody) {
    this.first_name = requestBody.first_name;
    this.last_name = requestBody.last_name;
    this.address_id = requestBody.address_id;
    this.email = requestBody.email;
    this.store_id = requestBody.store_id;
    this.active = requestBody.active;
    this.username = requestBody.username;
    this.password = requestBody.password;
  }
}
module.exports = StaffInfo;

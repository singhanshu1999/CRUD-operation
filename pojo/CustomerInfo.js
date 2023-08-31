class CustomerInfo {
  constructor(requestBody) {
    this.first_name = requestBody.first_name;
    this.store_id = requestBody.store_id;
    this.last_name = requestBody.last_name;
    this.email = requestBody.email;
    this.address_id = requestBody.address_id;
    this.activebool = requestBody.activebool;
    this.create_date = requestBody.create_date;
    this.active = requestBody.active;
  }
}
module.exports = CustomerInfo;

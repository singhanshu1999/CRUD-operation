class AddressInfo {
  constructor(requestBody) {
    this.address = requestBody.address;
    this.address2 = requestBody.address2;
    this.district = requestBody.district;
    this.city_id = requestBody.city_id;
    this.postal_code = requestBody.postal_code;
    this.phone = requestBody.phone;
  }
}
module.exports = AddressInfo;

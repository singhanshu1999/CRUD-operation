class cityInfo {
  constructor(requestBody) {
    this.city_name = requestBody.city_name;
    this.country_id = requestBody.country_id;
  }
}
module.exports = cityInfo;

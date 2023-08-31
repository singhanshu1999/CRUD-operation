class RentalInfo {
  constructor(requestBody) {
    this.rental_date = requestBody.rental_date;
    this.inventory_id = requestBody.inventory_id;
    this.customer_id = requestBody.customer_id;
    this.return_date = requestBody.return_date;
    this.staff_id = requestBody.staff_id;
  }
}
module.exports = RentalInfo;

class FilmInfo {
  constructor(requestBody) {
    this.title = requestBody.title;
    this.description = requestBody.description;
    this.release_year = requestBody.release_year;
    this.language_id = requestBody.language_id;
    this.rental_duration = requestBody.rental_duration;
    this.rental_rate = requestBody.rental_rate;
    this.length = requestBody.length;
    this.replacement_cost = requestBody.replacement_cost;
    this.rating = requestBody.rating;
    this.special_features = requestBody.special_features;
  }
}
module.exports = FilmInfo;

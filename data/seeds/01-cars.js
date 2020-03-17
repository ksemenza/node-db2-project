
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars-table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars-table').insert([
        {
          "make": "Toyota",
          "model": "4-Runner",
          "mileage" : "1454151",
          "year": "1998"
        },
        {
          "make": "Honda",
          "model": "Accord",
          "mileage" : "3218154",
          "year": "2005"
        },
        {
          "make": "Kia",
          "model": "Soul",
          "mileage" : "540445",
          "year": "2011"
        },
        {
          "make": "Toyota",
          "model": "Tacoma",
          "mileage" : "150",
          "year": "2020"
        }
      ]);
    });
};

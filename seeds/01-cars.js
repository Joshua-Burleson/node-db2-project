
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 123, make: 'Subaru', model: 'WRX STI', mileage: 10, transmission: 'Manual'},
        {VIN: 465, make: 'Honda', model: 'Fit', mileage: 100000},
        {VIN: 789, make: 'Acura', model: 'Integra', mileage: 200000, titleStatus: 'clean'}
      ]);
    });
};

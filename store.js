"use strict";

function statementText(customer, movies) {
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of customer.rentals) {
    result += `\t${getMovie(rental, movies).title}\t${getThisAmount(rental, movies)}\n`;
  }
  // add footer lines
  result += `Amount owed is ${getTotalAmount(customer, movies)}\n`;
  result += `You earned ${getTotalRenterPoints(customer, movies)} frequent renter points\n`;

  return result;
}
function statementHtml(customer, movies) {
  let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
  result += '<table>\n';
  for (let rental of customer.rentals) {
    result += `<tr><td>${getMovie(rental, movies).title}</td><td>${getThisAmount(rental, movies)}</td></tr>\n`;
  }
  result += '</table>\n';
  // add footer lines
  result += `<p>Amount owed is <em>${getTotalAmount(customer, movies)}</em></p>\n`;
  result += `<p>You earned <em>${getTotalRenterPoints(customer, movies)}</em> frequent renter points</p>\n`;

  return result;
}
function getTotalAmount(customer, movies) {
  let totalAmount = 0;
  for (let rental of customer.rentals) {
    totalAmount += getThisAmount(rental, movies);
  }
  return totalAmount;
}
function getThisAmount(rental, movies){
  let thisAmount;
  switch (getMovie(rental, movies).code) {
    case "regular":
      thisAmount = 2;
      if (rental.days > 2) {
        thisAmount += (rental.days - 2) * 1.5;
      }
      break;
    case "new":
      thisAmount = rental.days * 3;
      break;
    case "childrens":
      thisAmount = 1.5;
      if (rental.days > 3) {
        thisAmount += (rental.days - 3) * 1.5;
      }
      break;
  }
  return thisAmount;
}
function getTotalRenterPoints(customer, movies) {
   let TotalRenterPoints = 0;
   for (let rental of customer.rentals) {
      TotalRenterPoints += getRenterPoints(rental, movies);
   }
    return TotalRenterPoints;
  }
function getRenterPoints(rental, movies) {
    if (getMovie(rental, movies).code === "new" && rental.days > 2){
      return 2;
    }
   else{
     return 1;
    }
}
function getMovie(rental, movies) {
  return movies[rental.movieID];
}
let customer = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  }, ]
};

let movies = {
  "F001": {
    "title": "Ran",
    "code": "regular"
  },
  "F002": {
    "title": "Trois Couleurs: Bleu",
    "code": "regular"
  },
  // etc
};

console.log(statementText(customer, movies));
console.log(statementHtml(customer, movies));
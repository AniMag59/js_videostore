"use strict";

function Customer(customer, movies) {
  return{
    name: customer.name,
    rentals: customer.rentals.map(rental => new Rental(rental, movies)),
    totalAmount: getTotalAmount,
    totalRenterPoints: getTotalRenterPoints
  };
  function getTotalRenterPoints() {
    let TotalRenterPoints = 0;
    for (let rental of this.rentals) {
      TotalRenterPoints += rental.renterPoints();
    }
    return TotalRenterPoints;
  }
  function getTotalAmount() {
    let totalAmount = 0;
    for (let rental of this.rentals) {
      totalAmount += rental.thisAmount();
    }
    return totalAmount;
  }
}
function Rental(rental, movies) {
  return{
    movieID: rental.movieID,
    days: rental.days,
    movie: getMovie,
    renterPoints: getRenterPoints,
    thisAmount: getThisAmount
  };
  function getMovie() {
    return movies[rental.movieID];
  }
  function getRenterPoints() {
    if (this.movie().code === "new" && rental.days > 2) {
      return 2;
    }
    else{
      return 1;
    }
  }
  function getThisAmount(){
    let thisAmount;
    switch (this.movie().code) {
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
}


function statement(customer, movies) {
  customer = new Customer(customer, movies);
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of customer.rentals) {
    result += `\t${rental.movie().title}\t${rental.thisAmount()}\n`;
  }
  // add footer lines
  result += `Amount owed is ${customer.totalAmount()}\n`;
  result += `You earned ${customer.totalRenterPoints()} frequent renter points\n`;
  return result;
}
function statementHtml(customer, movies) {
  customer = new Customer(customer, movies);
  let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
  result += '<table>\n';
  for (let rental of customer.rentals) {
    result += `<tr><td>${rental.movie().title}</td><td>${rental.thisAmount()}</td></tr>\n`;
  }
  result += '</table>\n';
  // add footer lines
  result += `<p>Amount owed is <em>${customer.totalAmount()}</em></p>\n`;
  result += `<p>You earned <em>${customer.totalRenterPoints()}</em> frequent renter points</p>\n`;

  return result;
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

console.log(statement(customer, movies));
console.log(statementHtml(customer, movies));


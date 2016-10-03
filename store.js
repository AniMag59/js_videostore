"use strict";

function Customer(customer, movies) {
  return{
    name: customer.name,
    rentals: customer.rentals.map(rental => new Rental(rental, movies)),
   // amount: "",
    //renterPoints: ""
  };
}
function Rental(rental, movies) {
  return{
    movieID: rental.movieID,
    days: rental.days,
    movie: getMovie,
    renterPoints: getRenterPoints
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
}


function statement(customer, movies) {
  customer = new Customer(customer, movies);
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of customer.rentals) {
    result += `\t${rental.movie().title}\t${getThisAmount(rental)}\n`;
  }
  // add footer lines
  result += `Amount owed is ${getTotalAmount(customer)}\n`;
  result += `You earned ${getTotalRenterPoints(customer)} frequent renter points\n`;

  return result;

  function getTotalAmount(customer) {
    let totalAmount = 0;
    for (let rental of customer.rentals) {
      totalAmount += getThisAmount(rental);
    }
    return totalAmount;
  }
  function getThisAmount(rental){
    let thisAmount;
    switch (rental.movie().code) {
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
  function getTotalRenterPoints(customer) {
    let TotalRenterPoints = 0;
    for (let rental of customer.rentals) {
      TotalRenterPoints += rental.renterPoints();
    }
    return TotalRenterPoints;
  }

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


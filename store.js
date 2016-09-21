"use strict";

function statement(customer, movies, type) {
  if(type == 'text'){
    return statementText();
  }
  if(type == 'html'){
    return statementHtml();
  }
  function statementText(){
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
      result += `\t${getMovie(rental).title}\t${getThisAmount(rental)}\n`;
    }
    // add footer lines
    result += `Amount owed is ${getTotalAmount(customer)}\n`;
    result += `You earned ${getTotalRenterPoints(customer)} frequent renter points\n`;

    return result;
  }
  function statementHtml(){
    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    result += '<table>\n';
    for (let rental of customer.rentals) {
      result += `<tr><td>${getMovie(rental).title}</td><td>${getThisAmount(rental)}</td></tr>\n`;
    }
    result += '</table>\n';
    // add footer lines
    result += `<p>Amount owed is <em>${getTotalAmount(customer)}</em></p>\n`;
    result += `<p>You earned <em>${getTotalRenterPoints(customer)}</em> frequent renter points</p>\n`;

    return result;
  }


  function getTotalAmount(customer) {
    let totalAmount = 0;
    for (let rental of customer.rentals) {
      totalAmount += getThisAmount(rental);
    }
    return totalAmount;
  }
  function getThisAmount(rental){
    let thisAmount;
    switch (getMovie(rental).code) {
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
      TotalRenterPoints += getRenterPoints(rental);
    }
    return TotalRenterPoints;
  }
  function getRenterPoints(rental) {
      if (getMovie(rental).code === "new" && rental.days > 2){
        return 2;
      }
      else{
        return 1;
      }
  }
  function getMovie(rental) {
    return movies[rental.movieID];
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

console.log(statement(customer, movies, 'text'));
console.log(statement(customer, movies, 'html'));
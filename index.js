let submitBtn = document.querySelector("#submitBtn");
let date = document.querySelector("#birthdate");
let resOutput = document.querySelector(".result__output");

submitBtn.addEventListener("click", function (e) {
  let dateVal = date.value;

  if (dateVal.trim() === "") {
    resOutput.innerText = "Please provide with valid input";
    return;
  }

  let dateArr = dateVal.split("-");

  let dateObj = {
    day: parseInt(dateArr[2]),
    month: parseInt(dateArr[1]),
    year: parseInt(dateArr[0]),
  };

  if (getPalindromeForAll(dateObj)) {
    resOutput.innerText = "Yippee your birthday is palindrome";
  } else {
    let nextPDate = getNextPalindromeDate(dateObj);
    let nextPDateString =
      nextPDate[1].day + "-" + nextPDate[1].month + "-" + nextPDate[1].year;

    resOutput.innerText =
      "The nearest palindrome date is " +
      nextPDateString +
      ", you missed by " +
      nextPDate[0] +
      " days.";
    console.log(nextPDate);
  }
});

//reverse a string
function reverse(str) {
  if (str.length === 1) {
    return str;
  }

  return reverse(str.substr(1, str.length - 1)) + str[0];
}

//function to check for palindrome
function palindrome(str) {
  if (str === reverse(str)) {
    return true;
  } else {
    return false;
  }
}

function dateTOString(date) {
  let day = date.day < 10 ? "0" + date.day : "" + date.day;
  let month = date.month < 10 ? "0" + date.month : "" + date.month;
  let year = "" + date.year;

  return { day: day, month: month, year: year };
}

function dateVariation(date) {
  let arr = [];
  let stringDate = dateTOString(date);

  arr.push(stringDate.day + stringDate.month + stringDate.year);
  arr.push(stringDate.month + stringDate.day + stringDate.year);
  arr.push(stringDate.year + stringDate.month + stringDate.day);
  arr.push(stringDate.day + stringDate.month + stringDate.year.slice(-2));
  arr.push(stringDate.month + stringDate.day + stringDate.year.slice(-2));
  arr.push(stringDate.year.slice(-2) + stringDate.month + stringDate.day);

  return arr;
}

function getPalindromeForAll(date) {
  let dateFormats = dateVariation(date);

  for (let i = 0; i < dateFormats.length; i++) {
    if (palindrome(dateFormats[i])) {
      return true;
    }
  }

  return false;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let count = 0;
  let nextDate = getNextDate(date);

  while (1) {
    count++;

    if (getPalindromeForAll(nextDate)) {
      break;
    }

    nextDate = getNextDate(nextDate);
  }

  return [count, nextDate];
}

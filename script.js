"use strict";

const inputFieldsEl = document.querySelectorAll(".input-fields");
const birthDay = document.getElementById("day-input");
const birthMonth = document.getElementById("month-input");
const birthYear = document.getElementById("year-input");
const ageInYears = document.querySelector(".results-years");
const ageInMonths = document.querySelector(".results-months");
const ageInDays = document.querySelector(".results-days");
const btnAgeCalculate = document.querySelector(".icon");
const [dayLabel, monthLabel, yearLabel] = [...inputFieldsEl];
const dateYear = new Date().getFullYear();
const dateMonth = new Date().getMonth() + 1;
const dateDay = new Date().getDate();

const calcAge = function () {
  const emptyInputsEl = document.querySelectorAll(".empty-input");
  const invalidBirthMonthEl = document.querySelector(".invalid-input-month");
  const invalidBirthDayEl = document.querySelector(".invalid-input-day");
  const invalidBirthYearEl = document.querySelector(".invalid-input-year");
  //

  let invalidInputs =
    birthDay.value === "" ||
    birthDay.value > 31 ||
    birthDay.value < 1 ||
    birthMonth.value === "" ||
    birthMonth.value > 12 ||
    birthMonth.value < 1 ||
    birthYear.value === "" ||
    birthYear.value > dateYear ||
    (+birthMonth.value === 4 && +birthDay.value === 31) ||
    (+birthMonth.value === 2 && +birthDay.value > 29) ||
    (+birthMonth.value === 6 && +birthDay.value === 31) ||
    (+birthMonth.value === 9 && +birthDay.value === 31) ||
    (+birthMonth.value === 11 && +birthDay.value === 31);

  //

  const birthDate = moment([
    birthYear.value,
    birthMonth.value - 1,
    birthDay.value,
  ]);
  const { years, months, days } = moment.duration(
    moment().diff(birthDate)
  )._data;
  // Display years old
  if (invalidInputs) ageInYears.textContent = "--";
  else ageInYears.textContent = years;

  // Display months old
  if (invalidInputs) ageInMonths.textContent = "--";
  else ageInMonths.textContent = months;

  // Display days old
  if (invalidInputs) ageInDays.textContent = "--";
  else ageInDays.textContent = days;

  // Wrong inputs El
  const emptyInput = `<p class="empty-input">This field is required</p>`;
  const invalidDay = `<label for="day-input"  class="invalid-input-day">Must be a valid day</label>`;
  const invalidMonth = `<label for="month-input" class="invalid-input-month">Must be a valid month</label>`;
  const invalidYear = `<label for="year-input" class="invalid-input-year">Must be in the past</label>`;
  //

  // Day wrong input display
  birthDay.classList.remove("invalid-input");
  dayLabel.classList.remove("invalid-label");
  if (birthDay.value === "") {
    birthDay.insertAdjacentHTML("afterend", emptyInput);
    birthDay.classList.add("invalid-input");
    dayLabel.classList.add("invalid-label");
  } else if (
    birthDay.value > 31 ||
    birthDay.value < 1 ||
    (+birthMonth.value === 4 && +birthDay.value === 31) ||
    (+birthMonth.value === 2 && +birthDay.value > 29) ||
    (+birthMonth.value === 6 && +birthDay.value === 31) ||
    (+birthMonth.value === 9 && +birthDay.value === 31) ||
    (+birthMonth.value === 11 && +birthDay.value === 31)
  ) {
    birthDay.insertAdjacentHTML("afterend", invalidDay);
    birthDay.classList.add("invalid-input");
    dayLabel.classList.add("invalid-label");
  }
  //

  // Month wrong input display
  birthMonth.classList.remove("invalid-input");
  monthLabel.classList.remove("invalid-label");
  if (birthMonth.value === "") {
    birthMonth.insertAdjacentHTML("afterend", emptyInput);
    birthMonth.classList.add("invalid-input");
    monthLabel.classList.add("invalid-label");
  } else if (birthMonth.value > 12 || birthMonth.value < 1) {
    birthMonth.insertAdjacentHTML("afterend", invalidMonth);
    birthMonth.classList.add("invalid-input");
    monthLabel.classList.add("invalid-label");
  }
  //

  // Year wrong input display
  birthYear.classList.remove("invalid-input");
  yearLabel.classList.remove("invalid-label");
  if (birthYear.value === "") {
    birthYear.insertAdjacentHTML("afterend", emptyInput);
    birthYear.classList.add("invalid-input");
    yearLabel.classList.add("invalid-label");
  } else if (birthYear.value > dateYear) {
    birthYear.insertAdjacentHTML("afterend", invalidYear);
    birthYear.classList.add("invalid-input");
    yearLabel.classList.add("invalid-label");
  }
  //

  // Removing new wrong inputs El
  const [empD, empM, empY] = [...emptyInputsEl];
  empD?.remove();
  empM?.remove();
  empY?.remove();

  invalidBirthDayEl?.remove();
  invalidBirthMonthEl?.remove();
  invalidBirthYearEl?.remove();
};

btnAgeCalculate.addEventListener("click", calcAge);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") calcAge();
});

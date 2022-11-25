const baseUrl = 'https://frontend-take-home.fetchrewards.com/form'
const addForm = document.querySelector(".form")
let listOccupations = document.querySelector("#occupation")
let listStates = document.querySelector("#state")

let occupationOptions = ''
let stateOptions = ''

renderAll = (jobs, state) => {
  renderOccupations(jobs)
  renderStates(state)
}

renderOccupations = (jobs) => {

  for (const job of jobs) {
    occupationOptions += `<option>${job}</option>`
  }
  listOccupations.innerHTML = occupationOptions 
}

renderStates = (states) => {

  for (const state of states) {
    stateOptions += `<option>${state.name}, ${state.abbreviation}</option>`
  }
  listStates.innerHTML = stateOptions
}

fetch(baseUrl)
  .then((response) => response.json())
  .then((data) => renderAll(data.occupations, data.states));


submitHandler = () => {
  addForm.addEventListener('submit', e => {
    e.preventDefault()
    const form = e.target

    const name = form.fname.value
    const email = form.email.value
    const password = form.password.value
    const occupation = form.occupation.value
    const state = form.state.value

    const newForm = {
      "name": name,
      "email": email,
      "password": password,
      "occupation": occupation,
      "state": state
    }
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",

      },
      body: JSON.stringify(newForm)
    }

    fetch(baseUrl, options)
      .then(response => response.json())
      .then(form => {
        completeForm()
        console.log('Success:', form);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  })
}

completeForm = () => {
  addForm.remove
  document.querySelector('.parent').innerHTML = `<h1>Form submitted</h1>`
}


submitHandler()
# Frontend-Take-Home-Exercise

For this execicise I was able to:

1. Display a form with inputs for each field outlined above
2. Allow a user to complete and submit the form
3. Not to allow form submission without completing the entire form
4. Provide feedback upon successful form submission

## Proccess:

### First I did GET request to`https://frontend-take-home.fetchrewards.com/form` which returned a JSON body with the following format:

```
{
    "occupations": [
        "occupation1",
        "occupation2",
        ...
    ],
    "states": [
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        ...
    ]
}

```

### Once I was able to fetch the data, I created a ```renderAll``` function which takes in two parameters of occupations and states. Once that is done I created two helper function ```renderOccupations``` and ```renderStates``` to display the data in UI:

```
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
  
  ```

### Once the user is done completing the form and to POST the data to `https://frontend-take-home.fetchrewards.com/form`, I created a ```submitHandler``` to submit the data:

```
ssubmitHandler = () => {
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
```

### Once the POST is succesful, the user recieve a confirmation from the funtion ```completeForm```:

```
completeForm = () => {
  addForm.remove
  document.querySelector('.parent').innerHTML = `<h1>Form submitted</h1>`
}
```


## Application is hosted on Amazon S3 bucket, to view, click on the link:

<http://front-end-exercise.s3-website.us-east-2.amazonaws.com/>



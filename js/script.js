document.querySelector(".switch-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  let bodyClass = document.body.className;
  let switchIcon = document.querySelector(".switch-theme");
  bodyClass === 'dark-theme' ?  switchIcon.innerHTML ='<i class="fas fa-sun"></i>' : switchIcon.innerHTML ='<i class="fas fa-moon"></i>';
})

document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value.toLowerCase();
  getJobs().then(jobs => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  })
})
document.querySelector("#filter-jobs").addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    let text = document.getElementById("filter-jobs").value.toLowerCase();
  getJobs().then(jobs => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  })}
})

function getJobs(){
  return fetch("data.json")
  .then(response => response.json())
  .then(data => {
    return data;
  })
}

function filterJobs(jobs, searchText){
  if(searchText){
    let filterItems = jobs.filter(job => {
      if(job.roleName.toLowerCase().includes(searchText)
      || job.type.toLowerCase().includes(searchText)
      || job.company.toLowerCase().includes(searchText)
      || job.requirements.content.toLowerCase().includes(searchText)){
        return true;
      }
      else {
        return false;
      }
    })
    return filterItems;
  }
  else {
    return jobs;
  }
}

function showJobs(jobs) {
  let jobsContainer = document.querySelector(".jobs-container");
  let jobsHTML = "";
  let heading = document.querySelector("h1");
  heading.innerHTML = `Show ${jobs.length} jobs`;
  jobs.forEach(job => {
    jobsHTML += `
    <div class="job-tile">
    <div class="top">
        <img src="${job.logo}" />
        <span class="material-icons more_horiz">more_horiz</span>
    </div>
    <div class="rolename">
        <span>${job.roleName}</span>
    </div>
    <div class="description">
        <span>${job.requirements.content}</span>
    </div>
    <div class="buttons">
        <div class="button apply-now">
            Apply Now
        </div>
        <div class="button">
            Message
        </div>
    </div>
    </div>
  `
  })
  jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
  showJobs(data);
})
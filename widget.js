const apiEndpoint = "https://doofinder.instatus.com/summary.json";
const refreshInterval = 60000;  // Adjust the interval as needed

async function fetchStatus() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    const pageStatus = document.getElementById('page-status');
    const incidentsList = document.getElementById('incidents-list');
    const maintenanceList = document.getElementById('maintenance-list');

    pageStatus.textContent = `Service: ${data.page.name} - Status: ${data.page.status}`;

    incidentsList.innerHTML = '';
    maintenanceList.innerHTML = '';

    if (data.activeIncidents.length > 0) {
      data.activeIncidents.forEach(incident => {
        let incidentItem = document.createElement('li');
        incidentItem.innerHTML = `
          <strong>${incident.name}</strong> - ${incident.status} <br />
          Impact: ${incident.impact} | Started: ${new Date(incident.started).toLocaleString()}<br />
          <a href="${incident.url}" target="_blank">More Info</a>
        `;
        incidentsList.appendChild(incidentItem);
      });
    } else {
      incidentsList.innerHTML = '<li>No active incidents</li>';
    }

    if (data.activeMaintenances.length > 0) {
      data.activeMaintenances.forEach(maintenance => {
        let maintenanceItem = document.createElement('li');
        maintenanceItem.innerHTML = `
          <strong>${maintenance.name}</strong> - ${maintenance.status} <br />
          Starts at: ${new Date(maintenance.start).toLocaleString()}<br />
          Duration: ${maintenance.duration} mins <br />
          <a href="${maintenance.url}" target="_blank">More Info</a>
        `;
        maintenanceList.appendChild(maintenanceItem);
      });
    } else {
      maintenanceList.innerHTML = '<li>No active maintenances</li>';
    }
  } catch (error) {
    console.error('Error fetching status:', error);
    document.getElementById('page-status').textContent = 'Error fetching status';
  }
}

fetchStatus();
setInterval(fetchStatus, refreshInterval);

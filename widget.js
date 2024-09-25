const apiEndpoint = "https://testfinder.instatus.com/summary.json";
const refreshInterval = 60000;  // Adjust the interval as needed

async function fetchStatus() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    console.log(data)

    const pageStatus = document.getElementById('page-status');
    const statusIndicator = document.getElementById('status-indicator');

    // Define the status and the corresponding text and color
    let statusText = '';
    let statusColor = '';

    switch (data.page.status) {
      case 'UP':
        statusText = 'All systems operational';
        statusColor = '#6BBA47';  // Green for UP
        break;
      case 'HASISSUES':
        statusText = 'Some problems detected';
        statusColor = '#FC9B5A';  // Orange for HASISSUES
        break;
      case 'UNDERMAINTENANCE':
        statusText = 'Under maintenance';
        statusColor = '#7B80D2';  // Blue-Purple for UNDERMAINTENANCE
        break;
      default:
        statusText = 'Unknown status';
        statusColor = '#D9D9D9';  // Grey for unknown status
    }

    // Check if "activeIncidents" exists and process it
    if (data.activeIncidents && data.activeIncidents.length > 0) {
      const hasMajorOutage = data.activeIncidents.some(incident => incident.impact === 'MAJOROUTAGE');
      
      // If any incident has impact "MAJOROUTAGE", set the bullet to red
      if (hasMajorOutage) {
        statusText = 'Some problems detected';
        statusColor = '#EE3D4C';  // Red for major outage
      }
    }

    // Update the page status text and color indicator
    pageStatus.textContent = statusText;
    statusIndicator.style.backgroundColor = statusColor;

  } catch (error) {
    console.error('Error fetching status:', error);
    document.getElementById('page-status').textContent = 'Error fetching status';
    document.getElementById('status-indicator').style.backgroundColor = '#D9D9D9';  // Grey for error
  }
}

// Run the fetch function on load
fetchStatus();

// Set an interval to update the status every X milliseconds
setInterval(fetchStatus, refreshInterval);

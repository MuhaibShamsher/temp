const generateDynamicColors = (numColors) => {
  const dynamicColors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    const color = `hsl(${hue}, 70%, 50%)`; // Generate colors using HSL
    dynamicColors.push(color);
  }
  return dynamicColors;
};

export const transformDataForBarChart = (openPorts) => {
  // Mapping of port numbers to their specific names
  const portNameMap = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    135: "RPC",
    139: "NetBIOS",
    443: "HTTPS",
    445: "SMB",
    3306: "MySQL",
    3389: "RDP",
  };

  // Initialize port count map
  const portCountMap = {};

  // Check if openPorts is an object
  if (typeof openPorts !== "object" || openPorts === null) {
    console.error("Data is not an object:", openPorts);
    return {
      labels: [],
      datasets: [],
    };
  }

  // Count occurrences of each port
  Object.keys(openPorts)?.forEach((port) => {
    const portCount = openPorts[port];
    portCountMap[port] = portCount;
  });

  // Convert map to arrays for labels and data
  const labels = Object.keys(portCountMap).map(
    (port) => portNameMap[port] || `Port ${port}`
  );
  const dataValues = Object.values(portCountMap);

  return {
    labels,
    datasets: [
      {
        label: ` Total Open Ports`,
        data: dataValues,
        borderColor: "#f2eeea",
        backgroundColor: [
          "#00ffd2", // primary-color
          "#5acfbb", // secondary-color
          "rgba(75, 192, 192, 0.9)", // Keeping one color for better differentiation
          "#0f8187", // accent-color
          "rgba(153, 102, 255, 0.1)", // Lightened up a bit
          "rgba(245, 105, 105, 0.7)", // Keeping one color for better differentiation
          // Add more colors as needed
        ],
        borderWidth: 1,
        fill: true,
        hoverBackgroundColor: [
          "rgba(0, 255, 210, 0.5)",
          "rgba(90, 207, 187, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(15, 129, 135, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(245, 105, 105, 0.7)",
          // Add more hover colors as needed
        ],
      },
    ],
  };
};

export const transformDataForPieChart = (osInfo) => {
  const osCountMap = {};

  // Check if osInfo is not an object or is an array
  if (typeof osInfo !== "object" || Array.isArray(osInfo)) {
    console.error("Invalid osInfo data:", osInfo);
    return {
      labels: [],
      datasets: [],
    };
  }

  // Iterate over each OS name and count occurrences
  Object.entries(osInfo)?.forEach(([osName, count]) => {
    osCountMap[osName] = count;
  });

  // Convert map to arrays for labels and data
  const labels = Object.keys(osCountMap);
  const dataValues = Object.values(osCountMap);

  return {
    labels,
    datasets: [
      {
        data: dataValues,
        borderColor: "white", // Border color for each slice
        backgroundColor: [
          "#00ffd2", // primary-color
          "#5acfbb", // secondary-color
          "rgba(75, 192, 192, 0.9)", // Keeping one color for better differentiation
          "#0f8187", // accent-color
          "rgba(153, 102, 255, 0.1)", // Lightened up a bit
          "rgba(245, 105, 105, 0.7)", // Keeping one color for better differentiation
          // Add more colors as needed
        ],
        borderWidth: 1,
        fill: true,
        hoverBackgroundColor: [
          "rgba(0, 255, 210, 0.5)",
          "rgba(90, 207, 187, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(15, 129, 135, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(245, 105, 105, 0.7)",
          // Add more hover colors as needed
        ],
      },
    ],
  };
};

export const transformDataForDoughnutChart = (data) => {
  const severityCountMap = data; // Assuming data is already in the format { "Low Severity": count, "High Severity": count, ... }

  // Convert map to arrays for labels and data
  const labels = Object.keys(severityCountMap);
  const dataValues = Object.values(severityCountMap);

  // Generate dynamic colors based on the number of severity categories
  const backgroundColor = generateDynamicColors(labels.length);

  return {
    labels,
    datasets: [
      {
        label: `${dataValues.reduce(
          (acc, value) => acc + value,
          0
        )} Total Severities`,
        data: dataValues,
        borderColor: "white",
        backgroundColor,
        borderWidth: 1,
        fill: true,
        hoverBackgroundColor: backgroundColor.map((color) =>
          color.replace(/[\d\.]+\)$/g, "0.5)")
        ), // Adjust hover transparency
      },
    ],
  };
};

export const transformDataForLineChart = (data) => {
  // Initialize an object to store counts of each hostname type
  const hostnameTypeCountMap = {};

  // Assuming data is an array of objects containing OS accuracy information
  data?.forEach((entry) => {
    const hostname = entry?.host?.toLowerCase() || "unknown"; // Adjusted to use 'host' from 'entry'
    const accuracy = entry?.accuracy || 0; // Adjusted to use 'accuracy' from 'entry'

    hostnameTypeCountMap[hostname] = accuracy;
  });

  // Sort the entries by accuracy (descending order)
  const sortedEntries = Object.entries(hostnameTypeCountMap).sort(
    (a, b) => b[1] - a[1]
  ); // Sorting by accuracy descending

  // Extract labels (hosts) and data (accuracy)
  const labels = sortedEntries.map(([hostname]) => hostname);
  const dataValues = sortedEntries.map(([, accuracy]) => accuracy);

  return {
    labels,
    datasets: [
      {
        label: "OS Accuracy",
        data: dataValues,
        borderColor: "rgb(233, 136, 233)", // Line color
        borderWidth: 1,
        backgroundColor: "#a2a2db57",
        fill: true,
        tension: 0.8, // Tension for curved lines, adjust as needed
      },
    ],
  };
};

export const transformDataForHeatChart = (data) => {
  const port21StatesCountMap = {};

  // Check if data is an object
  if (typeof data !== "object" || Array.isArray(data)) {
    console.error("Data is not an object:", data);
    return {
      labels: [],
      datasets: [],
    };
  }

  // Extract states for port 21
  const port21State = data?.ports?.["21"]?.state || "Unknown";
  port21StatesCountMap[port21State] =
    (port21StatesCountMap[port21State] || 0) + 1;

  // Convert map to arrays for labels and data
  const labels = Object.keys(port21StatesCountMap);
  const dataValues = Object.values(port21StatesCountMap);

  // Generate dynamic colors based on the number of states
  const backgroundColor = generateDynamicColors(labels.length);

  return {
    labels,
    datasets: [
      {
        label: `${dataValues.reduce(
          (acc, value) => acc + value,
          0
        )} Total Port 21 States`,
        data: dataValues,
        borderColor: "white",
        backgroundColor,
        borderWidth: 1,
        fill: true,
        hoverBackgroundColor: backgroundColor.map((color) =>
          color.replace(/[\d\.]+\)$/g, "0.5)")
        ), // Adjust hover transparency
      },
    ],
  };
};

export const transformDataForLineChart2 = (data) => {
  // Check if data is an object
  if (typeof data !== "object" || Array.isArray(data)) {
    console.error("Data is not an object:", data);
    return {
      labels: [],
      datasets: [],
    };
  }

  // Convert map to arrays for labels and data
  const labels = Object.keys(data);
  const dataValues = Object.values(data);

  return {
    labels,
    datasets: [
      {
        label: "Open Ports Count",
        data: dataValues,
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(75,192,192,0.2)", // Fill color
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Tension for curved lines
      },
    ],
  };
};

// export const transformDataForLineChart2 = (data) => {
//   // Initialize an object to store uptime seconds for each host
//   const uptimeSecondsMap = {};

//   // Assuming data is an array of objects containing uptime information
//   data?.forEach((entry) => {
//     const hostname = entry?.hostnames?.toLowerCase() || "unknown";
//     const uptimeSeconds = parseInt(entry?.uptimeSeconds || 0);

//     uptimeSecondsMap[hostname] = uptimeSeconds;
//   });

//   // Sort entries by uptime seconds (descending order)
//   const sortedEntries = Object.entries(uptimeSecondsMap).sort(
//     (a, b) => b[1] - a[1]
//   ); // Sorting by uptime seconds descending

//   // Extract labels (hosts) and data (uptime seconds)
//   const labels = sortedEntries.map(([hostname]) => hostname);
//   const dataValues = sortedEntries.map(([, uptimeSeconds]) => uptimeSeconds);

//   return {
//     labels,
//     datasets: [
//       {
//         label: "Uptime Seconds",
//         data: dataValues,
//         borderColor: "rgb(233, 136, 233)", // Line color
//         borderWidth: 1,
//         backgroundColor: "#a2a2db57",
//         fill: true,
//         tension: 0.8, // Tension for curved lines, adjust as needed
//       },
//     ],
//   };
// };

export const transformDataForHorizontalBarChart = (data) => {
  const macVendorCountMap = {};

  // Check if data is not an object
  if (typeof data !== "object" || Array.isArray(data)) {
    console.error("Data is not an object:", data);
    return {
      labels: [],
      datasets: [],
    };
  }

  // Assuming data is an object containing MAC vendor information
  const mac = data?.addresses?.mac?.toLowerCase() || "unknown";
  macVendorCountMap[mac] = (macVendorCountMap[mac] || 0) + 1;

  // Sort MAC vendors by count in descending order
  const sortedEntries = Object.entries(macVendorCountMap).sort(
    ([, a], [, b]) => b - a
  );

  // Select top 6 MAC vendors or less
  const topVendors = sortedEntries.slice(0, 6);

  // Extract labels (vendors) and data (counts)
  const labels = topVendors.map(([mac]) => mac);
  const dataValues = topVendors.map(([, count]) => count);

  // Colors for bars
  const backgroundColor = [
    "#00ffd2",
    "#5acfbb",
    "rgba(75, 192, 192, 0.9)",
    "#0f8187",
    "rgba(153, 102, 255, 0.1)",
    "rgba(245, 105, 105, 0.7)",
  ];

  return {
    labels,
    datasets: [
      {
        label: "Total Devices",
        data: dataValues,
        backgroundColor,
        hoverBackgroundColor: backgroundColor.map((color) =>
          color.replace(/[\d\.]+\)$/g, "0.5)")
        ), // Adjust hover transparency
      },
    ],
  };
};

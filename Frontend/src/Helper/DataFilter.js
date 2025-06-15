export function extractOpenPorts(scanDataArray) {
  const openPorts = {};

  // Iterate over each scanData object in the scanDataArray
  scanDataArray?.forEach((scanData) => {
    // Extract hosts from scanData.payload, defaulting to an empty object
    const hosts = Object.keys(scanData?.addresses || {});

    // Iterate over each host
    hosts?.forEach((host) => {
      // Extract TCP ports from the current host, defaulting to an empty object
      const tcpPorts = scanData?.ports || {};

      // Iterate over each port and its info
      Object.entries(tcpPorts)?.forEach(([port, portInfo]) => {
        // Check if the port state is 'open'
        if (portInfo?.state === "open") {
          // Increment the count of the port in openPorts, or initialize it to 1 if not present
          openPorts[port] = (openPorts[port] || 0) + 1;
        }
      });
    });
  });

  return openPorts;
}

export function extractOsInfo(scanDataArray) {
  const osInfo = {};

  // Iterate over each scanData object in scanDataArray
  scanDataArray?.forEach((scanData) => {
    // Extract hosts from scanData.addresses, defaulting to an empty object
    const hosts = Object.keys(scanData?.addresses || {});

    // Check if there's a direct 'os' with 'name' field
    if (scanData?.os?.name) {
      const osName = scanData.os.name || "Unknown OS";
      osInfo[osName] = (osInfo[osName] || 0) + 1;
    }

    // Iterate over each host
    hosts?.forEach((host) => {
      // Extract osmatch array from the current host, defaulting to an empty array
      // const osMatches = scanData?.os?.osmatch || [];

      // Iterate over each osmatch entry
      // osMatches?.forEach((osMatch) => {
      // Extract the OS name from osmatch or default to "Unknown OS"
      const osName = scanData?.os?.[0]?.name || "Unknown OS";

      // Increment the count of osName in osInfo
      osInfo[osName] = (osInfo[osName] || 0) + 1;
      // });
    });
  });

  return osInfo;
}

export function extractSeverityCounts(scanDataArray) {
  const severityCounts = {};

  scanDataArray?.forEach((scanData) => {
    const severity = scanData.severity || "Unknown Severity";

    if (!severityCounts[severity]) {
      severityCounts[severity] = 0;
    }
    severityCounts[severity]++;
  });

  return severityCounts;
}

export function extractOsAccuracy(scanDataArray) {
  const osAccuracy = [];
  scanDataArray?.forEach((scanData) => {
    const hostnames = scanData?.os?.[0]?.name || "unknown"; // Adjusted to use 'hostnames' from 'scanData'
    const osMatches = scanData?.os || []; // Adjusted to use 'os' and 'osmatch' from 'scanData'

    // osMatches?.forEach((osMatch) => {
    const accuracy = osMatches[0]?.accuracy || 0; // Adjusted to use 'accuracy' from 'osMatch'
    osAccuracy.push({ host: hostnames, accuracy });
    // });
  });

  return osAccuracy;
}

export function extractReasonsForPortStates(scanDataArray) {
  const port21States = {};

  scanDataArray?.forEach((scanData) => {
    const tcpPorts = scanData?.ports || {};
    const port21Info = tcpPorts["21"];
    if (port21Info) {
      const state = port21Info.state || "Unknown";

      if (!port21States[state]) {
        port21States[state] = 0;
      }
      port21States[state]++;
    }
  });

  return port21States;
}

export function extractIpsAndOpenPorts(scanDataArray) {
  const ipsAndOpenPorts = {};

  // Iterate over each scanData object in the scanDataArray
  scanDataArray?.forEach((scanData) => {
    // Extract IPv4 address
    const ipv4 = scanData?.addresses?.ipv4;
    if (!ipv4) return;

    // Count open ports
    const ports = scanData?.ports || {};
    const openPortsCount = Object.values(ports)?.filter(
      (portInfo) => portInfo.state === "open"
    ).length;

    // Store the IP address and its open ports count
    ipsAndOpenPorts[ipv4] = openPortsCount;
  });

  return ipsAndOpenPorts;
}

export function extractHostUptime(scanDataArray) {
  const uptimes = [];

  scanDataArray.forEach((scanData) => {
    const hosts = Object.keys(scanData.payload || {});
    hosts?.forEach((host) => {
      const uptimeInfo = scanData.payload[host]?.uptime || {};
      const seconds = uptimeInfo.seconds || "unknown";
      const lastboot = uptimeInfo.lastboot || "unknown";
      uptimes.push({ host, seconds, lastboot });
    });
  });

  return uptimes;
}

export function extractMacVendors(scanDataArray) {
  const macVendors = {};

  scanDataArray?.forEach((scanData) => {
    const hosts = Object.keys(scanData.payload || {});
    hosts.forEach((host) => {
      const addresses = scanData.payload[host]?.addresses || {};
      const macAddress = addresses.mac || "Unknown";
      if (macVendors[macAddress]) {
        macVendors[macAddress]++;
      } else {
        macVendors[macAddress] = 1;
      }
    });
  });

  return macVendors;
}

// export function extractOpenPorts(scanDataArray) {
//   const openPorts = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData?.scan || {});
//     hosts.forEach((host) => {
//       const tcpPorts = scanData.scan?.[host]?.tcp || {};
//       Object?.entries(tcpPorts)?.forEach(([port, portInfo]) => {
//         if (portInfo?.state === "open") {
//           if (openPorts[port]) {
//             openPorts[port]++;
//           } else {
//             openPorts[port] = 1;
//           }
//         }
//       });
//     });
//   });

//   return openPorts;
// }
// export function extractOsInfo(scanDataArray) {
//   const osInfo = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData?.scan || {});
//     hosts.forEach((host) => {
//       const osMatches = scanData?.scan?.[host]?.osmatch || [];
//       osMatches.forEach((osMatch) => {
//         const osName = osMatch?.name || "Unknown OS";
//         if (osInfo[osName]) {
//           osInfo[osName]++;
//         } else {
//           osInfo[osName] = 1;
//         }
//       });
//     });
//   });

//   return osInfo;
// }
// export function extractOsAccuracy(scanDataArray) {
//   const uptimes = [];

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object.keys(scanData?.scan || {});
//     hosts.forEach((host) => {
//       const osMatches = scanData?.scan?.[host]?.osmatch || [];
//       osMatches.forEach((osMatch) => {
//         const uptimeInfo = osMatch.accuracy || "unknown";
//         uptimes.push({ host, uptimeInfo });
//       });
//     });
//   });

//   return uptimes;
// }
// export function extractHostUptime(scanDataArray) {
//   const uptimes = [];

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object.keys(scanData?.scan || {});
//     hosts.forEach((host) => {
//       const uptimeInfo = scanData?.scan?.[host]?.uptime || {};
//       const seconds = uptimeInfo?.seconds || "unknown";
//       const lastboot = uptimeInfo?.lastboot || "unknown";
//       uptimes.push({ host, seconds, lastboot });
//     });
//   });

//   return uptimes;
// }
// export function extractMacVendors(scanDataArray) {
//   const osClassVendors = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object.keys(scanData?.scan || {});
//     hosts.forEach((host) => {
//       const osMatches = scanData?.scan?.[host]?.osmatch || [];
//       osMatches.forEach((osMatch) => {
//         const osClasses = osMatch.osclass || [];
//         osClasses.forEach((osClass) => {
//           const vendor = osClass.vendor || "Unknown";

//           if (osClassVendors[vendor]) {
//             osClassVendors[vendor].count += 1;
//           } else {
//             osClassVendors[vendor] = { count: 1 };
//           }
//         });
//       });
//     });
//   });

//   return osClassVendors;
// }

// export function extractPortStates(scanDataArray) {
//   const portStates = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData?.scan || {});

//     hosts.forEach((host) => {
//       const tcpPorts = scanData?.scan?.[host]?.tcp || {};
//       const states = new Set(
//         Object?.values(tcpPorts)?.map((portInfo) => portInfo?.state || "unknown")
//       );

//       states.forEach((state) => {
//         if (!portStates[state]) {
//           portStates[state] = 0;
//         }

//         portStates[state]++;
//       });
//     });
//   });

//   return portStates;
// }

// export function extractReasonsForPortStates(scanDataArray) {
//   const reasonsForPort21States = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object.keys(scanData?.scan || {});
//     hosts.forEach((host) => {
//       const tcpPorts = scanData?.scan?.[host]?.tcp || {};
//       const port21Info = tcpPorts['21'];
//       if (port21Info) {
//         const reason = port21Info?.reason ?? "Unknown"; // Use "Unknown" if reason is undefined

//         if (!reasonsForPort21States[reason]) {
//           reasonsForPort21States[reason] = 0;
//         }
//         reasonsForPort21States[reason] += 1;
//       }
//     });
//   });

//   return reasonsForPort21States;
// }

// export function extractServices(scanDataArray) {
//   const services = [];

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const tcpPorts = scanData.scan[host]?.tcp || {};
//       Object?.entries(tcpPorts).forEach(([port, portInfo]) => {
//         const service = portInfo.name;
//         const state = portInfo.state;
//         services.push({ port, service, state });
//       });
//     });
//   });

//   return services;
// }

// export function extractOsDetection(scanDataArray) {
//   const osDetection = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const osMatches = scanData.scan[host]?.osmatch || [];
//       osMatches.forEach((match) => {
//         const osName = match.name;
//         const accuracy = parseInt(match.accuracy, 10);
//         if (osDetection[osName] !== undefined) {
//           osDetection[osName] = Math.max(osDetection[osName], accuracy);
//         } else {
//           osDetection[osName] = accuracy;
//         }
//       });
//     });
//   });

//   return osDetection;
// }

// export function extractHostStatus(scanDataArray) {
//   const hostStatuses = { up: 0, down: 0 };

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const status = scanData.scan[host]?.status?.state || "unknown";
//       if (hostStatuses[status] !== undefined) {
//         hostStatuses[status] += 1;
//       } else {
//         hostStatuses[status] = 1;
//       }
//     });
//   });

//   return hostStatuses;
// }

// // extra

// export function extractDetailedUptime(scanDataArray) {
//   const detailedUptime = [];

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const uptimeInfo = scanData.scan[host]?.uptime || {};
//       const seconds = parseInt(uptimeInfo.seconds, 10) || 0;
//       const hours = Math.floor(seconds / 3600);
//       const days = Math.floor(hours / 24);

//       detailedUptime.push({
//         host,
//         seconds,
//         hours,
//         days,
//         lastboot: uptimeInfo.lastboot || "Unknown",
//       });
//     });
//   });

//   return detailedUptime;
// }

// export function extractFilteredPortsNoResponse(scanDataArray) {
//   const filteredNoResponsePorts = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const tcpPorts = scanData.scan[host]?.tcp || {};
//       Object?.entries(tcpPorts).forEach(([port, portInfo]) => {
//         if (
//           portInfo.state === "filtered" &&
//           portInfo.reason === "no-response"
//         ) {
//           if (filteredNoResponsePorts[port]) {
//             filteredNoResponsePorts[port] += 1;
//           } else {
//             filteredNoResponsePorts[port] = 1;
//           }
//         }
//       });
//     });
//   });

//   return filteredNoResponsePorts;
// }

// export function extractHostnames(scanDataArray) {
//   const hostnames = [];

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const hostnamesArray = scanData.scan[host]?.hostnames || [];
//       hostnamesArray.forEach((hostnameInfo) => {
//         const hostname = hostnameInfo.name;
//         if (hostname) {
//           hostnames.push(hostname);
//         }
//       });
//     });
//   });

//   return hostnames;
// }

// export function extractServiceVersions(scanDataArray) {
//   const serviceVersions = {};

//   scanDataArray.forEach((scanData) => {
//     const hosts = Object?.keys(scanData.scan);
//     hosts.forEach((host) => {
//       const tcpPorts = scanData.scan[host]?.tcp || {};
//       Object?.entries(tcpPorts).forEach(([port, portInfo]) => {
//         const serviceName = portInfo.name || `Port ${port}`;
//         const serviceVersion = portInfo.version || "Unknown";

//         if (serviceVersions[serviceName] === undefined) {
//           serviceVersions[serviceName] = {};
//         }
//         if (serviceVersions[serviceName][serviceVersion] !== undefined) {
//           serviceVersions[serviceName][serviceVersion]++;
//         } else {
//           serviceVersions[serviceName][serviceVersion] = 1;
//         }
//       });
//     });
//   });

//   return serviceVersions;
// }

// Function to format and deduplicate CSV data
export function formatCSVData(data) {
  const groupedData = data.reduce((acc, item) => {
    // Initialize entry for this IP if it doesn't already exist
    if (!acc[item.IPv4]) {
      acc[item.IPv4] = {
        hostnames: item.Hostname,
        addresses: {
          ipv4: item.IPv4,
          mac: item.MAC || "", // Default to empty string if MAC is not provided
        },
        os: {
          osmatch: item.CPE
            ? [
                {
                  name: item.CPE.split(":")[2],
                  accuracy: 100,
                },
              ]
            : [],
        },
        ports: [], // Initialize as an object to store ports by number
        script: {
          "ssl-date": "TLS randomness does not represent time",
          "ssl-cert": `Subject: commonName=${item.Hostname}/organizationName=Example Co/stateOrProvinceName=Sindh/countryName=PK\nNot valid before: 2022-01-01T00:00:00\nNot valid after: 2023-01-01T00:00:00`,
        },
        scripts: [
          {
            id: "smb2-time",
            output: "Date: 2024-07-10T15:19:01",
          },
          {
            id: "smb2-security-mode",
            output: "Message signing enabled but not required",
          },
          {
            id: "msrpc-enum",
            output: "Enumerated 5 endpoints",
          },
        ],
        severity: item.Severity,
      };
    }

    // Create port info
    const portInfo = {
      state: item.State,
      reason: item.Reason,
      name: item.Name,
      product: item.Product,
      version: item.Version,
      extrainfo: item.ExtraInfo,
      conf: item.Confidence,
      cpe: item.CPE,
    };

    // Store port info directly under its port number
    acc[item.IPv4].ports[item.Port] = portInfo;

    return acc;
  }, {});

  // Convert the grouped data object into an array
  return Object.values(groupedData);
}

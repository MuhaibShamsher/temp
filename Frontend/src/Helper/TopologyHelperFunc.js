export const convertIpDataToComponentFormat = (data) => {
  const rootNode = {
    name: "Root",
    children: [],
  };

  // Validate input data
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid input data format or empty array");
    return rootNode; // Return empty root node if data is invalid or empty
  }

  data?.forEach((item) => {
    const { hostnames, addresses, os, ports, severity } = item;

    const { ipv4, mac } = addresses || {};

    if (!ipv4) {
      console.error("Missing IPv4 address");
      return; // Skip processing this item if IPv4 address is missing
    }

    const node = {
      name: `${ipv4} - ${severity}`,
      children: [],
    };

    // Add hostnames if present
    if (hostnames) {
      node.children.push({
        name: "hostnames",
        children: [
          {
            name: hostnames,
          },
        ],
      });
    }

    // Add addresses details
    const addressesNode = {
      name: "addresses",
      children: [
        {
          name: "ipv4",
          children: [
            {
              name: ipv4,
            },
          ],
        },
        {
          name: "mac",
          children: [
            {
              name: mac || "Not available",
            },
          ],
        },
      ],
    };
    node.children.push(addressesNode);

    // Add os details if present
    if (os && os.osmatch && os.osmatch.length > 0) {
      const osNode = {
        name: "os",
        children: [
          {
            name: "osmatch",
            children: os.osmatch.map((osmatch) => ({
              name: JSON.stringify(osmatch),
            })),
          },
        ],
      };
      node.children.push(osNode);
    }

    // Add ports details if present
    if (ports) {
      const portsNode = {
        name: "ports",
        children: Object.entries(ports).map(([port, portData]) => {
          const {
            state,
            reason,
            name,
            product,
            version,
            extrainfo,
            conf,
            cpe,
          } = portData;

          const portNode = {
            name: `${port}`,
            children: [
              {
                name: "state",
                children: [
                  {
                    name: state,
                  },
                ],
              },
              {
                name: "reason",
                children: [
                  {
                    name: reason,
                  },
                ],
              },
              {
                name: "name",
                children: [
                  {
                    name: name,
                  },
                ],
              },
              {
                name: "product",
                children: [
                  {
                    name: product,
                  },
                ],
              },
              {
                name: "version",
                children: [
                  {
                    name: version,
                  },
                ],
              },
              {
                name: "extrainfo",
                children: [
                  {
                    name: extrainfo,
                  },
                ],
              },
              {
                name: "conf",
                children: [
                  {
                    name: conf,
                  },
                ],
              },
              {
                name: "cpe",
                children: [
                  {
                    name: cpe,
                  },
                ],
              },
            ],
          };
          return portNode;
        }),
      };
      node.children.push(portsNode);
    }

    // Add severity details
    const severityNode = {
      name: "severity",
      children: [
        {
          name: severity,
        },
      ],
    };
    node.children.push(severityNode);

    // Push the constructed node to the root
    rootNode.children.push(node);
  });

  return rootNode;
};

export const convertPortDataToComponentFormat = (data) => {
  const rootNode = {
    name: "Root",
    children: [],
  };

  if (!data || typeof data !== "object") {
    console.error("Invalid input data format");
    return rootNode; // Return empty root node if data is invalid
  }

  const {
    portId,
    state,
    reason,
    name,
    product,
    version,
    extrainfo,
    conf,
    cpe,
  } = data;

  const portNode = {
    name: `Port ${portId}`,
    children: [
      {
        name: "state",
        children: [
          {
            name: state,
          },
        ],
      },
      {
        name: "reason",
        children: [
          {
            name: reason,
          },
        ],
      },
      {
        name: "name",
        children: [
          {
            name: name,
          },
        ],
      },
      {
        name: "product",
        children: [
          {
            name: product,
          },
        ],
      },
      {
        name: "version",
        children: [
          {
            name: version,
          },
        ],
      },
      {
        name: "extrainfo",
        children: [
          {
            name: extrainfo || "Not available",
          },
        ],
      },
      {
        name: "conf",
        children: [
          {
            name: conf,
          },
        ],
      },
      {
        name: "cpe",
        children: [
          {
            name: cpe,
          },
        ],
      },
    ],
  };

  rootNode.children.push(portNode);

  return rootNode;
};

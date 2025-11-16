export const COMPONENT_LIBRARY = [
  {
    id: "pump-001",
    name: "Centrifugal Pump",
    category: "Fluid Handling",
    description: "Moves process fluid through the loop.",
    ports: [
      { id: "pump-001-in", label: "Suction", direction: "input", medium: "water" },
      { id: "pump-001-out", label: "Discharge", direction: "output", medium: "water" },
      { id: "pump-001-power", label: "Power", direction: "input", medium: "power" }
    ]
  },
  {
    id: "hx-001",
    name: "Plate Heat Exchanger",
    category: "Thermal",
    description: "Transfers heat between two circuits.",
    ports: [
      { id: "hx-001-hot-in", label: "Hot In", direction: "input", medium: "water" },
      { id: "hx-001-hot-out", label: "Hot Out", direction: "output", medium: "water" },
      { id: "hx-001-cold-in", label: "Cold In", direction: "input", medium: "glycol" },
      { id: "hx-001-cold-out", label: "Cold Out", direction: "output", medium: "glycol" }
    ]
  },
  {
    id: "valve-001",
    name: "Control Valve",
    category: "Flow Control",
    description: "Throttles downstream flow.",
    ports: [
      { id: "valve-001-in", label: "Inlet", direction: "input", medium: "water" },
      { id: "valve-001-out", label: "Outlet", direction: "output", medium: "water" },
      { id: "valve-001-signal", label: "Signal", direction: "input", medium: "control" }
    ]
  },
  {
    id: "sensor-001",
    name: "Temperature Sensor",
    category: "Instrumentation",
    description: "Reports temperature to the controller.",
    ports: [
      { id: "sensor-001-process", label: "Process", direction: "input", medium: "water" },
      { id: "sensor-001-signal", label: "Signal", direction: "output", medium: "control" }
    ]
  },
  {
    id: "controller-001",
    name: "PID Controller",
    category: "Control",
    description: "Manages setpoints and outputs.",
    ports: [
      { id: "controller-001-sense", label: "Sense", direction: "input", medium: "control" },
      { id: "controller-001-drive", label: "Drive", direction: "output", medium: "control" },
      { id: "controller-001-power", label: "Power", direction: "input", medium: "power" }
    ]
  }
];

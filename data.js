export const COMPONENT_LIBRARY = [
  {
    id: "mixer-compact",
    name: "Compact Audio Mixer",
    category: "Sound",
    description: "Two-channel mixer with balanced main outs.",
    ports: [
      { id: "mixer-compact-ch1", label: "Mic In 1", direction: "input", medium: "audio" },
      { id: "mixer-compact-ch2", label: "Mic In 2", direction: "input", medium: "audio" },
      { id: "mixer-compact-main-l", label: "Main Out L", direction: "output", medium: "audio" },
      { id: "mixer-compact-main-r", label: "Main Out R", direction: "output", medium: "audio" },
      { id: "mixer-compact-aux", label: "Aux Send", direction: "output", medium: "audio" },
      { id: "mixer-compact-power", label: "Power In", direction: "input", medium: "power" }
    ]
  },
  {
    id: "mic-wired",
    name: "Wired Vocal Mic",
    category: "Sound",
    description: "Dynamic microphone for vocals.",
    ports: [
      { id: "mic-wired-out", label: "XLR Out", direction: "output", medium: "audio" }
    ]
  },
  {
    id: "mic-wireless",
    name: "Wireless Lavalier",
    category: "Sound",
    description: "Bodypack wireless system.",
    ports: [
      { id: "mic-wireless-audio", label: "Audio Out", direction: "output", medium: "audio" },
      { id: "mic-wireless-power", label: "DC In", direction: "input", medium: "power" }
    ]
  },
  {
    id: "speaker-powered",
    name: "Powered Speaker",
    category: "Sound",
    description: "12"" full-range cabinet.",
    ports: [
      { id: "speaker-powered-line", label: "Line In", direction: "input", medium: "audio" },
      { id: "speaker-powered-link", label: "Link Out", direction: "output", medium: "audio" },
      { id: "speaker-powered-power", label: "Power In", direction: "input", medium: "power" }
    ]
  },
  {
    id: "stage-monitor",
    name: "Stage Monitor",
    category: "Sound",
    description: "Wedge for performers.",
    ports: [
      { id: "stage-monitor-line", label: "Line In", direction: "input", medium: "audio" },
      { id: "stage-monitor-power", label: "Power In", direction: "input", medium: "power" }
    ]
  },
  {
    id: "power-distro",
    name: "Power Distro",
    category: "Power",
    description: "Feeds gear with conditioned AC.",
    ports: [
      { id: "power-distro-mains", label: "AC In", direction: "input", medium: "power" },
      { id: "power-distro-a", label: "Outlet A", direction: "output", medium: "power" },
      { id: "power-distro-b", label: "Outlet B", direction: "output", medium: "power" },
      { id: "power-distro-c", label: "Outlet C", direction: "output", medium: "power" },
      { id: "power-distro-d", label: "Outlet D", direction: "output", medium: "power" }
    ]
  }
];

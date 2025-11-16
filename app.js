import { COMPONENT_LIBRARY } from "./data.js";

class Port {
  constructor(definition, equipmentId) {
    this.id = `${equipmentId}-${definition.id}`;
    this.definitionId = definition.id;
    this.label = definition.label;
    this.direction = definition.direction;
    this.medium = definition.medium;
    this.equipmentId = equipmentId;
  }

  isCompatible(other) {
    if (!other) return false;
    if (this.equipmentId === other.equipmentId) {
      return false;
    }
    const mediaMatch = this.medium === other.medium;
    const directionMatch = this.direction !== other.direction;
    return mediaMatch && directionMatch;
  }
}

class Equipment {
  constructor(definition, instanceNumber) {
    this.templateId = definition.id;
    this.instanceId = `${definition.id}-inst-${instanceNumber}`;
    this.name = definition.name;
    this.category = definition.category;
    this.description = definition.description;
    this.ports = definition.ports.map(
      (portDef) => new Port(portDef, this.instanceId)
    );
  }
}

class SystemModel {
  constructor() {
    this.equipment = [];
    this.connections = [];
  }

  addEquipment(equipment, position) {
    this.equipment.push({ data: equipment, position });
  }

  connect(portA, portB) {
    if (!portA || !portB) {
      return { ok: false, reason: "Missing ports." };
    }

    if (!portA.isCompatible(portB)) {
      if (portA.equipmentId === portB.equipmentId) {
        return { ok: false, reason: "Select two different components." };
      }
      if (portA.medium !== portB.medium) {
        return { ok: false, reason: "Medium types do not match." };
      }
      return { ok: false, reason: "Ports must have opposite directions." };
    }

    const alreadyConnected = this.connections.some(
      (connection) =>
        (connection.a === portA.id && connection.b === portB.id) ||
        (connection.a === portB.id && connection.b === portA.id)
    );

    if (alreadyConnected) {
      return { ok: false, reason: "Ports are already connected." };
    }

    this.connections.push({ a: portA.id, b: portB.id });
    return { ok: true };
  }
}

const canvasEl = document.getElementById("canvas");
const componentListEl = document.getElementById("component-list");
const inspectorEl = document.getElementById("inspector-log");

const system = new SystemModel();
const portIndex = new Map();
let pendingPortId = null;
let equipmentCounter = 0;

function logInspector(message, status = "info") {
  const entry = document.createElement("p");
  if (status === "ok") entry.classList.add("connection-ok");
  if (status === "error") entry.classList.add("connection-error");
  entry.textContent = message;
  inspectorEl.prepend(entry);
}

function renderComponentLibrary() {
  componentListEl.innerHTML = "";
  COMPONENT_LIBRARY.forEach((component) => {
    const card = document.createElement("article");
    card.className = "component-card";
    card.draggable = true;
    card.dataset.componentId = component.id;

    card.innerHTML = `
      <h3>${component.name}</h3>
      <p>${component.description}</p>
      <div class="component-meta">
        <span>${component.category}</span>
        <span>${component.ports.length} ports</span>
      </div>
    `;

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("componentId", component.id);
      event.dataTransfer.effectAllowed = "copy";
    });

    componentListEl.appendChild(card);
  });
}

function createEquipmentInstance(componentId) {
  const definition = COMPONENT_LIBRARY.find((item) => item.id === componentId);
  if (!definition) return null;
  equipmentCounter += 1;
  return new Equipment(definition, equipmentCounter);
}

function renderEquipment(equipment, position) {
  const placeholder = canvasEl.querySelector(".canvas-placeholder");
  if (placeholder) placeholder.remove();

  const equipmentEl = document.createElement("div");
  equipmentEl.className = "equipment";
  equipmentEl.dataset.instanceId = equipment.instanceId;
  equipmentEl.style.left = `${Math.max(8, position.x - 85)}px`;
  equipmentEl.style.top = `${Math.max(8, position.y - 40)}px`;

  equipmentEl.innerHTML = `
    <h3 class="equipment-title">${equipment.name}</h3>
    <div class="port-list"></div>
  `;

  const portListEl = equipmentEl.querySelector(".port-list");
  equipment.ports.forEach((port) => {
    portIndex.set(port.id, port);
    const portEl = document.createElement("button");
    portEl.type = "button";
    portEl.className = "port";
    portEl.dataset.portId = port.id;
    portEl.dataset.direction = port.direction;
    portEl.textContent = `${port.label} (${port.medium})`;
    portEl.addEventListener("click", () => handlePortClick(port.id, portEl));
    portListEl.appendChild(portEl);
  });

  canvasEl.appendChild(equipmentEl);
}

function handlePortClick(portId, portEl) {
  const currentlySelected = canvasEl.querySelectorAll(
    '.port[data-selected="true"]'
  );
  currentlySelected.forEach((el) => {
    if (el !== portEl && el.dataset.portId !== pendingPortId) {
      el.dataset.selected = "false";
    }
  });

  const toggledOn = portEl.dataset.selected !== "true";
  portEl.dataset.selected = toggledOn ? "true" : "false";

  if (toggledOn && !pendingPortId) {
    pendingPortId = portId;
    logInspector(`Selected ${portIndex.get(portId).label}.`);
    return;
  }

  if (!toggledOn && pendingPortId === portId) {
    pendingPortId = null;
    logInspector("Selection cleared.");
    return;
  }

  if (pendingPortId && pendingPortId !== portId) {
    const firstPort = portIndex.get(pendingPortId);
    const secondPort = portIndex.get(portId);
    const result = system.connect(firstPort, secondPort);

    if (result.ok) {
      logInspector(
        `Connected ${firstPort.label} to ${secondPort.label}.`,
        "ok"
      );
    } else {
      logInspector(`Cannot connect: ${result.reason}`, "error");
    }

    const selectedPorts = canvasEl.querySelectorAll('.port[data-selected="true"]');
    selectedPorts.forEach((el) => (el.dataset.selected = "false"));
    pendingPortId = null;
  }
}

function setupCanvasInteractions() {
  canvasEl.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  canvasEl.addEventListener("drop", (event) => {
    event.preventDefault();
    const componentId = event.dataTransfer.getData("componentId");
    if (!componentId) return;
    const equipment = createEquipmentInstance(componentId);
    if (!equipment) return;

    const rect = canvasEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    system.addEquipment(equipment, { x, y });
    renderEquipment(equipment, { x, y });
    logInspector(`Placed ${equipment.name} on the canvas.`);
  });
}

renderComponentLibrary();
setupCanvasInteractions();

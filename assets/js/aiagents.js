let currentLayerIndex = 0;

const layers = [
    {
        id: "agent",
        name: "SURFACE | AI Agent",
        selector: ".agent-rock",
        responsibility:
            "Turning a goal into action. Deciding what needs to happen next."
    },
    {
        id: "runtime",
        name: "Agent Runtime",
        selector: ".runtime-layer",
        responsibility:
            "Orchestration, planning loops, memory, and tool coordination."
    },
    {
        id: "llm",
        name: "LLM",
        selector: ".llm-layer",
        responsibility:
            "Reasoning, language understanding, and generating responses."
    },
    {
        id: "mcp",
        name: "MCP",
        selector: ".mcp-layer",
        responsibility:
            "Connecting the agent to external tools, data, and context."
    },
    {
        id: "infra",
        name: "Infrastructure",
        selector: ".infra-layer",
        responsibility:
            "Providing the environment where the agent can run reliably."
    }
];

document.addEventListener("DOMContentLoaded", () => {

    const digButton = document.querySelector("#dig-button");
    const backButton = document.querySelector("#back-button");
    const instruction = document.querySelector(".dig-instruction");

    const currentLayerText = document.querySelector("#current-layer");
    const layersRemaining = document.querySelector("#layers-remaining");
    const responsibility = document.querySelector("#layer-responsibilities");


    function renderLayers() {

        layers.forEach((layer, index) => {

            const element = document.querySelector(layer.selector);

            if (!element) return;

            const difference = index - currentLayerIndex;

            // Current layer
            if (difference === 0) {

                element.classList.remove("hidden");

                element.style.transform =
                    "translateX(-50%) translateY(0) scale(1)";

                element.style.opacity = "1";
                element.style.pointerEvents = "auto";
            }

            // Previously uncovered layers
            else if (difference < 0) {

                element.classList.remove("hidden");

                const distance = Math.abs(difference) * 80;

                element.style.transform =
                    `translateX(-50%) translateY(-${distance}px) scale(.86)`;

                element.style.opacity =
                    Math.max(
                        0,
                        0.65 - (Math.abs(difference) * 0.22)
                    );

                element.style.pointerEvents = "none";
            }

            // Layers we haven't reached yet
            else {

                element.classList.remove("hidden");

                element.style.transform =
                    "translateX(-50%) translateY(70px) scale(.9)";

                element.style.opacity = "0";
                element.style.pointerEvents = "none";
            }
        });
    }


    function updateStatus() {

        const layer = layers[currentLayerIndex];

        currentLayerText.textContent = layer.name;
        responsibility.textContent = layer.responsibility;

        layersRemaining.textContent =
            layers.length - 1 - currentLayerIndex;


        // Hide initial instruction after leaving surface
        if (currentLayerIndex === 0) {
            instruction.classList.remove("instruction-hidden");
        } else {
            instruction.classList.add("instruction-hidden");
        }


        // Back only appears after first dig
        backButton.hidden = currentLayerIndex === 0;


        // Hide Dig deeper at the bottom
        if (currentLayerIndex === layers.length - 1) {
            digButton.classList.add("dig-complete");
        } else {
            digButton.classList.remove("dig-complete");
        }
    }


    digButton.addEventListener("click", () => {

        if (currentLayerIndex >= layers.length - 1) {
            return;
        }

        currentLayerIndex++;

        renderLayers();
        updateStatus();
    });


    backButton.addEventListener("click", () => {

        if (currentLayerIndex <= 0) {
            return;
        }

        currentLayerIndex--;

        renderLayers();
        updateStatus();
    });


    // Initial state
    renderLayers();
    updateStatus();

});
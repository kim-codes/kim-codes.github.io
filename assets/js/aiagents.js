let currentLayerIndex = 0;

const layers = [
    {
        name: "Surface | AI Agent",
        description:
            "This is the part we see first. The agent takes a goal, reasons through what to do, and decides what should happen next.",
        adds:
            "Turns a request into a plan of action.",
        without:
            "There would be no agent coordinating the work toward a goal."
    },
    {
        name: "Agent Runtime",
        description:
            "An agent needs more than a plan. The runtime manages the steps, tracks progress, and coordinates what happens as the agent works.",
        adds:
            "A way to organize and execute a multi-step workflow.",
        without:
            "The model could suggest actions, but there would be no system managing their execution."
    },
    {
        name: "LLM",
        description:
            "The language model helps the agent interpret instructions, work with information, and decide what to do next.",
        adds:
            "Language understanding and model-driven decisions.",
        without:
            "This kind of language-model-driven agent would lose its reasoning component."
    },
    {
        name: "MCP",
        description:
            "The Model Context Protocol provides a standardized way for applications to connect models and agents with external tools and information.",
        adds:
            "A common interface for discovering and using external capabilities.",
        without:
            "The agent could still use tools through other integrations, but not through this standardized interface."
    },
    {
        name: "Infrastructure",
        description:
            "Underneath everything is the environment where the agent and its tools run. Compute, storage, networking, and isolation all help support reliable execution.",
        adds:
            "The resources and environment needed to run the system.",
        without:
            "The agent would have nowhere to execute its work."
    }
];

document.addEventListener("DOMContentLoaded", () => {

    const visualLayers = document.querySelectorAll(".soil-layer");

    const currentLayerText = document.querySelector("#current-layer");
    const description = document.querySelector("#layer-description");
    const adds = document.querySelector("#layer-adds");
    const without = document.querySelector("#layer-without");

    const digButton = document.querySelector("#dig-button");
    const backButton = document.querySelector("#back-button");

    function render() {

        const layer = layers[currentLayerIndex];

        currentLayerText.textContent = layer.name;
        description.textContent = layer.description;
        adds.textContent = layer.adds;
        without.textContent = layer.without;

        visualLayers.forEach((element, index) => {
            element.classList.toggle(
                "active",
                index === currentLayerIndex
            );

            element.classList.toggle(
                "uncovered",
                index < currentLayerIndex
            );
        });

        backButton.hidden = currentLayerIndex === 0;

        digButton.classList.toggle(
            "dig-complete",
            currentLayerIndex === layers.length - 1
        );
    }

    digButton.addEventListener("click", () => {
        if (currentLayerIndex < layers.length - 1) {
            currentLayerIndex++;
            render();
        }
    });

    backButton.addEventListener("click", () => {
        if (currentLayerIndex > 0) {
            currentLayerIndex--;
            render();
        }
    });

    render();
});
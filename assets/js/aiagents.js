let currentLayerIndex = 0;

const layers = [
    {
        name: "At the surface, AI Agent",
        description:
            "The agent takes a goal, reasons through what to do, and decides what should happen next.",
        adds:
            "Turns a request into a plan of action.",
        without:
            "There would be no agent coordinating the work toward a goal."
    },
    {
        name: "Agent Runtime",
        description:
            "Now we need something to execute. Keepstrack of steps and make sure things get done.",
        adds:
            "A way to organize and execute a multi-step workflow.",
        without:
            "There would be no system managing the execution."
    },

    {
        name: "LLM",
        description:
            "But how does the agent figure out what to do? That's where the language model comes in. It interprets the request and helps decide what should happen next.",
        adds:
            "The ability to understand instructions and make decisions.",
        without:
            "The agent would lose the model that helps it decide what to do."
    },
    {
        name: "MCP",
        description:
            "Now what if the agent needs information or tools outside itself. MCP gives it a standard way to connect to them, without building a different integration for everything.",
        adds:
            "A common way to connect to external tools and information.",
        without:
            "We would need another way to connect those tools. MCP isn't the only option."
    },
    {
        name: "Infrastructure",
        description:
            "All of this needs somewhere to run. That is where infrastructure comes in. Compute, storage, and networking. Keeps everything working.",
        adds:
            "The environment and resources to run the agent.",
        without:
            "There is nowhere for the agent and its tools to run."
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
            const isActive = index === currentLayerIndex;

            element.classList.toggle("active", isActive);
            element.classList.toggle("uncovered", index < currentLayerIndex);

            element.setAttribute("aria-pressed", String(isActive));
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

    // Allow visitors to explore layers directly
    visualLayers.forEach((element, index) => {

        element.addEventListener("click", () => {
            currentLayerIndex = index;
            render();
        });

        // Keyboard accessibility
        element.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                currentLayerIndex = index;
                render();
            }
        });

    });

    render();
});
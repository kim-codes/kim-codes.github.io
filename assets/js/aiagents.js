let currentLayer = "agent";

const layers = {
    agent: {
        name: "AI Agent",
        remaining: 5,
        responsibility:
            "Turning a goal into action. Deciding what needs to happen next."
    },

    runtime: {
        name: "Agent Runtime",
        remaining: 4,
        responsibility:
            "Orchestration, planning loops, memory, and tool coordination."
    },

    llm: {
        name: "LLM",
        remaining: 3,
        responsibility:
            "Reasoning, language understanding, and generating responses."
    },

    mcp: {
        name: "MCP",
        remaining: 2,
        responsibility:
            "Connecting the agent to external tools, data, and context."
    },

    infra: {
        name: "Infra",
        remaining: 1,
        responsibility:
            "Providing secure, reliable environments where agents can run."
    }
};


document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector("#dig-button");

    const agent = document.querySelector(".agent-icon");
    const runtime = document.querySelector(".runtime-icon");

    const currentLayerText = document.querySelector("#current-layer");
    const layersRemaining = document.querySelector("#layers-remaining");
    const responsibility = document.querySelector("#layer-responsibilities");

    button.addEventListener("click", () => {

        // Move current layer
        agent.classList.add("dug");

        // Reveal next layer
        runtime.classList.remove("hidden");
        runtime.classList.add("reveal");

        // Update current state
        currentLayer = "runtime";
        const layer = layers[currentLayer];

        // Update status card
        currentLayerText.textContent = layer.name;
        layersRemaining.textContent = layer.remaining;
        responsibility.textContent = layer.responsibility;
    });

});
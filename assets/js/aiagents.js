document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector("#dig-button");
    const agent = document.querySelector(".agent-icon");
    const llm = document.querySelector(".llm-icon");

    button.addEventListener("click", () => {

        agent.classList.add("dug");

        llm.classList.remove("hidden");
        llm.classList.add("reveal");

    });

});
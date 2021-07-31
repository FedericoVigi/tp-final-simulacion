(function () {

    let simulateBtn = document.getElementById("simulate-btn");

    simulateBtn.onclick = function () {
        
        let scenarios = []
        for (let i = 1; i <=3; i++) {
            let weekAgents = parseInt(document.getElementById(`weekAgents${i}`).value)
            let weekendAgents = parseInt(document.getElementById(`weekendAgents${i}`).value)
            if(!isNaN(weekAgents) && !isNaN(weekendAgents)){
                scenarios.push({
                    weekAgents: weekAgents,
                    weekendAgents: weekendAgents
                })
            }            
        }
        console.log(scenarios)
        results = simulateScenarios(scenarios)
        generateGraph(results)
    };


})();
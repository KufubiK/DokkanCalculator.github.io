function calculateATK() {
  const base = parseInt(document.getElementById("atkStat").value) || 0;
  const leader = (parseInt(document.getElementById("atkLeader").value) || 0) / 100;
  const supportMemory = (parseInt(document.getElementById("atkSupportMemory").value) || 0) / 100;
  const sot = (parseInt(document.getElementById("atkSoT").value) || 0) / 100;
  const nonSot = (parseInt(document.getElementById("atkNonSoT").value) || 0) / 100;
  const support = (parseInt(document.getElementById("atkSupport").value) || 0) / 100;
  const active = (parseInt(document.getElementById("atkActive").value) || 0) / 100;
  const eActive = (parseInt(document.getElementById("atkEActive").value) || 0) / 100;
  const domain = (parseInt(document.getElementById("atkdomain").value) || 0) / 100;
  const links = (parseFloat(document.getElementById("atkLinks").value) || 0) / 100;
  const kiMulti = (parseInt(document.getElementById("atkKiMulti").value) || 0) / 100;
  const saMulti = (parseInt(document.getElementById("atkSAMulti").value) || 0) / 100;
  const saBoost = parseInt(document.getElementById("atkSABoost").value) || 0;
  const saEffect = (parseInt(document.getElementById("atkSAEffect").value) || 0) / 100;
  const stacking = (parseInt(document.getElementById("atkStacking").value) || 0) / 100;

  result = base;
  result = Math.floor(result * (1 + leader));
  result = Math.floor(result * (1 + supportMemory));
  result = Math.floor(result * (1 + sot + support));
  result = Math.floor(result * (1 + links));
  result = Math.floor(result * (1 + active + eActive));
  result = Math.ceil(result * (kiMulti));
  result = Math.floor(result * (1 + nonSot));
  result = Math.floor(result * (saMulti + saEffect + stacking + saBoost*(0.05)));
  result = Math.floor(result * (1 + domain));

  document.getElementById("atkResult").textContent = `Result: ${result.toLocaleString()}`;
}

function calculateDEF() {
  const base = parseInt(document.getElementById("defStat").value) || 0;
  const leader = (parseInt(document.getElementById("defLeader").value) || 0) / 100;
  const supportmemory = (parseInt(document.getElementById("defSupportMemory").value) || 0) / 100;
  const sot = (parseInt(document.getElementById("defSoT").value) || 0) / 100;
  const nonsot = (parseInt(document.getElementById("defNonSoT").value) || 0) / 100;
  const support = (parseInt(document.getElementById("defSupport").value) || 0) / 100;
  const active = (parseInt(document.getElementById("defActive").value) || 0) / 100;
  const eactive = (parseInt(document.getElementById("defEActive").value) || 0 ) /100;
  const domain = (parseInt(document.getElementById("defdomain").value) || 0) / 100;
  const links = (parseFloat(document.getElementById("defLinks").value) || 0) / 100;
  const SAEffect = (parseInt(document.getElementById("defSAEffect").value) || 0) / 100;
  const stacking = (parseInt(document.getElementById("defStacking").value) || 0) / 100;

  result = base;
  result = Math.floor(result * (1 + leader));
  result = Math.floor(result * (1 + supportmemory));
  result = Math.floor(result * (1 + sot + support));
  result = Math.floor(result * (1 + links));
  result = Math.floor(result * (1 + active + eactive));
  result = Math.floor(result * (1 + nonsot));
  result = Math.floor(result * (1 + SAEffect));
  result = Math.floor(result * (1 + domain));
  result = Math.floor(result * (1 + stacking));

  document.getElementById("defResult").textContent = `Result: ${result.toLocaleString()}`;
}

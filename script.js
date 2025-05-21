function calculateATK() {
  const base = parceFloat(document.getElementById("atkStat").value) || 0;
  const leader = (parceFloat(document.getElementById("atkLeader").value) || 0) / 100;
  const supportMemory = (parceFloat(document.getElementById("atkSupportMemory").value) || 0) / 100;
  const sot = (parceFloat(document.getElementById("atkSoT").value) || 0) / 100;
  const nonSot = (parceFloat(document.getElementById("atkNonSoT").value) || 0) / 100;
  const support = (parceFloat(document.getElementById("atkSupport").value) || 0) / 100;
  const active = (parceFloat(document.getElementById("atkActive").value) || 0) / 100;
  const eActive = (parceFloat(document.getElementById("atkEActive").value) || 0) / 100;
  const domain = (parceFloat(document.getElementById("atkdomain").value) || 0) / 100;
  const links = (parseFloat(document.getElementById("atkLinks").value) || 0) / 100;
  const kiMulti = (parceFloat(document.getElementById("atkKiMulti").value) || 0) / 100;
  const saMulti = (parceFloat(document.getElementById("atkSAMulti").value) || 0) / 100;
  const saBoost = parceFloat(document.getElementById("atkSABoost").value) || 0;
  const saEffect = (parceFloat(document.getElementById("atkSAEffect").value) || 0) / 100;
  const stacking = (parceFloat(document.getElementById("atkStacking").value) || 0) / 100;

  result = base;
  result = Math.floor(result * (1 + leader));
  result = Math.floor(result * (1 + supportMemory));
  result = Math.floor(result * (1 + sot + support));
  result = Math.floor(result * (1 + links));
  result = Math.floor(result * (1 + active + eActive));
  result = Math.ceil(result * (kiMulti));
  result = Math.floor(result * (1 + nonSot));
  result = Math.round(result * (saMulti + saEffect + stacking + saBoost*(0.05)));
  result = Math.floor(result * (1 + domain));

  document.getElementById("atkResult").textContent = `Result: ${result.toLocaleString()}`;
}

function calculateDEF() {
  const base = parceFloat(document.getElementById("defStat").value) || 0;
  const leader = (parceFloat(document.getElementById("defLeader").value) || 0) / 100;
  const supportmemory = (parceFloat(document.getElementById("defSupportMemory").value) || 0) / 100;
  const sot = (parceFloat(document.getElementById("defSoT").value) || 0) / 100;
  const nonsot = (parceFloat(document.getElementById("defNonSoT").value) || 0) / 100;
  const support = (parceFloat(document.getElementById("defSupport").value) || 0) / 100;
  const active = (parceFloat(document.getElementById("defActive").value) || 0) / 100;
  const eactive = (parceFloat(document.getElementById("defEActive").value) || 0 ) /100;
  const domain = (parceFloat(document.getElementById("defdomain").value) || 0) / 100;
  const links = (parseFloat(document.getElementById("defLinks").value) || 0) / 100;
  const SAEffect = (parceFloat(document.getElementById("defSAEffect").value) || 0) / 100;
  const stacking = (parceFloat(document.getElementById("defStacking").value) || 0) / 100;

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

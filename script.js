function calculateATK() {
  const base = parseInt(document.getElementById("ATKStat").value) || 0;
  const leader = (parseInt(document.getElementById("ATKLeader").value) || 0) / 100;
  const supportmemory = (parseINT(document.getElementById("ATKSupportMemory").value) || 0)
  const links = (parseInt(document.getElementById("ATKLinks").value) || 0) / 100;

  const result = Math.floor(base * (1 + leader + links));
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
  const links = (parseInt(document.getElementById("defLinks").value) || 0) / 100;
  const SAEffect = (parseInt(document.getElementById("defSAEffect").value) || 0) / 100;
  const stacking = (parseInt(document.getElementById("defStacking").value) || 0) / 100;

  let result = base;
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

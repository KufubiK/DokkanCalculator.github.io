// --- 1. THEME MEMORY LOGIC ---
// --- UPDATED THEME LOGIC ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Sync the button icon with the theme already set by the head script
    const currentTheme = root.getAttribute('data-theme');
    if (themeToggle) {
        themeToggle.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Enable transitions ONLY for this toggle event
            document.body.classList.add('theme-transition');
            
            const isDark = root.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('dokkan-theme', newTheme);
            themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';

            // Remove the class after the transition finishes (300ms)
            // to keep the initial page loads clean
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 350);
        });
    }
}

// --- 2. TABLE INTERACTION (ROW ONLY) ---
function initTableHighlight() {
    const table = document.querySelector('.sa-multiplier-table table');
    if (!table) return;

    const rows = table.querySelectorAll('tr');
    const cells = table.querySelectorAll('td');
    let selectedCell = null;

    cells.forEach(cell => {
        // Hover: Row only
        cell.addEventListener('mouseover', function() {
            if (!selectedCell) this.parentElement.classList.add('row-highlight');
        });

        cell.addEventListener('mouseout', function() {
            if (!selectedCell) this.parentElement.classList.remove('row-highlight');
        });

        // Click: Select cell and lock Row
        cell.addEventListener('click', function(e) {
            const row = this.parentElement;

            // Deselect logic
            if (selectedCell === this) {
                this.classList.remove('selected');
                row.classList.remove('row-highlight');
                selectedCell = null;
                return;
            }

            // Clear previous selections
            cells.forEach(c => c.classList.remove('selected'));
            rows.forEach(r => r.classList.remove('row-highlight'));

            // Set new selection
            this.classList.add('selected');
            row.classList.add('row-highlight');
            selectedCell = this;
        });
    });
}

// --- 3. CALCULATIONS ---
function calculateATK() {
    const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;

    let result = getVal("atkStat");
    result = Math.floor(result * (1 + getVal("atkLeader") / 100));
    result = Math.floor(result * (1 + getVal("atkSupportMemory") / 100));
    result = Math.floor(result * (1 + (getVal("atkSoT") + getVal("SoTatkSupport")) / 100));
    result = Math.floor(result * (1 + getVal("atkLinks") / 100));
    result = Math.floor(result * (1 + (getVal("atkActive")) / 100));
    result = Math.ceil(result * (getVal("atkKiMulti") / 100));
    result = Math.floor(result * (1 + (getVal("atkNonSoT") + getVal("NSoTatkSupport")) / 100));
    
    // SA Multiplier grouping
    const saSum = (getVal("atkSAMulti") + getVal("atkSAEffect") + getVal("atkStacking")) / 100 + (getVal("atkSABoost") * 0.05);
    result = Math.round(result * saSum);
    result = Math.floor(result * (1 + getVal("atkdomain") / 100));

    document.getElementById("atkResult").textContent = `Result: ${result.toLocaleString()}`;
}

function calculateDEF() {
    const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;

    let result = getVal("defStat");
    result = Math.floor(result * (1 + getVal("defLeader") / 100));
    result = Math.floor(result * (1 + getVal("defSupportMemory") / 100));
    result = Math.floor(result * (1 + (getVal("defSoT") + getVal("SoTdefSupport")) / 100));
    result = Math.floor(result * (1 + getVal("defLinks") / 100));
    result = Math.floor(result * (1 + (getVal("defActive") + getVal("defEActive")) / 100));
    result = Math.floor(result * (1 + (getVal("defNonSoT") + getVal("NSoTdefSupport")) / 100));
    result = Math.floor(result * (1 + getVal("defSAEffect") / 100));
    result = Math.floor(result * (1 + getVal("defdomain") / 100));
    result = Math.floor(result * (1 + getVal("defStacking") / 100));

    document.getElementById("defResult").textContent = `Result: ${result.toLocaleString()}`;
}

function calculateDMG() {
    const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;
    const getSelect = (id) => document.getElementById(id).value;

    // 1. Get Dropdown States
    const isGuarding = getSelect("guardSelect") === "yes";
    const isCrit = getSelect("critSelect") === "yes";
    const isAoE = getSelect("aoeSelect") === "yes";
    const typeStatus = getSelect("typeSelect");
    const classStatus = getSelect("classSelect");

    // 2. Multiplier Logic
    const currentRaiseAtk = isAoE ? 0 : getVal("BossRaiseAtk");
    const hpValue = (typeStatus === "advantage") ? getVal("HiddenPotential") : 0;

    let typeMod = 1.0;
    let guardMod = 1.0;

    if (isGuarding) {
        typeMod = 0.8;
        guardMod = 0.5;
    } else {
        const typeMatrix = {
            'advantage': { 'opposite': 1.5, 'same': 1.25 },
            'neutral': { 'opposite': 1.15, 'same': 1.0 },
            'disadvantage': { 'opposite': 1.0, 'same': 0.9 }
        };
        typeMod = typeMatrix[typeStatus][classStatus];
        guardMod = (typeStatus === "advantage") ? 0.5 : 1.0;
    }

    // 3. Calculation Flow
    // Boss Base * Other ATK %
    let result = Math.floor(getVal("BossNormal") * (1 + (getVal("BossOtherAtk") / 100)));
    
    // Apply SA Multiplier (e.g., 300% SA + 50% Raise = 3.5 multiplier)
    result = Math.floor(result * ((getVal("BossSAMultiplier") + currentRaiseAtk) / 100));

    if (isCrit) result = Math.floor(result * 1.5);

    // Apply Type/HP Modifier
    result = Math.floor(result * (typeMod - (0.01 * hpValue)));

    // Damage Reduction
    const drFactor = 1 - (getVal("dmgReduction") / 100);
    let minresult = Math.floor(result * drFactor);
    let maxresult = Math.floor(minresult * 1.03);

    // Defense Subtraction
    const defIgnoreFactor = isCrit ? (1 - (getVal("defIgnore") / 100)) : 1;
    const effectiveDef = getVal("EdefStat") * defIgnoreFactor;

    minresult = Math.max(0, Math.floor((minresult - effectiveDef) * guardMod));
    maxresult = Math.max(0, Math.floor((maxresult - effectiveDef) * guardMod));

    document.getElementById("dmgResult").textContent = `Result: ${minresult.toLocaleString()} - ${maxresult.toLocaleString()}`;
}

// Add this to handle the "grey out" visual
function toggleDefIgnore() {
    const defIgnoreInput = document.getElementById('defIgnore');
    const isCrit = document.getElementById('critSelect').value === 'yes';
    defIgnoreInput.disabled = !isCrit;
    if (!isCrit) defIgnoreInput.value = "";
}

// --- 4. TABS & INITIALIZATION ---
function openTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    contents.forEach(c => c.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTableHighlight();
});

function toggleDefIgnore() {
    const isCrit = document.getElementById('critSelect').value === 'yes';
    const defIgnoreInput = document.getElementById('defIgnore');
    
    defIgnoreInput.disabled = !isCrit;
    
    if (!isCrit) {
        defIgnoreInput.value = ""; 
        defIgnoreInput.style.backgroundColor = ""; // Clears the inline style so CSS takes over
    }
}

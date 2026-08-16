// ---------- constants ----------
const card = document.getElementById('sample-data-file-card');
const sampleDataBtn = document.getElementById('btn-load-sample');
let cleanedData = null;

/* ----------------------
     Data Definitions 
---------------------- */
const REGION_MAP = {
    amer: "AMER",
    emea: "EMEA",
    apj: "APJ",
    apac: "APJ"
}

const SEGMENT_MAP = {
    enterprise: "Enterprise",
    publicsector: "Public Sector",
    pubsector: "Public Sector",
    smb: "SMB"
};

const INDUSTRY_MAP = {
    financialservices: "Financial Services",
    healthcare: "Healthcare",
    retail: "Retail",
    manufacturing: "Manufacturing",
    technology: "Technology"
};

const INDUSTRY_BENCHMARK = {
    "Financial Services": 90000,
    "Healthcare": 45000,
    "Retail": 40000,
    "Manufacturing": 50000,
    "Technology": 45000
};

const PRODUCT_MAP = {
    platforma: "Platform A",
    platformb: "Platform B",
    platformc: "Platform C"
};

const STAGE_MAP = {
    nominated: "Nominated",
    inreview: "In Review",
    underdeployment: "Under Deployment",
    live: "Live"
};

const OUTCOME_MAP = {
    ontrack: "On Track",
    needsattention: "Needs Attention",
    blocked: "Blocked",
    live: "Live",
    lost: "Lost"
};

// *--------------------------------- 
//              EVENTS  
// --------------------------------- * //
document.getElementById('btn-walkthrough').addEventListener('click', function () {
    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('data-cleanup').style.display = 'block';
    document.getElementById('data-cleanup').scrollIntoView({ behavior: 'smooth', block: 'start' });

});

document.getElementById('btn-skip').addEventListener('click', function () {
    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('dashboard-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('btn-view-dashboard').addEventListener('click', function () {
    document.getElementById('data-cleanup').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('dashboard-view').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const data = computeDashboard(cleanedData);
    renderDashboard(data);
});

// load the sample data file
sampleDataBtn.addEventListener('click', function () {

    // if its already loaded, don't do anything just return
    if (document.getElementById('sample-data-file-card')) return;

    // create the card and give it css properties 
    const card = document.createElement('div');
    card.className = 'sample-data-file-card';
    card.id = 'sample-data-file-card';
    card.draggable = true;
    card.innerHTML = `
    <span class="fc-icon">&#128196;</span>
    nominations_export.csv
    <span class="fc-hint"><em>drag or click to drop in</em></span>
  `;

    sampleDataBtn.insertAdjacentElement('afterend', card);
    sampleDataBtn.textContent = "sample data loaded"

    document.getElementById('drop-zone').style.display = 'block';

    // now that the file "card" is loaded, make it draggable
    card.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'sample');
    });

    card.addEventListener('click', handleFileDropped);
});

// setup the 3 listeners to be able to drag and move the sample data 
const dz = document.getElementById('drop-zone');

dz.addEventListener('dragover', function (e) {
    e.preventDefault();
    dz.classList.add('dragover');
});

dz.addEventListener('dragleave', function () {
    dz.classList.remove('dragover');
});

dz.addEventListener('drop', function (e) {
    e.preventDefault();
    dz.classList.remove('dragover');
    console.log('dropped!');
    handleFileDropped();
});

document.getElementById('btn-skip').addEventListener('click', function () {
    const rows = parseCSV(RAW_CSV);
    cleanedData = cleanRows(rows);

    const data = computeDashboard(cleanedData);
    renderDashboard(data);

    document.querySelector('.lab-choice').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('dashboard-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('btn-reset').addEventListener('click', function () {
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('dashboard-content').innerHTML = '';
    document.getElementById('btn-reset').style.display = 'none';

    document.getElementById('data-cleanup').style.display = 'none';
    document.getElementById('cleanup-steps').style.display = 'none';
    document.getElementById('raw-preview').textContent = '';
    document.getElementById('clean-log').innerHTML = '';
    document.getElementById('json-box').textContent = '';
    document.getElementById('json-heading').style.display = 'none';
    document.getElementById('json-box').style.display = 'none';
    document.getElementById('btn-view-dashboard').style.display = 'none';

    const card = document.getElementById('sample-data-file-card');
    if (card) card.remove();

    document.getElementById('drop-zone').style.display = 'none';
    document.getElementById('btn-load-sample').style.display = 'inline-block';

    document.querySelector('.lab-choice').style.display = 'block';
    document.querySelector('.lab-choice').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'region-filter') {
        document.getElementById('industry-table-wrap').innerHTML = renderIndustryTable(cleanedData, e.target.value);
    }
});

// handle the file dropping and adding the sample data to appear 
function handleFileDropped() {
    // hide all the elements and display to start the cleanup steps 
    document.getElementById('drop-zone').style.display = 'none';
    document.getElementById('btn-load-sample').style.display = 'none';
    document.getElementById('sample-data-file-card').style.display = 'none';
    document.getElementById('cleanup-steps').style.display = 'block';

    // format the raw data for visuals 
    const rawData = window.sampleData;
    const lines = rawData.trim().split('\n');
    const preview = lines.slice(0, 8).join('\n');
    const remaining = lines.length - 8;
    document.getElementById('raw-preview').textContent = preview + '\n… and ' + remaining + ' more rows';

    // parse the CSV data, set the data so you can start to 'clean' it
    const rows = parseCSV(RAW_CSV);
    //const cleaned = cleanRows(rows);
    cleanedData = cleanRows(rows);

    // set a timeout so the user has time to digest the UI updates
    // first load the raw data then pause then load cleanup logs
    setTimeout(function () {
        // where the cleanup logs get built and rendered to the UI
        const log = buildCleanLog(rows);
        renderCleanLog(log);

        // wait till the clean logs have finished before dispalying the normalized data 

        const logAnimationTime = log.length * 300 + 500;
        setTimeout(function () {
            document.getElementById('json-heading').style.display = 'block';
            document.getElementById('json-box').style.display = 'block';
            renderJSON(cleanedData);
            document.getElementById('btn-view-dashboard').style.display = 'inline-block';
        }, logAnimationTime);
    }, 1000);
}

/*-------------------------------------------------------
         All functions below support handling dropping  
         the sample data file and cleaning it 
 ------------------------------------------------------- */
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(function (line) {
        const cells = line.split(',');
        const row = {};
        headers.forEach(function (header, i) {
            row[header.trim()] = (cells[i] || '').trim();
        });
        return row;
    });
}

// remove all spaces, hyphens, etc to focus so all the data matches plain lowercase 
function cleanKey(raw) {
    return raw.trim().toLowerCase().replace(/[^a-z]/g, '');
}

function normalize(raw, map) {
    const key = cleanKey(raw);
    return map[key] || raw.trim();
}

// make all the dates match
function normalizeDate(raw) {
    const s = raw.trim();

    // format: 2026-06-07
    let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m) return new Date(m[1], m[2] - 1, m[3]);

    // format: 6/6/2026 or 6/6/26
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (m) {
        let year = parseInt(m[3], 10);
        if (year < 100) year += 2000;
        return new Date(year, m[1] - 1, m[2]);
    }

    // format: 13-May-2026
    m = s.match(/^(\d{1,2})-([A-Za-z]{3,})-(\d{4})$/);
    if (m) return new Date(`${m[2]} ${m[1]}, ${m[3]}`);

    return null; // nothing matched
} // end of normalizeData function  

function toISO(date) {
    if (!date) return null;
    return date.toISOString().slice(0, 10);
}

// take messy data and return array of 'clean' objects 
function cleanRows(rawRows) {
    return rawRows.map(function (row) {
        return {
            id: row["Nomination ID"],
            region: normalize(row["Region"], REGION_MAP),
            segment: normalize(row["Segment"], SEGMENT_MAP),
            industry: normalize(row["Industry"], INDUSTRY_MAP),
            product: normalize(row["Product"], PRODUCT_MAP),
            stage: normalize(row["Stage"], STAGE_MAP),
            outcome: normalize(row["Outcome"], OUTCOME_MAP),
            value: parseInt(row["Value"], 10) || 0,
            owner: row["Owner"].trim() ? row["Owner"].trim() : "Unassigned",
            dateNominated: toISO(normalizeDate(row["Date Nominated"])),
            reason: row["Reason"].trim()
        };
    });
} // end of cleanRows function 

// create the cleaning logs that will be used to display in the UI 
function buildCleanLog(rawRows) {
    let counts = { region: 0, segment: 0, industry: 0, product: 0, stage: 0, outcome: 0, owner: 0, date: 0 };
    let examples = {};

    rawRows.forEach(function (row) {
        const cleanRegion = normalize(row["Region"], REGION_MAP);
        if (cleanRegion !== row["Region"].trim()) {
            counts.region++;
            if (!examples.region) examples.region = `"${row["Region"].trim()}" → "${cleanRegion}"`;
        }
        const cleanSegment = normalize(row["Segment"], SEGMENT_MAP);
        if (cleanSegment !== row["Segment"].trim()) {
            counts.segment++;
            if (!examples.segment) examples.segment = `"${row["Segment"].trim()}" → "${cleanSegment}"`;
        }
        const cleanIndustry = normalize(row["Industry"], INDUSTRY_MAP);
        if (cleanIndustry !== row["Industry"].trim()) {
            counts.industry++;
            if (!examples.industry) examples.industry = `"${row["Industry"].trim()}" → "${cleanIndustry}"`;
        }
        const cleanProduct = normalize(row["Product"], PRODUCT_MAP);
        if (cleanProduct !== row["Product"].trim()) {
            counts.product++;
            if (!examples.product) examples.product = `"${row["Product"].trim()}" → "${cleanProduct}"`;
        }
        const cleanStage = normalize(row["Stage"], STAGE_MAP);
        if (cleanStage !== row["Stage"].trim()) {
            counts.stage++;
            if (!examples.stage) examples.stage = `"${row["Stage"].trim()}" → "${cleanStage}"`;
        }
        const cleanOutcome = normalize(row["Outcome"], OUTCOME_MAP);
        if (cleanOutcome !== row["Outcome"].trim()) {
            counts.outcome++;
            if (!examples.outcome) examples.outcome = `"${row["Outcome"].trim()}" → "${cleanOutcome}"`;
        }
        if (!row["Owner"].trim()) {
            counts.owner++;
            examples.owner = `→ "Unassigned"`;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(row["Date Nominated"].trim())) {
            counts.date++;
            if (!examples.date) examples.date = `"${row["Date Nominated"].trim()}" → "${toISO(normalizeDate(row["Date Nominated"]))}"`;
        }
    });

    return [
        { label: "Standardized region labels", count: counts.region, example: examples.region },
        { label: "Fixed segment casing", count: counts.segment, example: examples.segment },
        { label: "Normalized industry names", count: counts.industry, example: examples.industry },
        { label: "Standardized product names", count: counts.product, example: examples.product },
        { label: "Fixed stage casing", count: counts.stage, example: examples.stage },
        { label: "Normalized outcome values", count: counts.outcome, example: examples.outcome },
        { label: "Flagged missing owners", count: counts.owner, example: examples.owner },
        { label: "Reformatted dates to ISO", count: counts.date, example: examples.date }
    ].filter(function (item) { return item.count > 0; });
}

// update UI with the data cleaning steps 
function renderCleanLog(log) {
    const ul = document.getElementById('clean-log');
    ul.innerHTML = '';
    log.forEach(function (item, i) {
        const li = document.createElement('li');
        li.style.animationDelay = (i * 0.3) + 's';
        li.innerHTML = '<span class="ok">&#10003;</span>' + item.label + ' — ' + item.count + ' rows' +
            '<span class="example">(' + item.example + ')</span>';
        ul.appendChild(li);
    });

    document.getElementById('clean-log').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// render the 'normalized' data to display in the UI
function renderJSON(cleaned) {
    const preview = cleaned.slice(0, 3);
    let text = JSON.stringify(preview, null, 2);
    text += '\n\n… and ' + (cleaned.length - 3) + ' more normalized records';
    document.getElementById('json-box').textContent = text;

    document.getElementById('json-box').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/*--------------------------------------------------
        All functions below support handling   
        creating the dashboard 
 ------------------------------------------------ */
function computeDashboard(rows) {
    const total = rows.length;
    const totalValue = rows.reduce(function (sum, r) { return sum + r.value; }, 0);
    const riskValue = rows
        .filter(function (r) { return r.outcome === "Blocked" || r.outcome === "Needs Attention"; })
        .reduce(function (sum, r) { return sum + r.value; }, 0);
    const lostValue = rows
        .filter(function (r) { return r.outcome === "Lost"; })
        .reduce(function (sum, r) { return sum + r.value; }, 0);
    const avgDealSize = total ? Math.round(totalValue / total) : 0;

    const segmentCombos = new Set(rows.map(function (r) { return r.region + '|' + r.segment; }));
    const activeSegments = segmentCombos.size;

    const stages = ["Nominated", "In Review", "Under Deployment", "Live"];
    const stageTargets = [0.70, 0.65, 0.75];

    const funnel = stages.map(function (stage, i) {
        const reached = rows.filter(function (r) { return stages.indexOf(r.stage) >= i; });
        return {
            stage: stage,
            count: reached.length,
            value: reached.reduce(function (s, r) { return s + r.value; }, 0)
        };
    });

    const riskList = rows
        .filter(function (r) { return r.outcome === "Blocked" || r.outcome === "Needs Attention"; })
        .sort(function (a, b) { return b.value - a.value; })
        .slice(0, 6);

    funnel.forEach(function (f, i) {
        f.valueRetainedPct = Math.round((f.value / funnel[0].value) * 100);
        if (i > 0) {
            const actualConversion = funnel[i - 1].count ? funnel[i].count / funnel[i - 1].count : 0;
            const gapPts = Math.round((actualConversion - stageTargets[i - 1]) * 100);
            f.gapPts = gapPts;
            f.belowTarget = gapPts < -5;
        } else {
            f.gapPts = null;
            f.belowTarget = false;
        }
    });


    const regionMap = {};
    rows.forEach(function (r) {
        if (!regionMap[r.region]) regionMap[r.region] = { region: r.region, value: 0, live: 0, count: 0 };
        regionMap[r.region].value += r.value;
        regionMap[r.region].count++;
        if (r.outcome === "Live") regionMap[r.region].live++;
    });
    const byRegion = Object.values(regionMap).map(function (x) {
        return { region: x.region, value: x.value, liveRate: Math.round(x.live / x.count * 100) };
    }).sort(function (a, b) { return b.value - a.value; });


    const productMap = {};
    rows.forEach(function (r) {
        if (!productMap[r.product]) productMap[r.product] = { product: r.product, value: 0, live: 0, count: 0 };
        productMap[r.product].value += r.value;
        productMap[r.product].count++;
        if (r.outcome === "Live") productMap[r.product].live++;
    });
    const byProduct = Object.values(productMap).map(function (x) {
        return { product: x.product, value: x.value, liveRate: Math.round(x.live / x.count * 100) };
    }).sort(function (a, b) { return b.value - a.value; });

    return { total, totalValue, riskValue, lostValue, avgDealSize, activeSegments, funnel, riskList, byRegion, byProduct };
}

function renderDashboard(data) {
    const today = new Date();
    const dateStr = String(today.getMonth() + 1).padStart(2, '0') + '.' + String(today.getDate()).padStart(2, '0') + '.' + today.getFullYear();

    document.getElementById('dashboard-content').innerHTML = `
    <div style="animation: dashFadeIn 0.5s ease forwards">

      <div class="dash-header">
        <div class="dash-title">Program pulse</div>
        <div class="dash-date">As of ${dateStr}</div>
      </div>

      <div class="dash-metrics">
        <div>
          <div class="metric-label">Pipeline value</div>
          <div class="metric-hero">$${(data.totalValue / 1e6).toFixed(2)}m</div>
        </div>
        <div class="secondary-grid">
          <div>
            <div class="metric-label">Active segments</div>
            <div class="metric-secondary">${data.activeSegments} of 9</div>
          </div>
          <div>
            <div class="metric-label">Avg deal size</div>
            <div class="metric-secondary">$${Math.round(data.avgDealSize / 1000)}k</div>
          </div>
          <div>
            <div class="metric-label">At risk</div>
            <div class="metric-secondary">$${Math.round(data.riskValue / 1000)}k</div>
          </div>
          <div>
            <div class="metric-label">Lost</div>
            <div class="metric-secondary">$${Math.round(data.lostValue / 1000)}k</div>
          </div>
        </div>
      </div>

      ${renderFunnel(data.funnel)} 

     <div class="dash-two-col">
        <div>${renderRiskList(data.riskList)}</div>
        <div>
            ${renderByProduct(data.byProduct)}
            ${renderByRegion(data.byRegion)}
        </div>
        </div>

    </div>

    ${renderIndustrySection()}
    
  `;

    document.getElementById('btn-reset').style.display = 'inline-block';
}

function renderFunnel(funnel) {
    let rows = funnel.map(function (f) {
        const gapText = f.gapPts === null ? '' :
            (f.gapPts >= 0 ? '+' + f.gapPts : f.gapPts) + 'pts vs target';
        const gapClass = f.belowTarget ? 'gap-below' : 'gap-ok';
        return `
    <tr>
        <td>${f.stage}</td>
        <td class="muted">${f.count}</td>
        <td>$${(f.value / 1e6).toFixed(2)}m</td>
        <td class="muted">${f.valueRetainedPct}%</td>
        <td class="${gapClass}">${gapText}</td>
      </tr> `;
    }).join('');

    return `
    <div class="stage-metrics">
      <div class="dash-section-label">Pipeline by stage</div>
        <table class="dash-table">
         <tr>
            <th>Stage</th>
            <th>Count</th>
            <th>Value</th>
            <th>Retained</th>
            <th>Vs target</th>
         </tr>
         ${rows}
        </table>
    </div > `;
}


function renderRiskList(riskList) {
    let cards = riskList.map(function (r) {
        const colorClass = r.outcome === "Blocked" ? "risk-blocked" : "risk-attention";
        return `
      <div class="risk-row">
        <div>
          <div class="risk-name">${r.region} · ${r.segment} · ${r.id}</div>
          <div class="risk-reason">${r.reason}</div>
        </div>
        <div class="risk-side">
          <div class="${colorClass}">$${Math.round(r.value / 1000)}k</div>
          <div class="${colorClass} risk-tag">${r.outcome}</div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="stage-metrics">
      <div class="dash-section-label">Blocked and needs attention</div>
      ${cards}
    </div>`;
}

function renderByRegion(byRegion) {
    let rows = byRegion.map(function (r) {
        return `<tr><td>${r.region}</td><td>$${Math.round(r.value / 1000)}k</td><td>${r.liveRate}%</td></tr>`;
    }).join('');
    return `
    <div class="stage-metrics">
      <div class="dash-section-label">By region</div>
      <table class="dash-table">
        <tr><th>Region</th><th>Value</th><th>Live rate</th></tr>
        ${rows}
      </table>
    </div>`;
}

function renderByProduct(byProduct) {
    let rows = byProduct.map(function (r) {
        return `<tr><td>${r.product}</td><td>$${Math.round(r.value / 1000)}k</td><td>${r.liveRate}%</td></tr>`;
    }).join('');
    return `
    <div class="stage-metrics">
      <div class="dash-section-label">By product</div>
      <table class="dash-table">
        <tr><th>Product</th><th>Value</th><th>Live rate</th></tr>
        ${rows}
      </table>
    </div>`;
}

function computeIndustryTable(rows, region) {
    const filtered = region === 'All' ? rows : rows.filter(function (r) { return r.region === region; });
    const map = {};
    filtered.forEach(function (r) {
        if (!map[r.industry]) map[r.industry] = { industry: r.industry, count: 0, value: 0 };
        map[r.industry].count++;
        map[r.industry].value += r.value;
    });
    return Object.values(map).map(function (x) {
        const avg = Math.round(x.value / x.count);
        const benchmark = INDUSTRY_BENCHMARK[x.industry];
        return { industry: x.industry, count: x.count, value: x.value, avg: avg, benchmark: benchmark, status: avg >= benchmark ? "Above" : "Below" };
    }).sort(function (a, b) { return b.value - a.value; });
}

function renderIndustryTable(rows, region) {
    const data = computeIndustryTable(rows, region);
    let trs = data.map(function (x) {
        const cls = x.status === "Above" ? "gap-ok" : "gap-below";
        return `<tr><td>${x.industry}</td><td class="muted">${x.count}</td><td>$${Math.round(x.value / 1000)}k</td><td>$${Math.round(x.avg / 1000)}k</td><td class="${cls}">${x.status} $${Math.round(x.benchmark / 1000)}k</td></tr>`;
    }).join('');
    return `<table class="dash-table"><tr><th>Industry</th><th>Noms</th><th>Value</th><th>Avg deal</th><th>Vs benchmark</th></tr>${trs}</table>`;
}

function renderIndustrySection() {
    return `
    <div class="stage-metrics">
      <div class="dash-section-header">
        <div class="dash-section-label">By industry</div>
        <select id="region-filter" class="region-select">
          <option value="All">All regions</option>
          <option value="AMER">AMER</option>
          <option value="EMEA">EMEA</option>
          <option value="APJ">APJ</option>
        </select>
      </div>
      <div id="industry-table-wrap">${renderIndustryTable(cleanedData, 'All')}</div>
    </div>`;
}
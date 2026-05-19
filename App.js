import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f9f6f1;
  }

  .wrap {
    min-height: 100vh;
    background: #f9f6f1;
    padding: 40px 20px 60px;
  }

  .card {
    max-width: 560px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 40px rgba(0,0,0,0.08);
  }

  .header {
    background: #1a1a2e;
    padding: 36px 36px 28px;
    position: relative;
    overflow: hidden;
  }

  .header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: rgba(212,175,130,0.12);
  }

  .header::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(212,175,130,0.08);
  }

  .tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #d4af82;
    margin-bottom: 10px;
  }

  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    line-height: 1.25;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }

  .header p {
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    font-weight: 300;
    position: relative;
    z-index: 1;
    line-height: 1.5;
  }

  .body {
    padding: 32px 36px 36px;
  }

  .section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #d4af82;
    margin-bottom: 16px;
    margin-top: 28px;
  }

  .section-label:first-child { margin-top: 0; }

  .field {
    margin-bottom: 16px;
  }

  .field label {
    display: block;
    font-size: 13px;
    color: #555;
    margin-bottom: 6px;
    font-weight: 400;
  }

  .field input, .field select {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #e8e4de;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #faf9f7;
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
  }

  .field input:focus, .field select:focus {
    border-color: #d4af82;
    background: #fff;
  }

  .prefix-wrap {
    position: relative;
  }

  .prefix-wrap span {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 15px;
  }

  .prefix-wrap input {
    padding-left: 28px;
  }

  .radio-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .radio-opt {
    flex: 1;
    min-width: 100px;
    cursor: pointer;
  }

  .radio-opt input { display: none; }

  .radio-opt span {
    display: block;
    padding: 10px 12px;
    border: 1.5px solid #e8e4de;
    border-radius: 10px;
    font-size: 13px;
    text-align: center;
    color: #666;
    transition: all 0.15s;
    background: #faf9f7;
  }

  .radio-opt input:checked + span {
    border-color: #1a1a2e;
    background: #1a1a2e;
    color: #fff;
  }

  .btn {
    width: 100%;
    padding: 15px;
    background: #1a1a2e;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 28px;
    letter-spacing: 0.3px;
    transition: background 0.2s, transform 0.1s;
  }

  .btn:hover { background: #2a2a4e; }
  .btn:active { transform: scale(0.99); }

  .results {
    margin-top: 28px;
    background: #1a1a2e;
    border-radius: 14px;
    padding: 24px;
    animation: fadeUp 0.35s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .results-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: #d4af82;
    margin-bottom: 20px;
  }

  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .result-row:last-child { border-bottom: none; }

  .result-label {
    font-size: 13px;
    color: rgba(255,255,255,0.55);
  }

  .result-val {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }

  .result-val.accent {
    color: #d4af82;
    font-size: 18px;
  }

  .result-val.big {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #fff;
  }

  .notice {
    margin-top: 20px;
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    line-height: 1.6;
    text-align: center;
  }

  .guarantee-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(212,175,130,0.15);
    border: 1px solid rgba(212,175,130,0.3);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    color: #d4af82;
    margin-top: 14px;
  }

  .reset {
    text-align: center;
    margin-top: 16px;
  }

  .reset button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.35);
    font-size: 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-decoration: underline;
  }

  .divider {
    height: 1px;
    background: #f0ece6;
    margin: 24px 0;
  }
`;

// 2025-26 CCS income thresholds
function getCCSPercentage(income) {
  if (income < 85279) return 90;
  if (income >= 535279) return 0;
  const excess = income - 85279;
  const steps = Math.floor(excess / 5000);
  return Math.max(0, 90 - steps);
}

// Activity hours → subsidised hours per fortnight (post Jan 2026: 3 Day Guarantee = 72hr min)
function getSubsidisedHours(activityHours) {
  // 3 Day Guarantee: all eligible families get at least 72 hrs/fortnight from Jan 2026
  if (activityHours === "0") return 72;
  if (activityHours === "1-8") return 72;
  if (activityHours === "9-16") return 72;
  if (activityHours === "17-48") return 72;
  if (activityHours === "48+") return 100;
  return 72;
}

export default function CCSCalculator() {
  const [form, setForm] = useState({
    income: "",
    careType: "centre",
    dailyFee: "",
    daysPerWeek: "3",
    hoursPerDay: "10",
    activityHours: "17-48",
    numChildren: "1",
  });

  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const income = parseFloat(form.income) || 0;
    const dailyFee = parseFloat(form.dailyFee) || 0;
    const daysPerWeek = parseFloat(form.daysPerWeek) || 0;
    const hoursPerDay = parseFloat(form.hoursPerDay) || 10;

    const hourlyRate = form.careType === "centre" ? 14.63 : 12.81;
    const ccsPercent = getCCSPercentage(income);
    const subsidisedHoursFortnightly = getSubsidisedHours(form.activityHours);

    // Hourly fee
    const hourlyFee = dailyFee / hoursPerDay;
    // CCS applies to lower of actual hourly fee or rate cap
    const effectiveHourlyRate = Math.min(hourlyFee, hourlyRate);
    const subsidyPerHour = (ccsPercent / 100) * effectiveHourlyRate;

    // Per fortnight
    const hoursPerFortnight = daysPerWeek * 2 * hoursPerDay;
    const eligibleHours = Math.min(hoursPerFortnight, subsidisedHoursFortnightly);
    const totalSubsidyFortnight = subsidyPerHour * eligibleHours;
    const totalFeeFortnight = dailyFee * daysPerWeek * 2;
    const outOfPocketFortnight = Math.max(0, totalFeeFortnight - totalSubsidyFortnight);
    const outOfPocketWeekly = outOfPocketFortnight / 2;
    const outOfPocketAnnual = outOfPocketWeekly * 52;

    const is3DayGuarantee = form.activityHours === "0" || form.activityHours === "1-8";

    setResult({
      ccsPercent,
      subsidisedHours: subsidisedHoursFortnightly,
      subsidyPerHour,
      totalSubsidyFortnight,
      outOfPocketWeekly,
      outOfPocketFortnight,
      outOfPocketAnnual,
      is3DayGuarantee,
      cappedAtRateLimit: hourlyFee > hourlyRate,
    });
  };

  const reset = () => setResult(null);

  return (
    <>
      <style>{styles}</style>
      <div className="wrap">
        <div className="card">
          <div className="header">
            <div className="tag">It's so Jo · Free Tool</div>
            <h1>Child Care Subsidy<br />Calculator</h1>
            <p>2025–26 rates · Includes the 3 Day Guarantee · Estimate your weekly out-of-pocket costs</p>
          </div>

          <div className="body">
            <div className="section-label">Your Family Income</div>

            <div className="field">
              <label>Combined household income (annual)</label>
              <div className="prefix-wrap">
                <span>$</span>
                <input
                  type="number"
                  placeholder="e.g. 120000"
                  value={form.income}
                  onChange={e => set("income", e.target.value)}
                />
              </div>
            </div>

            <div className="divider" />
            <div className="section-label">Your Care Details</div>

            <div className="field">
              <label>Type of care</label>
              <div className="radio-group">
                <label className="radio-opt">
                  <input type="radio" checked={form.careType === "centre"} onChange={() => set("careType", "centre")} />
                  <span>Centre-based (under 6)</span>
                </label>
                <label className="radio-opt">
                  <input type="radio" checked={form.careType === "oshc"} onChange={() => set("careType", "oshc")} />
                  <span>OSHC (school-aged)</span>
                </label>
              </div>
            </div>

            <div className="field">
              <label>Daily fee charged by your provider</label>
              <div className="prefix-wrap">
                <span>$</span>
                <input
                  type="number"
                  placeholder="e.g. 140"
                  value={form.dailyFee}
                  onChange={e => set("dailyFee", e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>Hours per day</label>
              <select value={form.hoursPerDay} onChange={e => set("hoursPerDay", e.target.value)}>
                <option value="8">8 hours</option>
                <option value="9">9 hours</option>
                <option value="10">10 hours (standard)</option>
                <option value="11">11 hours</option>
                <option value="12">12 hours</option>
              </select>
            </div>

            <div className="field">
              <label>Days per week in care</label>
              <div className="radio-group">
                {["1","2","3","4","5"].map(d => (
                  <label className="radio-opt" key={d}>
                    <input type="radio" checked={form.daysPerWeek === d} onChange={() => set("daysPerWeek", d)} />
                    <span>{d} {d === "1" ? "day" : "days"}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="divider" />
            <div className="section-label">Your Activity Level</div>

            <div className="field">
              <label>Combined activity hours per fortnight (work, study, volunteering)</label>
              <select value={form.activityHours} onChange={e => set("activityHours", e.target.value)}>
                <option value="0">0 hours (not working/studying)</option>
                <option value="1-8">1–8 hours</option>
                <option value="9-16">9–16 hours</option>
                <option value="17-48">17–48 hours</option>
                <option value="48+">More than 48 hours</option>
              </select>
            </div>

            <button className="btn" onClick={calculate}>Calculate my subsidy →</button>

            {result && (
              <div className="results">
                <div className="results-title">Your Estimated Entitlement</div>

                <div className="result-row">
                  <span className="result-label">CCS percentage</span>
                  <span className="result-val accent">{result.ccsPercent}%</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Subsidised hours per fortnight</span>
                  <span className="result-val">{result.subsidisedHours} hrs</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Government subsidy per fortnight</span>
                  <span className="result-val">${result.totalSubsidyFortnight.toFixed(2)}</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Your gap fee per week</span>
                  <span className="result-val big">${result.outOfPocketWeekly.toFixed(2)}</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Your gap fee per fortnight</span>
                  <span className="result-val">${result.outOfPocketFortnight.toFixed(2)}</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Estimated annual out-of-pocket</span>
                  <span className="result-val">${Math.round(result.outOfPocketAnnual).toLocaleString()}</span>
                </div>

                {result.is3DayGuarantee && (
                  <div className="guarantee-badge">
                    ✦ 3 Day Guarantee applies — minimum 72 hrs/fortnight from Jan 2026
                  </div>
                )}

                {result.cappedAtRateLimit && (
                  <div className="guarantee-badge" style={{marginTop: 8}}>
                    ⚠ Your provider charges above the rate cap — gap fee includes uncapped amount
                  </div>
                )}

                <p className="notice">
                  This is an estimate only. Actual CCS entitlements are determined by Services Australia based on your individual circumstances. Rates are current for the 2025–26 financial year.
                </p>

                <div className="reset">
                  <button onClick={reset}>Reset calculator</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import fs from "node:fs/promises";

const baselinePath = process.env.PERF_BASELINE_PATH ?? "artifacts/performance/performance-baseline.json";
const budgetPath = process.env.PERF_BUDGET_PATH ?? "scripts/performance-budget.json";

const baseline = JSON.parse(await fs.readFile(baselinePath, "utf8"));
const budget = JSON.parse(await fs.readFile(budgetPath, "utf8"));

const failures = [];

function check(measurement, key, actual, limit) {
  if (typeof limit !== "number") return;
  if (typeof actual !== "number") {
    failures.push({
      route: measurement.route,
      profile: measurement.profile,
      metric: key,
      actual,
      limit,
      reason: "measurement missing",
    });
    return;
  }
  if (actual > limit) {
    failures.push({
      route: measurement.route,
      profile: measurement.profile,
      metric: key,
      actual,
      limit,
      overBy: actual - limit,
    });
  }
}

for (const measurement of baseline.measurements ?? []) {
  const routeBudget = budget.routes?.[measurement.route];
  if (!routeBudget) {
    failures.push({
      route: measurement.route,
      profile: measurement.profile,
      metric: "routeBudget",
      reason: "no frozen route budget",
    });
    continue;
  }

  check(measurement, "network.transferBytes", measurement.network?.transferBytes, routeBudget.maxTransferBytes);
  check(measurement, "network.resources", measurement.network?.resources, routeBudget.maxResources);
  check(measurement, "runtime.domElements", measurement.runtime?.domElements, routeBudget.maxDomElements);
  check(
    measurement,
    "runtime.jsEventListeners",
    measurement.runtime?.jsEventListeners,
    routeBudget.maxJsEventListeners
  );

  console.log(
    `CHECK ${measurement.profile.padEnd(7)} ${measurement.route.padEnd(24)} ` +
      `transfer=${measurement.network?.transferBytes}/${routeBudget.maxTransferBytes} ` +
      `resources=${measurement.network?.resources}/${routeBudget.maxResources} ` +
      `dom=${measurement.runtime?.domElements}/${routeBudget.maxDomElements} ` +
      `listeners=${measurement.runtime?.jsEventListeners}/${routeBudget.maxJsEventListeners}`
  );
}

if ((baseline.failures ?? []).length) {
  failures.push(
    ...(baseline.failures ?? []).map((failure) => ({
      ...failure,
      metric: "baselineRuntime",
      reason: "performance baseline contains a route/profile failure",
    }))
  );
}

if (failures.length) {
  console.error(`\nPerformance regression budget failed: ${failures.length} violation(s).`);
  for (const failure of failures) console.error(JSON.stringify(failure));
  process.exit(1);
}

console.log(`\nPerformance regression budget passed: ${(baseline.measurements ?? []).length} measurements.`);

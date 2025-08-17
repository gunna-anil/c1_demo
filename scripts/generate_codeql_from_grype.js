const fs = require('fs');

const GRYPE_JSON = 'grype-output.json';
const OUTPUT_QUERY = 'CheckVulnerablePkgs.ql';

// Read Grype JSON
const grypeData = JSON.parse(fs.readFileSync(GRYPE_JSON, 'utf8'));

// Extract vulnerable packages
const vulnerablePkgs = new Set();
for (const match of grypeData.matches || []) {
  if (match.artifact && match.artifact.name) {
    vulnerablePkgs.add(match.artifact.name);
  }
}

if (vulnerablePkgs.size === 0) {
  console.log('No vulnerable packages found in Grype output.');
  process.exit(0);
}

// Make predicate
const predicateLines = ['predicate isVulnerableFromGrype(string pkg) {'];
[...vulnerablePkgs].sort().forEach((pkg, idx) => {
  predicateLines.push((idx === 0 ? `  pkg = "${pkg}"` : `  or pkg = "${pkg}"`));
});
predicateLines.push('}');

// Build the QL query
const qlQuery = `/**
 * @name Check vulnerable packages from Grype in package.json
 * @description Auto-generated query from ${GRYPE_JSON}
 * @kind problem
 * @problem.severity warning
 */
import javascript

${predicateLines.join('\n')}

from PackageDependencies deps, string name, string version
where
  deps.getADependency(name, version) and
  isVulnerableFromGrype(name)
select
  name + "@" + version,
  "Package " + name + "@" + version + " is present in package.json and matches Grype vulnerability."
`;

fs.writeFileSync(OUTPUT_QUERY, qlQuery);
console.log(`Generated CodeQL query: ${OUTPUT_QUERY}`);

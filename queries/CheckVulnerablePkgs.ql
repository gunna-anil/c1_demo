/**
 * @id js/grype-vulnerable-pkgs
 * @title Check vulnerable packages from Grype in package.json
 * @description Auto-generated query from grype-output.json
 * @kind problem
 * @problem.severity warning
 */

import javascript

predicate isVulnerableFromGrype(string pkg) {
  pkg = "axios"
}

from PackageDependencies deps, string name, string version
where
  deps.getADependency(name, version) and
  isVulnerableFromGrype(name)
select
  name + "@" + version,
  "Package " + name + "@" + version + " is present in package.json and matches Grype vulnerability."

/**
 * @id js/vulnerable-pkgs
 * @title Detect Vulnerable Packages
 * @description Finds usage of vulnerable JavaScript packages based on Grype scan
 * @kind problem
 * @problem.severity error
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

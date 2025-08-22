/**
 * @name Check vulnerable packages from Grype in package.json
 * @description Auto-generated query from grype-output.json
 * @kind problem
 * @problem.severity warning
 */
import javascript

predicate searchForComponentPresence(string pkg) {
  pkg = "axios"
}

from PackageDependencies deps, string name, string version
where
  deps.getADependency(name, version) and
  searchForComponentPresence(name)
select
  name + "@" + version,
  "Package " + name + "@" + version + " is present in package.json."

const Path = require('path');

const TSLint = require('tslint');

const CONFIG_FILE_PATH = Path.join(__dirname, 'tslint-prettier.js');

const PICKING_RULE_NAMES = [
  'ordered-imports',
  'import-groups',
  'scoped-modules',
];

const {rules, rulesDirectory} = TSLint.Configuration.loadConfigurationFromPath(
  CONFIG_FILE_PATH,
);

module.exports = {
  rules: pick(rules, PICKING_RULE_NAMES),
  rulesDirectory,
};

function pick(ruleMap, names) {
  return names.reduce((pickedDict, name) => {
    let rule = ruleMap.get(name);

    let {ruleArguments, ruleSeverity} = rule;

    pickedDict[name] = {
      severity: ruleSeverity,
      options: ruleArguments,
    };

    return pickedDict;
  }, {});
}

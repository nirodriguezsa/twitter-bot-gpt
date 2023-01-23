import { devClient } from "../clients/dev.client";

export async function getAllRules() {
  const rules = await devClient.v2.streamRules();

  return rules.data;
}

export async function createStreamRules(rules: string[]) {
  const mappedRules = rules.map((rule) => {
    return { value: rule };
  });

  await devClient.v2.updateStreamRules({
    add: mappedRules,
  });
}

export async function deleteStreamRule(ruleIds: string[]) {
  await devClient.v2.updateStreamRules({
    delete: { ids: ruleIds },
  });
}

export async function deleteAllRules() {
  const rules = await devClient.v2.streamRules();

  await devClient.v2.updateStreamRules({
    delete: { ids: rules.data.map((rule) => rule.id) },
  });

  console.log("All rules were deleted");
}

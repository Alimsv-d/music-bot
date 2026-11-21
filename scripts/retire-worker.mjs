import { spawnSync } from "node:child_process";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "9aa06183feb2e346cfb156437f971f26";
const token = process.env.CLOUDFLARE_API_TOKEN || "";

if (token) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/music-bot`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    );
    const body = await response.text();
    console.log(`cloudflare api delete: ${response.status} ${body.slice(0, 300)}`);
  } catch (error) {
    console.log(`cloudflare api delete failed: ${error.message}`);
  }
} else {
  console.log("cloudflare api token not exposed to build; trying wrangler auth");
}

const result = spawnSync("npx", ["wrangler", "delete", "music-bot", "--force"], {
  stdio: "inherit",
  env: process.env,
});
console.log(`wrangler delete exit: ${result.status}`);

process.exit(0);

# Hosting request: verified search crawler access

Draft only. No hosting request has been sent.

## Message for Domains.co.za

> Please confirm that verified search crawlers can fetch `https://growthcred.co.za/` and the sitemap without receiving the WebShield or Imunify browser challenge. Please allow the verified crawlers used for search: Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot. OpenAI publishes IP ranges for OAI-SearchBot; please use its current published list as well as its user-agent. Please do not disable the site's protections for ordinary traffic.
>
> The site's current `robots.txt` explicitly allows these search crawlers and lists the sitemap. If a request is blocked, please provide the timestamp, source IP, user-agent, response status and the rule that blocked it so we can check the exact path.

Use **Claude-SearchBot** for Claude search. Anthropic distinguishes it from **ClaudeBot**, which is used for model training. The request should not enable or disable model-training crawls as a side effect of search access.

## Current site setting

`public/robots.txt` explicitly allows Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot. A robots rule cannot bypass an edge challenge or server firewall. Confirm access with the host and real crawl logs or a verified search-engine inspection.

## Official crawler references

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes OAI-SearchBot from the GPTBot training crawler and publishes search crawler IP ranges.
- [Anthropic crawler guidance](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) distinguishes Claude-SearchBot from ClaudeBot.
- [Perplexity crawler guide](https://docs.perplexity.ai/guides/bots).

# Admin deployed defect-delivery retest

Completed: 2026-09-18T10:10:00Z

Environment: deployed development · Google Chrome · 1792x976 by default; additional sizes only for responsive findings.

This report records terminal disposition for every Admin entry in the 276-finding delivery batch. PASS means the deployed behavior was verified. FAIL means the deployed defect remains reproducible. PASSED_OVER means the bounded attempt could not produce trustworthy proof, commonly because an exact fixture, actor, reversible mutation, or stable protected page was unavailable. DUPLICATE_COVERAGE points to another finding that exercised the same behavior.

## Summary

| Total | PASS | FAIL | DUPLICATE_COVERAGE | PASSED_OVER |
|---:|---:|---:|---:|---:|
| 8 | 0 | 0 | 0 | 8 |

Severity inventory: MEDIUM 8. Outcome reconciliation: PASSED_OVER 8.

## Finding dispositions

| ID | Severity | Outcome | Title | Disposition | Tested |
|---|---|---|---|---|---|
| ADM055-RATE-001 | MEDIUM | PASSED_OVER | Zero-duration window silently changes to one hour | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM053-DATE-001 | MEDIUM | PASSED_OVER | Grant dates drift between views | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM053-STATE-001 | MEDIUM | PASSED_OVER | Grant panels remain stale after decisions | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM054-AUD-001 | MEDIUM | PASSED_OVER | Direct moderation actions lack visible rationale capture | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM056-STALE-001 | MEDIUM | PASSED_OVER | Lock and unlock leave stale row state | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM056-HOLD-001 | MEDIUM | PASSED_OVER | No isolated subject-level legal hold path | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM056-DSAR-001 | MEDIUM | PASSED_OVER | No isolated export fulfillment path was available | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |
| ADM055-BACKFILL-001 | MEDIUM | PASSED_OVER | Broad Backfill action is exposed beside filters | ADMIN_ACTOR_UNAVAILABLE | 2026-09-18T07:24:11.466Z |

The machine-readable companion file preserves target URLs, evidence paths, notes, browser, viewport, and API provenance for each entry.

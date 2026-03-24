PostgreSQL migration and seed plan

Order:
1) Run backend/db/migrations/001_init.sql
2) Run backend/db/seeds/001_seed.sql

Tables:
- content_sections: admin section list and publish status
- content_section_payloads: json payload for section editors
- seo_settings: page based SEO values
- solutions: public solutions catalog
- references: public references catalog
- form_entries: contact, demo, application submissions

Notes:
- This stage is schema + seed only.
- No UI change required.
- Endpoint implementation comes in next phase.

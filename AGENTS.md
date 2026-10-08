# Project Architecture

- Keep the public portfolio as a single-page, section-based experience because the client wants one clear conversion path.
- Use semantic tokens from `src/styles.css` for all visual colors so the white/orange theme remains consistent.
- Use one-time observer reveals and the shared Radix accordion for portfolio motion so entrances stay independent of scroll speed and FAQ height animates in both directions.

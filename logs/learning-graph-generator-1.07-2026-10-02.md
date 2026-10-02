# Learning Graph Generator Session Log

- Skill: learning-graph-generator v1.07
- Date: 2026-10-02
- Course: Power Generation and Distribution (modeled on Dunwoody ECDM2260)
- Course description quality score: 97 (Step 1 skipped, score above 85)

## Programs used

- analyze-graph.py (quality-metrics.md)
- csv-to-json.py v1.04+ (CIS computed; 15 groups; taxonomy-names.json, color-config.json, metadata.json passed in)
- taxonomy-distribution.py
- validate-learning-graph.sh (valid)

## Results

- 358 concepts, 570 edges, 15 taxonomy categories, 2 foundational concepts, 1 connected component, 0 orphans
- Longest dependency chain: 22
- Dependencies were authored by label and mapped to IDs by script, with label and cycle checks
- Taxonomy IDs were assigned by contiguous label ranges following the concept list order

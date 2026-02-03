# Parallel Chapter Generation Guide

**Date:** 2026-02-03
**Purpose:** Instructions for using the Task tool to generate multiple chapters in parallel

---

## Overview

The Task tool enables launching specialized agents that can work on independent tasks simultaneously. For chapter content generation, this means multiple chapters can be generated in parallel rather than sequentially, dramatically improving productivity.

## Prerequisites

Before parallel generation:

1. **Chapter structure must exist** - Run `book-chapter-generator` skill first to create chapter directories with index.md files containing title, summary, and concepts list
2. **Course description must exist** - `/docs/course-description.md` should define the reading level
3. **Reference files must be accessible** - The chapter-content-generator skill references `reading-levels.md` and `content-element-types.md`

---

## Key Principle: Independent Tasks Can Run in Parallel

The Task tool documentation states:

> "When multiple independent pieces of information are requested and all commands are likely to succeed, run multiple tool calls in parallel for optimal performance."

Chapter generation is ideal for parallelization because:
- Each chapter is independent (no shared state)
- Each chapter has its own index.md file
- Generation doesn't depend on other chapters being complete

---

## How to Request Parallel Chapter Generation

### Method 1: List Multiple Chapters in One Request

Simply ask Claude to generate multiple chapters at once:

```
Generate content for chapters 6, 7, 8, 9, and 10 using the chapter-content-generator skill
```

or

```
Run /chapter-content-generator on chapters 6 through 10
```

### Method 2: Explicitly Request Parallel Execution

Be explicit about parallelization:

```
Generate chapters 6-10 in parallel using the Task tool with background agents
```

---

## Technical Implementation

When Claude receives a request for multiple chapters, it should:

### Step 1: Read Shared Context First

Before launching parallel agents, read files needed by all chapters:

- `/docs/course-description.md` - to determine reading level
- Skill reference files for content guidelines
- Delta mascot specification

### Step 2: Launch Multiple Task Tools in a Single Message

Claude should send **one message containing multiple Task tool invocations**. Each Task tool call launches an independent agent.

Example structure (conceptual):

```
[Message with multiple tool calls]
├── Task tool call 1: Generate Chapter 6
├── Task tool call 2: Generate Chapter 7
├── Task tool call 3: Generate Chapter 8
├── Task tool call 4: Generate Chapter 9
└── Task tool call 5: Generate Chapter 10
```

### Step 3: Each Agent Gets Full Context

Each Task tool invocation should include:

1. **The specific chapter path** - e.g., `/docs/chapters/06-derivative-concept/index.md`
2. **Reading level** - determined from course description
3. **Content guidelines** - from the skill references
4. **Delta mascot guidelines** - for consistent tone
5. **Clear instructions** - generate content, verify concepts, write to file

### Step 4: Use Background Execution for Long Tasks

For chapter generation (which takes significant time), use the `run_in_background` parameter:

```
run_in_background: true
```

This allows:
- All agents to work simultaneously
- Claude to check on progress via output files
- Results to be collected when ready

---

## Task Tool Parameters for Chapter Generation

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `subagent_type` | `general-purpose` | Needs full tool access for reading/writing |
| `description` | `"Generate Chapter N content"` | Short identifier (3-5 words) |
| `run_in_background` | `true` | Enable parallel execution |
| `prompt` | [Detailed chapter prompt] | Full context and instructions |

---

## Prompt Structure for Each Agent

Each agent's prompt should include:

### 1. Role and Task
```
You are generating educational content for an AP Calculus textbook chapter.
Your task: Generate comprehensive content for Chapter N: [Title]
```

### 2. File Location
```
Chapter file: /docs/chapters/NN-chapter-name/index.md
```

### 3. Reading Level
```
Reading level: Senior High (Grades 10-12)
- Sentence length: 15-22 words
- Technical vocabulary with definitions
- Balance of concrete and abstract
```

### 4. Content Requirements
```
Requirements:
- Cover all concepts from the "Concepts Covered" list
- Include non-text elements every 2-3 paragraphs
- Add MicroSim specifications in <details> blocks
- Include Delta mascot moments (1-2 per major section)
- End with Check Your Understanding quiz
```

### 5. Quality Checks
```
Verification:
- Confirm all concepts are covered
- Ensure word count is 3,500-4,500 words
- Verify MicroSim specifications are detailed enough for implementation
```

---

## Monitoring Background Agents

When agents run in the background, Claude can:

1. **Check output files** - Each agent writes to an output file
2. **Read progress** - Use `Read` tool or `tail` command on output files
3. **Wait for completion** - Use `TaskOutput` tool with `block: true`

---

## Example Session Flow

```
User: Generate chapters 6-10 in parallel

Claude:
1. Reads course-description.md (determines Senior High reading level)
2. Reads skill references
3. Reads Delta mascot specification
4. Sends single message with 5 Task tool calls (run_in_background: true)
5. Each agent starts working independently
6. Claude monitors progress or waits for completion
7. Claude reports results when all agents finish
```

---

## Benefits of Parallel Generation

| Metric | Sequential | Parallel |
|--------|------------|----------|
| Chapters per session | 1-2 | 5+ |
| Context utilization | Repeated reads | Shared context |
| User wait time | Linear (N × time) | Near-constant |
| Session efficiency | Low | High |

---

## Limitations and Considerations

1. **Context limits** - Each agent has independent context; shared reading must happen before launch
2. **Error handling** - If one agent fails, others continue; check all results
3. **Resource usage** - Multiple agents consume more compute; use judiciously
4. **Coordination** - Agents don't communicate; ensure tasks are truly independent

---

## Recommended Batch Sizes

| Reading Level | Chapters per Batch | Rationale |
|---------------|-------------------|-----------|
| Junior High | 4-6 | Simpler content, faster generation |
| Senior High | 4-5 | Balanced complexity |
| College | 3-4 | More detailed content |
| Graduate | 2-3 | Complex theoretical content |

---

## Troubleshooting

### Agent Produces Incomplete Content
- Verify the prompt includes all necessary context
- Check that the chapter index.md exists with proper structure

### Agent Can't Find Files
- Use absolute paths in prompts
- Verify file exists before launching agent

### Inconsistent Style Across Chapters
- Include style guidelines (Delta, reading level) in each agent's prompt
- Review and edit for consistency after generation

---

## Conclusion

The Task tool's ability to launch parallel background agents transforms chapter generation from a sequential bottleneck into a scalable process. The session that generated chapters 6-10 demonstrated this capability, producing 5 complete chapters (~21,100 words total) with 22 MicroSim specifications in a single productive session.

Key takeaway: **When tasks are independent, always consider parallel execution.**

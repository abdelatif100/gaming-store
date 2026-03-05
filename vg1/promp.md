Create a professional educational motion graphics video using Remotion (React + TypeScript) that explains the hierarchy of prompts in AI systems.

The video should look like a modern AI explainer used on YouTube tech channels.

Video Settings

Duration: 45–50 seconds
Resolution: 1920×1080
FPS: 30

Design style:

Modern tech UI

Clean motion graphics

Dark background with glowing UI elements

Color palette:

Background: #020617

System Prompt: #2563EB (blue)

Developer Prompt: #7C3AED (purple)

User Prompt: #10B981 (green)

Fonts:

Titles: Inter Bold

Text: Inter Regular

Code labels: JetBrains Mono

Scene 1 — Intro

Duration: 0s – 5s

Animation:

Background fades in

Tech grid slowly appears

Title scales in smoothly

Text:

Title

How AI Understands Instructions

Subtitle

The Hierarchy of Prompts

Small caption:

System → Developer → User

Add subtle:

floating particles

glowing horizontal lines

Scene 2 — Container Reveal

Duration: 5s – 7s

Animation:

Large rounded glass UI container

Appears with scale + opacity animation

Container divides into three horizontal segments

Each segment is empty at first.

Scene 3 — System Prompt

Duration: 7s – 22s

Animation:

Top segment slides down from above

Blue glow border appears

Label animates with typewriter effect

Title

SYSTEM PROMPT

Description (animated line by line)

The system prompt defines the core behavior of the AI.

It sets the rules, personality, and boundaries.

This instruction always has the highest priority.

Visual elements:

AI chip icon

subtle pulsing glow

highlight line sweeping across the box

Educational badge appearing in the corner:

Highest Priority
Scene 4 — Developer Prompt

Duration: 22s – 35s

Animation:

Middle segment slides from the left

Purple gradient appears

Small code brackets icon { }

Title

DEVELOPER PROMPT

Description

Developers add instructions that control
how the AI behaves inside an application.

These prompts define rules,
tools, and system features.

Add:

animated code lines

slight parallax effect

Educational tag:

Application Logic
Scene 5 — User Commands

Duration: 35s – 45s

Animation:

Bottom segment slides from the right

Green gradient glow

Title

USER COMMANDS

Description

Users send prompts to request tasks,
ask questions, or generate content.

These instructions come last
in the hierarchy.

Visuals:

animated chat bubbles

typing cursor effect

Tag:

User Interaction
Final Scene — Summary

Duration: 45s – 50s

Animation:

Camera slowly zooms out

All three boxes glow sequentially

Final text:

AI follows a hierarchy of instructions

System Prompt
↓
Developer Prompt
↓
User Prompt

Fade to black.

Animation Guidelines

Use Remotion utilities:

spring()

interpolate()

useCurrentFrame()

Transitions:

slide

fade

scale

glow pulse
# Contributing to English Learning Tetris

Thank you for your interest in improving this educational game!

## How to Contribute

### Reporting Bugs
- Check if the issue already exists in [Issues](https://github.com/youngstunners88/English-Tetris/issues)
- Include steps to reproduce, expected vs actual behavior
- Mention your browser/device and difficulty level

### Suggesting Features
- Open a [Discussion](https://github.com/youngstunners88/English-Tetris/discussions) first for major changes
- Focus on educational value: how does this help learners?

### Adding Words
The game uses word lists in `data/words.ts`. To add vocabulary:

1. Keep words appropriate for the difficulty level:
   - **Easy**: Simple, concrete nouns (cat, sun, book)
   - **Medium**: Abstract concepts, longer words (friend, travel, garden)
   - **Hard**: Advanced vocabulary, complex spellings (knowledge, courage, mystery)

2. Include clear, learner-friendly definitions
3. Test that word length fits the game board

### Code Changes
- Follow existing TypeScript patterns
- Use the established component structure (see `components/ui/` for examples)
- Ensure mobile compatibility for any UI changes
- Test with both desktop keyboard and mobile touch controls

## Development Setup

```bash
# Clone the repo
git clone https://github.com/youngstunners88/English-Tetris.git
cd English-Tetris

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

## Code of Conduct

- Be respectful and constructive
- Focus on educational impact
- Welcome learners of all levels

## Questions?

Open a [Discussion](https://github.com/youngstunners88/English-Tetris/discussions) — we're happy to help!

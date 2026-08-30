type Rule = {
  test: (input: string) => boolean;
  apply: (input: string) => string;
  label: string;
};

const rules: Rule[] = [
  {
    label: 'Clarify the role',
    test: (input) => !/\b(act as|you are|imagine you are|pretend you are|as a|as an)\b/i.test(input),
    apply: (input) => `Act as an expert assistant. ${input.trim()}`,
  },
  {
    label: 'Specify the output format',
    test: (input) => !/\b(format|output|respond in|structure|bullet|list|table|markdown|json|step by step)\b/i.test(input),
    apply: (input) => `${input.trim()} Provide your response in a clear, well-structured format.`,
  },
  {
    label: 'Add context',
    test: (input) => input.trim().split(/\s+/).length < 15,
    apply: (input) => `${input.trim()} Include relevant context and background so the response is accurate and tailored.`,
  },
  {
    label: 'Request step-by-step reasoning',
    test: (input) => !/\b(step by step|reasoning|explain why|walk me through|break it down)\b/i.test(input),
    apply: (input) => `${input.trim()} Walk through your reasoning step by step before giving the final answer.`,
  },
  {
    label: 'Ask for examples',
    test: (input) => !/\b(example|for instance|such as|e\.g\.|sample)\b/i.test(input),
    apply: (input) => `${input.trim()} Include concrete examples to illustrate your points.`,
  },
  {
    label: 'Set quality bar',
    test: (input) => !/\b(accurate|precise|concise|detailed|thorough|high quality|best practices)\b/i.test(input),
    apply: (input) => `${input.trim()} Be accurate, precise, and avoid unnecessary filler.`,
  },
  {
    label: 'Define edge cases',
    test: (input) => !/\b(edge case|if unsure|uncertain|ambigu|caveat|limitation)\b/i.test(input),
    apply: (input) => `${input.trim()} If anything is ambiguous, state your assumptions and note any caveats.`,
  },
];

export type OptimizationResult = {
  optimized: string;
  appliedRules: string[];
};

export function optimizePrompt(input: string): OptimizationResult {
  const trimmed = input.trim();
  if (!trimmed) return { optimized: '', appliedRules: [] };

  let current = trimmed;
  const appliedRules: string[] = [];

  for (const rule of rules) {
    if (rule.test(current)) {
      current = rule.apply(current);
      appliedRules.push(rule.label);
    }
  }

  const cleaned = current.replace(/\s+/g, ' ').replace(/\s+\./g, '.').trim();
  return { optimized: cleaned, appliedRules };
}

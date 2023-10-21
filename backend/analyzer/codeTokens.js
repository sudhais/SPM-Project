import { Lexer, createToken } from 'chevrotain';

// Define Java keywords as tokens
const Keywords = {
    // Access modifiers
    Public: createToken({ name: "Public", pattern: /public/, group: Lexer.SKIPPED }),
    Private: createToken({ name: "Private", pattern: /private/, group: Lexer.SKIPPED }),
    Protected: createToken({ name: "Protected", pattern: /protected/, group: Lexer.SKIPPED }),
    Static: createToken({ name: "Static", pattern: /static/, group: Lexer.SKIPPED }),
    Final: createToken({ name: "Final", pattern: /final/, group: Lexer.SKIPPED }),
    DoubleQuotedString: createToken({
        name: "DoubleQuotedString",
        pattern: /"([^"\\]|\\.)*"/,
        // group: Lexer.SKIPPED
    }),
    SingleQuotedString: createToken({
        name: "SingleQuotedString",
        pattern: /'([^'\\]|\\.)*'/,
        // group: Lexer.SKIPPED
    }),
    PositiveNumber: createToken({ name: "PositiveNumber", pattern: /\d+\.\d+|\d+/ }),
    NegativeNumber: createToken({ name: "NegativeNumber", pattern: /-\d+\.\d+|-\d+/ }),
    Whitespace: createToken({
        name: "Whitespace",
        pattern: /\s+/,
        line_breaks: true,
        group: Lexer.SKIPPED}),
    

    // Control flow keywords
    If: createToken({ name: "If", pattern: /if/ }),
    Else: createToken({ name: "Else", pattern: /else/, group: Lexer.SKIPPED }),
    For: createToken({ name: "For", pattern: /for/ }),
    While: createToken({ name: "While", pattern: /while/ }),
    Switch: createToken({ name: "Switch", pattern: /switch/ }),
    Case: createToken({ name: "Case", pattern: /case/ }),
    Default: createToken({ name: "Default", pattern: /default/ }),
    Return: createToken({ name: "Return", pattern: /return/, group: Lexer.SKIPPED }),
    
    // Data types
    Int: createToken({ name: "Int", pattern: /int/ }),
    String: createToken({ name: "String", pattern: /String/ }),
    Boolean: createToken({ name: "Boolean", pattern: /boolean/ }),
    Void: createToken({ name: "Void", pattern: /void/ }),
    Float: createToken({ name: "Float", pattern: /float/ }),
    Double: createToken({ name: "Double", pattern: /double/ }),
    
    Do: createToken({ name: "Do", pattern: /do/, group: Lexer.SKIPPED }),

    // Other keywords
    Class: createToken({ name: "Class", pattern: /class/ }),
    Extends: createToken({ name: "Extends", pattern: /extends/ }),
    This: createToken({ name: "This", pattern: /this/ }),
    New: createToken({ name: "New", pattern: /new/ }),
    Return: createToken({ name: "Return", pattern: /return/ }),
};

// Define Java operators as tokens
const Operators = {
    Plus: createToken({ name: "Plus", pattern: /\+/ }),
    Minus: createToken({ name: "Minus", pattern: /-/ }),
    Multiply: createToken({ name: "Multiply", pattern: /\*/ }),
    Divide: createToken({ name: "Divide", pattern: /\// }),
    Equal: createToken({ name: "Equal", pattern: /==/ }),
    Assignment: createToken({ name: "Assignment", pattern: /=/ }),
    NotEqual: createToken({ name: "NotEqual", pattern: /!=/ }),
    GreaterThan: createToken({ name: "GreaterThan", pattern: />/ }),
    LessThan: createToken({ name: "LessThan", pattern: /</ }),
    And: createToken({ name: "And", pattern: /&&/ }),
    Or: createToken({ name: "Or", pattern: /\|\|/ }),
    Not: createToken({ name: "Not", pattern: /!/ }),
    DotOperator: createToken({ name: "DotOperator", pattern: /\./ }),
Identifier: createToken({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ }),
};

// Create an array of all Java keyword and operator tokens
const JavaTokens = [
    ...Object.values(Keywords),
    ...Object.values(Operators),
];

// Define the lexer with the Java tokens
const JavaLexer = new Lexer(JavaTokens);

export default JavaLexer;
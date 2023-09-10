import { Lexer, CstParser, createToken } from 'chevrotain'

// Define tokens for keywords, identifiers, and other relevant tokens
const Access = createToken({ name: 'Access', pattern: Lexer.NA })
const Public = createToken({
  name: 'Public',
  pattern: /public/,
  categories: Access,
})
const Private = createToken({
  name: 'Private',
  pattern: /private/,
  categories: Access,
})
const Protected = createToken({
  name: 'Protected',
  pattern: /protected/,
  categories: Access,
})
const Static = createToken({ name: 'Static', pattern: /static/ })

const Branch = createToken({ name: 'Branch', pattern: Lexer.NA })
const If = createToken({ name: 'If', pattern: /if/, categories: Branch })
const ElseIf = createToken({
  name: 'ElseIf',
  pattern: /else if/,
  categories: Branch,
})

const Switch = createToken({ name: 'Switch', pattern: /switch/ })
const Case = createToken({ name: 'Case', pattern: /case/ })

const Iterative = createToken({ name: 'Iterative', pattern: Lexer.NA })
const For = createToken({ name: 'For', pattern: /for/, categories: Iterative })
const While = createToken({
  name: 'While',
  pattern: /while/,
  categories: Iterative,
})

const Type = createToken({ name: 'Type', pattern: Lexer.NA })
const Int = createToken({ name: 'Int', pattern: /int/, categories: Type })
const String = createToken({
  name: 'String',
  pattern: /String/,
  categories: Type,
})
const Boolean = createToken({
  name: 'Boolean',
  pattern: /boolean/,
  categories: Type,
})
const Void = createToken({ name: 'Void', pattern: /void/, categories: Type })
const Float = createToken({ name: 'Float', pattern: /float/, categories: Type })
const Double = createToken({
  name: 'Double',
  pattern: /double/,
  categories: Type,
})

const Class = createToken({ name: 'Class', pattern: /class/ })
const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z_]\w*/ })
const LeftBrace = createToken({ name: 'LeftBrace', pattern: /{/ })
const RightBrace = createToken({ name: 'RightBrace', pattern: /}/ })
const LeftParen = createToken({ name: 'LeftParen', pattern: /\(/ })
const RightParen = createToken({ name: 'RightParen', pattern: /\)/ })

// Create an array of all Java tokens
const JavaTokens = [
  Access,
  Type,
  Switch,
  Case,
  Iterative,
  For,
  While,
  Branch,
  If,
  ElseIf,
  Class,
  Static,
  Public,
  Private,
  Protected,
  LeftBrace,
  Int,
  String,
  Boolean,
  Void,
  Float,
  Double,
  RightBrace,
  LeftParen,
  RightParen,
  Identifier,
]

// Define the lexer with the Java tokens
const JavaLexer = new Lexer(JavaTokens)

// Define the class and method declaration grammar using chevrotain
class JavaParser extends CstParser {
  constructor() {
    super(JavaTokens)

    this.RULE('classDeclaration', () => {
      this.CONSUME(Access)
      this.CONSUME(Class)
      this.CONSUME(Identifier)
      this.CONSUME(LeftBrace)
      // this.SUBRULE(this.classBody);
      // this.CONSUME(RightBrace);
    })

    this.RULE('classBody', () => {
      this.OPTION(() => {
        this.SUBRULE(this.methodDeclaration)
      })
    })

    this.RULE('methodDeclaration', () => {
      this.CONSUME(Access)
      this.OPTION(() => {
        this.CONSUME(Static)
      })
      this.CONSUME(Type) // Assuming you want to capture the method's return type
      this.CONSUME(Identifier)
      this.CONSUME(LeftParen)
      // this.CONSUME(RightParen);
      // this.CONSUME(LeftBrace);
      // this.CONSUME(RightBrace);
    })

    this.RULE('branchStatement', () => {
      this.CONSUME(Branch)
      this.CONSUME(LeftParen)
    })

    this.RULE('iterativeStatement', () => {
      this.CONSUME(Iterative)
      this.CONSUME(LeftParen)
    })

    this.RULE('switchStatement', () => {
      this.CONSUME(Switch)
      this.CONSUME(LeftParen)
    })

    this.RULE('type', () => {
      this.CONSUME(Identifier) // Assuming you want to capture the return type
    })

    this.performSelfAnalysis()
  }
}

const parser = new JavaParser()
export { parser }

const BaseCstVisitor = parser.getBaseCstVisitorConstructor()

class JavaParserVisitor extends BaseCstVisitor {
  classDeclaration(ctx) {
    return true
  }
  methodDeclaration(ctx) {
    return true
  }
  branchStatement(ctx) {
    return true
  }
  iterativeStatement(ctx) {
    return true
  }
  switchStatement(ctx) {
    return true
  }
}

export function isClassDeclaration(javaCode) {
  const { tokens } = JavaLexer.tokenize(javaCode)

  parser.input = tokens
  const cst = parser.classDeclaration()

  const visitor = new JavaParserVisitor()
  const result = visitor.visit(cst)

  return result ? true : false
}

export function isMethodDeclaration(javaCode) {
  const { tokens } = JavaLexer.tokenize(javaCode)

  parser.input = tokens
  const cst = parser.methodDeclaration()

  const visitor = new JavaParserVisitor()
  const result = visitor.visit(cst)

  return result ? true : false
}

export function isBranchStatement(javaCode) {
  const { tokens } = JavaLexer.tokenize(javaCode)

  parser.input = tokens
  const cst = parser.branchStatement()

  const visitor = new JavaParserVisitor()
  const result = visitor.visit(cst)

  return result ? true : false
}

export function isIterativeStatement(javaCode) {
  const { tokens } = JavaLexer.tokenize(javaCode)

  parser.input = tokens
  const cst = parser.iterativeStatement()

  const visitor = JavaParserVisitor()
  const result = visitor.visit(cst)

  return result ? true : false
}

export function isSwitchStatement(javaCode) {
  const { tokens } = JavaLexer.tokenize(javaCode)

  parser.input = tokens
  const cst = parser.switchStatement()

  const visitor = new JavaParserVisitor()
  const result = visitor.visit(cst)

  return result ? true : false
}

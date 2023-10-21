import { Lexer, createToken, CstParser } from "chevrotain";

// Define Java tokens
const ClassToken = createToken({ name: "Class", pattern: /class/ });
const Identifier = createToken({ name: "Identifier", pattern: /[A-Z][a-zA-Z]*/ });
const ExtendsToken = createToken({ name: "Extends", pattern: /extends/ });

export const JavaLexer2 = new Lexer([ClassToken, ExtendsToken, Identifier]);

class JavaParser extends CstParser {
    constructor() {
        super([ClassToken, ExtendsToken, Identifier]);

        this.classHierarchy = {};

        this.RULE("classDeclaration", () => {
            this.CONSUME(ClassToken);
            const className = this.CONSUME(Identifier).image;
            
            this.OPTION(() => {
                this.CONSUME(ExtendsToken);
                const superClassName = this.CONSUME2(Identifier).image;
                
                this.classHierarchy[className] = superClassName;
            });
        });

        this.performSelfAnalysis();
    }

    determineInheritanceLevel(targetClass) {
        let currentClass = targetClass;
        let level = 1;

        while (currentClass !== null && this.classHierarchy[currentClass] !== undefined) {
            level++;
            currentClass = this.classHierarchy[currentClass];
        }

        return level;
    }
}

const parser = new JavaParser();


export default parser;




export interface ILanguagesVersion {
  javascript:string;
  typescript:string;
  python:string;
  java:string;
  
}

export const LANGUAGE_VERSIONS:ILanguagesVersion = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
 
};

export const CODE_SNIPPETS: Record<string, string>= {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("World");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "World" });\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("World")\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
 
};

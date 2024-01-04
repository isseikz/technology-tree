class Node {
    id: string;
    name: string;
    description: string;

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static encode(node: Node) {
        return {
            id: node.id,
            name: node.name,
            description: node.description,
        };
    }

    static decode(data: any) {
        return new Node(data.id, data.name, data.description);
    }
}

class Dependency {
    source: Node;
    target: Node;
    completed: boolean = false;

    constructor(source: Node, target: Node, completed: boolean = false) {
        this.source = source;
        this.target = target;
        this.completed = completed;
    }

    static encode(dependency: Dependency) {
        return {
            source: Node.encode(dependency.source),
            target: Node.encode(dependency.target),
        };
    }

    static decode(data: any) {
        return new Dependency(Node.decode(data.source), Node.decode(data.target));
    }
}

export { Node, Dependency }

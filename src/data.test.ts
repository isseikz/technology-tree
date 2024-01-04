// FILEPATH: /Users/isseikz/Projects/web-component-library/src/data.test.ts
import { Node } from './data';

describe('Node', () => {
  describe('encode', () => {
    it('should correctly encode a Node instance', () => {
      const node = new Node('1', 'Node 1', 'This is node 1');
      const encoded = Node.encode(node);

      expect(encoded).toEqual({
        id: '1',
        name: 'Node 1',
        description: 'This is node 1',
      });
    });
  });

  describe('decode', () => {
    it('should correctly decode a plain object to a Node instance', () => {
      const data = {
        id: '1',
        name: 'Node 1',
        description: 'This is node 1',
      };
      const node = Node.decode(data);

      expect(node).toBeInstanceOf(Node);
      expect(node.id).toEqual(data.id);
      expect(node.name).toEqual(data.name);
      expect(node.description).toEqual(data.description);
    });
  });
});
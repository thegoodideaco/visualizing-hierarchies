import * as _ from 'lodash'


export default class {


  /**
   * Initialize the tree.
   *
   * @param {Array<String>} seq - A sequence of tokens.
   */
  constructor(...seqs) {
    this.seqs = seqs
  }


  /**
   * Query a suffix tree.
   *
   * @param {String} root - The root token.
   * @param {Number} depth - The depth of the suffix tree.
   * @param {Number} maxChildren - The max number of children.
   */
  query(root, depth=10, maxChildren=null) {

    let suffixes = []

    // Probe for suffix sequences.
    _.each(this.seqs, s => {
      _.each(s, (token, i) => {
        if (token === root) {
          suffixes.push(s.slice(i+1, i+1+depth))
        }
      })
    })

    let tree = {
      name:  root,
      count: 1
    }

    _.each(suffixes, suffix => {
      _.reduce(suffix, (parent, token) => {

        // Initialize the children map, if not present.
        if (!parent.children) {
          parent.children = {}
        }

        let leaf

        // If first parent -> child sequence, register new child.
        if (!_.has(parent.children, token)) {

          leaf = {
            name:  token,
            count: 1
          }

          parent.children[token] = leaf

        }

        // Otherwise, bump the count.
        else {
          leaf = parent.children[token]
          leaf.count++
        }

        return leaf

      }, tree)
    });

    (function sort(subtree) {

      if (subtree.children) {

        let children = _.values(subtree.children)

        // Sort on count DESC, name ASC.
        children = _.sortBy(
          subtree.children,
          ['count', 'name'],
          ['desc', 'asc'],
        )

        if (maxChildren) {
          children = children.slice(0, maxChildren)
        }

        subtree.children = children

      }

      // Recurse to children.
      _.each(subtree.children, sort)

    })(tree)

    return tree

  }


}
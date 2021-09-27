import deepDiff from './deepDiff';
const { diff } = deepDiff;

function isPathsEqual(actual, expected) {
  return (
    actual.length === expected.length &&
    actual.every((k, i) => k === expected[i])
  );
}

function getSubjectAtPath(target, path) {
  return typeof target !== 'object'
    ? null
    : path.reduce(
        (value, key) => (typeof !value === 'undefined' ? value : value[key]),
        target
      );
}

export function mergeChanges(a, b) {
  // if an empty object is returned, there is no change
  let merged = {};

  // these changes would cancel out otherwise
  if (a.lhs !== b.rhs) {
    // arrays need their items merged
    if (a.kind === 'A' || b.kind === 'A') {
      let item = mergeChanges(
        a.kind === 'A' ? a.item : { kind: a.kind, lhs: a.lhs },
        b.kind === 'A' ? b.item : { kind: b.kind, rhs: b.rhs }
      );

      // items would cancel out otherwise
      if (item && item.kind) {
        // if `a` wasn't the array, `b` was
        merged = a.kind === 'A' ? { ...a, item } : { ...b, item };
      }
      // if `b` was an edit and `a` was an addition, keep `a`
    } else if (a.kind !== 'D' && b.kind === 'E') {
      merged = { ...a, rhs: b.rhs };
      // if `a` was a delete and `b` isn't, it was an edit
    } else if (a.kind === 'D' && b.kind !== 'D') {
      merged = { kind: 'E', path: a.path, lhs: a.lhs, rhs: b.rhs };
      // if `a` wasn't a delete, but `b` was, keep `b`
    } else if (a.kind !== 'D' && b.kind === 'D') {
      merged = { ...b, lhs: a.lhs };
      // unhandled shouldn't be added to the diff
    } else {
      return;
    }
  }

  return merged;
}

export default class DiffAccumulator {
  flattened = [];
  changes = [];
  lhs = null;
  rhs = null;

  constructor({ flatten, prefilter } = {}) {
    this.opts = { flatten, prefilter };
  }

  prefilter = (path, key) => {
    if (this.isFlattened([...path, key])) {
      return true;
    } else if (this.opts.prefilter) {
      return this.opts.prefilter(path, key);
    } else {
      return false;
    }
  };

  diff(lhs, rhs) {
    this.flattened = [];
    this.lhs = lhs;
    this.rhs = rhs;

    diff(lhs, rhs, this.prefilter, this);
    return this.changes;
  }

  clear() {
    this.changes = [];
  }

  getFlatPath(change) {
    let index = -1;

    if (this.opts.flatten) {
      index = change.path.findIndex((key, i, path) => {
        return this.opts.flatten(path.slice(0, i), key);
      });
    }

    return index >= 0 ? change.path.slice(0, index + 1) : change.path;
  }

  isFlattened(path) {
    return this.flattened.some((done) => {
      return isPathsEqual(done, path);
    });
  }

  addChange(change) {
    let existingIndex = this.changes.findIndex((c) => {
      // array paths should include the index when comparing across changes
      let pathA =
        change.kind === 'A' ? [...change.path, change.index] : change.path;
      let pathB = c.kind === 'A' ? [...c.path, c.index] : c.path;
      return isPathsEqual(pathA, pathB);
    });

    // ensure change is a POJO
    if (change.item) {
      change = { ...change, item: { ...change.item } };
    } else {
      change = { ...change };
    }

    // merge existing changes
    if (existingIndex > -1) {
      let merged = mergeChanges(this.changes[existingIndex], change);

      // remove the change if `merged` is empty
      if (merged && !merged.kind) {
        this.changes.splice(existingIndex, 1);
      } else if (merged) {
        this.changes.splice(existingIndex, 1, merged);
      }
    } else {
      this.changes.push(change);
    }
  }

  push(change) {
    let flatPath = this.getFlatPath(change);
    if (this.isFlattened(flatPath)) return;

    // flatten non-array changes when the change path is deeper than
    // the potentially flattened path
    if (change.kind !== 'A' && !isPathsEqual(flatPath, change.path)) {
      const lhs = getSubjectAtPath(this.lhs, flatPath);
      const rhs = getSubjectAtPath(this.rhs, flatPath);
      this.addChange({ kind: 'E', path: flatPath, lhs, rhs });
      this.flattened.push(flatPath);
    } else {
      this.addChange(change);
    }
  }
}

export default
(from: {}): Function =>
  (to: {} = {}, key: string): {} => {
    if (key in from) to[key] = from[key];

    return to;
  }
;

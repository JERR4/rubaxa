function now(v) {
  if (!v) return Date.now();
  
  const sign = v[0];
  if (sign !== '+' && sign !== '-') {
    throw new Error('Invalid format: must start with + or -');
  }

  let i = 1;
  while (i < v.length && (isDigit(v[i]) || v[i] === '.')) {
    i++;
  }

  const amountStr = v.slice(1, i);
  const unitRaw = v.slice(i).trim().toLowerCase();

  const amount = parseFloat(amountStr);

  const unitMap = {
    ms: 1,
    millisecond: 1,
    milliseconds: 1,

    s: 1000,
    sec: 1000,
    secs: 1000,
    second: 1000,
    seconds: 1000,

    m: 60000,
    min: 60000,
    mins: 60000,
    minute: 60000,
    minutes: 60000,

    h: 3600000,
    hr: 3600000,
    hrs: 3600000,
    hour: 3600000,
    hours: 3600000,
  };

  if (!(unitRaw in unitMap)) {
    throw new Error(`Unsupported unit: ${unitRaw}`);
  }

  const delta = amount * unitMap[unitRaw];
  return sign === '+' ? Date.now() + delta : Date.now() - delta;
}

function isDigit(c) {
  return c >= '0' && c <= '9';
}

console.log(now());
console.log(now('+30min'));  // Date.now() + 30 * 60 * 1000
console.log(now('-3.5h'));
console.log(now('+1000ms'));
console.log(now('+2hours'));
function parallel(tasks, callback) {
  if (tasks.length === 0) {
    callback([]);
    return;
  }
  
  const results = [];
  let completed = 0;

  tasks.forEach((task, index) => {
    if (task.length === 1) // asynk, приниммают callback
    {
      task(function (result) {
        results[index] = result;
        completed++;
        if (completed === tasks.length) {
          callback(results);
        }
      });
    } else  //sync, ничего не принимают
    {
      setTimeout(() => {
        const result = task();
        results[index] = result;
        completed++;
        if (completed === tasks.length) {
          callback(results);
        }
      }, 0);
    }
  });
}

parallel([
	function (resolve) {
		setTimeout(function () {
			resolve(10);
		}, 50);
	},
	function () {
		return 5;
	},
	function (resolve) {
		setTimeout(function () {
			resolve(0);
		}, 10)
	}
], function (results) {
	console.log(results); // [10, 5, 0]
});

function testParallel() {
  let testsPassed = 0;

  // Test 1: асинхронные
  parallel([
    (resolve) => setTimeout(() => resolve('a'), 50),
    (resolve) => setTimeout(() => resolve('b'), 10)
  ], (results) => {
    const passed = JSON.stringify(results) === JSON.stringify(['a', 'b']);
    console.log(passed ? 'Test 1 passed' : 'Test 1 failed');
    if (passed) testsPassed++;

    // Test 2: синхронные
    parallel([
      () => 1,
      () => 2
    ], (results) => {
      const passed = JSON.stringify(results) === JSON.stringify([1, 2]);
      console.log(passed ? 'Test 2 passed' : 'Test 2 failed');
      if (passed) testsPassed++;

      // Test 3: смешанные
      parallel([
        (resolve) => setTimeout(() => resolve('x'), 30),
        () => 'y',
        (resolve) => setTimeout(() => resolve('z'), 10)
      ], (results) => {
        const passed = JSON.stringify(results) === JSON.stringify(['x', 'y', 'z']);
        console.log(passed ? 'Test 3 passed' : 'Test 3 failed');
        if (passed) testsPassed++;

        // Test 4: в порядке
        parallel([
          () => 'first',
          (resolve) => setTimeout(() => resolve('second'), 10),
          () => 'third'
        ], (results) => {
          const passed = JSON.stringify(results) === JSON.stringify(['first', 'second', 'third']);
          console.log(passed ? 'Test 4 passed' : 'Test 4 failed');
          if (passed) testsPassed++;

          // Test 5: пустой
          parallel([], (results) => {
            const passed = Array.isArray(results) && results.length === 0;
            console.log(passed ? 'Test 5 passed' : 'Test 5 failed');
            if (passed) testsPassed++;

            console.log(`${testsPassed}/5 tests passed.`);
          });
        });
      });
    });
  });
}

testParallel();

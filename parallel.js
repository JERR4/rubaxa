// Параллельные вычисления

function parallel(tasks, callback) {
  const results = [];
  let completed = 0;

  tasks.forEach((task, index) => {
    if (task.length === 1) {
      task(function (result) {
        results[index] = result;
        completed++;
        if (completed === tasks.length) {
          callback(results);
        }
      });
    } else {
      const result = task();
      results[index] = result;
      completed++;
      if (completed === tasks.length) {
        callback(results);
      }
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
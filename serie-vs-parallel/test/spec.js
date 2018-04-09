const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));

export default test => {
	test('some test', async t => {
		await wait(500);
		t.ok(true);
	});

	test('some other test', async t => {
		await wait(500);
		t.ok(true);
	});
};
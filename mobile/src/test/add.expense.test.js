const makeTest = require('../../helpers/setup').makeTest;

makeTest('Test - Add new expense', function () {
	test('App load correctly', async function () {
		await DashboardPO.elementExistBy('piegraph');
	});

	test('Click on New Expense', async function () {
		await DashboardPO.clickBy('expense_button');
	});

	test('Mark 20.50', async function () {
		await NewExpensePO.clickBy('two_button');
		await NewExpensePO.clickBy('cero_button');
		await NewExpensePO.clickBy('dot_button');
		await NewExpensePO.clickBy('five_button');
		await NewExpensePO.clickBy('cero_button');
	});

	test('Click on choose category', async function () {
		await NewExpensePO.clickBy('choose_category');
	});

	test('Click on "Bills" category', async function () {
		await NewExpensePO.clickOnCategory('Bills');
	});

	test('Dashboard is displayed', async function () {
		await DashboardPO.elementExistBy('piegraph');
	});

	test('Get total expensed', async function () {
		const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
		console.log(expensed);
	});
});

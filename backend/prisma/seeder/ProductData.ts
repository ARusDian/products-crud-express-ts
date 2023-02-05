export const ProductData = [
	{
		name: "Product 1",
		price: 100,
		userId: 1,
		user: {
			connect: {
				id: 1
			}
		},
		category: [
			{
				connect: {
					id: 1
				},
			},
			{
				connect:
				{
					id: 2
				}
			}
		]
	},
	{
		name: "Product 2",
		price: 200,
		userId: 3,
		user: {
			connect: {
				id: 3
			}
		},
		category: [
			{
				connect: {
					id: 2
				},
			},
			{
				connect:
				{
					id: 3
				}
			}
		]
	},
	{
		name: "Product 3",
		price: 300,
		userId: 2,
		user: {
			connect: {
				id: 2
			}
		},
		category: [
			{
				connect: {
					id: 1
				},
			},
			{
				connect:
				{
					id: 4
				}
			}
		]
	},
];

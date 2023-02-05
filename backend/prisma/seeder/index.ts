import { PrismaClient } from "@prisma/client";
import { RoleData } from "./RoleData";
import { ProductData } from "./ProductData";
import { UserData } from "./UserData";

const prisma = new PrismaClient();

const seedRole = async () => {
	Promise.all(
		RoleData.map(async (role) => {
			await prisma.role.create({
				data: {
					name: role.name,
				},
			});
		})
	);
};

const seedUser = async () => {
	Promise.all(
		UserData.map(async (user) => {
			await prisma.user.create({
				data: {
					name: user.name,
					email: user.email,
					password: user.password,
					role: {
						connect: {
							id: user.roleId,
						}
					}
				},
			});
		})
	);
};

const seedProduct = async () => {
	Promise.all(
		ProductData.map(async (product) => {
			await prisma.product.create({
				data: {
					name: product.name,
					price: product.price,
					user: {
						connect: {
							id: product.userId,
						}
					}
				},
			});
		})
	);
};

async function main() {
	//If There's Error, Try to seed the data in this order one by one

	await prisma.user.deleteMany();
	console.log("Deleted records in user table");

	await prisma.role.deleteMany();
	console.log("Deleted records in role table");

	await prisma.product.deleteMany();
	console.log("Deleted records in product table");

	seedRole();
	console.log("Seeded records in role table");

	seedUser();
	console.log("Seeded records in user table");

	seedProduct();
	console.log("Seeded records in product table");

	console.log("Done!");

}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

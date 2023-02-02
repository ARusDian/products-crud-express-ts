import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, {useSWRConfig} from 'swr';
import { ProductModel } from '../types';

export default function productList() {
	const { mutate } = useSWRConfig();
	const fetcher =
		(url: string) =>
			axios.get(url).then((res) => res.data);

	const { data, error } = useSWR('/api/products', () => fetcher("http://localhost:3001/api/products"));
	if (!data) return <h2>Loading...</h2>;
	if (error) return <h2>Failed to load</h2>;

	const deleteProductHandler = async (id: number) => {
		try {
			await axios.delete(`/api/products/${id}`);
			mutate('/api/products');  
			alert('Product deleted successfully');
		} catch (error) {
			alert('Failed to delete product, reason : ' + error);
		}
	};
	return (
		<div className="flex flex-col mt-5">
			<div className="w-full">
				<Link to="/create">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Create Product
					</button>
				</Link>
				<div className="relative shadow rounded-lg mt-3">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase">
							<tr>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									No
								</th>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Product Name
								</th>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Price
								</th>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((product: ProductModel, index: number) => (
								<tr className="bg-white border-b">
									<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
										{index + 1}
									</td>
									<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
										{product.name}
									</td>
									<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
										${product.price}
									</td>
									<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 flex justify-around">
										<Link to={`/edit/${product.id}`}>
											<button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
												Edit
											</button>
										</Link>
										<button onClick={() => deleteProductHandler(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

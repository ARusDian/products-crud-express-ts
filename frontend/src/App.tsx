import { BrowserRouter, Routes, Route } from "react-router-dom";
import 	ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
	return (
		<div className='container'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<ProductList />} />
					<Route path='/create' element={<AddProduct />} />
					<Route path='/edit/:id' element={<EditProduct />} />
					<Route path='*' element={<h1>404 Not Found</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

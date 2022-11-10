import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/Button';

export default function Home(props) {
	const router = useRouter();
	console.log(props);
	console.log(router);
	/**
	 * stores the content of the search bar
	 */

	const [searchField, setSearchField] = useState('');

	/**
	 * pushes the windows so the getServerSideProps does the search
	 */

	const handleClickSearch = () => {
		router.push(`/?search=${searchField}`);
	};

	const nextPage = () => {
		if (props.data.next !== null && props.data.next !== undefined) {
			router.push(props.data.next.split('/').pop());
		}
	};

	const prevPage = () => {
		if (props.data.previous !== null && props.data.next !== undefined) {
			router.push(props.data.previous.split('/').pop());
		}
	};

	return (
		<main className={styles.main}>
			<h1>Remarcable people of a galaxy far, far away...</h1>
			<h4>
				Search for your favourite character:{' '}
				<input
					type="text"
					value={searchField}
					onChange={(e) => setSearchField(e.target.value)}></input>
				<button onClick={() => handleClickSearch()}>Search</button>
			</h4>
			<ul className="list-group">
				{props.data.results === undefined
					? ''
					: props.data.results.map((item, i) => (
							<link href="/character-page" key={i}>
								<li className="list-group-item">{item.name}</li>
							</link>
					  ))}
			</ul>

			<div>
				<Button handleClick={nextPage} />
				<Button handleClick={prevPage} />
			</div>
		</main>
	);
}

/**
 * this funtion will get you te characters on the search and also paginates it
 */

export async function getServerSideProps(context) {
	try {
		const res = await fetch(
			`https://swapi.dev/api/people/?search=${context.query.search}&page=${
				context.query.page === undefined ? '' : context.query.page
			}`
		);

		const data = await res.json();

		console.log(res);

		if (!data) {
			return {
				notFound: true,
			};
		}
		return {
			props: {data},
		};
	} catch {
		return {
			props: {data: []},
		};
	}
}

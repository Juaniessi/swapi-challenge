import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/Button';

export default function Home(props) {
	console.log(props.data);

	const router = useRouter();

	const [searchField, setSearchField] = useState('');
	/**
	 * pushes the windows so the getServerSideProps does the search
	 */

	const handleClickSearch = () => {
		router.push(`/?search=${searchField}`);
	};

	return (
		<div className={styles.container}>
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
				{props.data.results.map((item, i) => (
					<ul className="" key={i}>
						{item.name}
					</ul>
				))}
				<div>
					<Button />
					<Button />
				</div>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
}

export async function getServerSideProps(context) {
	try {
		const res = await fetch(
			`https://swapi.dev/api/people/?search=${context.query.search}`
		);
		const data = await res.json();

		console.log(context);

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

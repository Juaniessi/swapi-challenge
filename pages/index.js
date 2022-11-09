import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';

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
				<div>In a galaxy far, far away...</div>
				<div>
					Search for your favourite character:{' '}
					<input
						type="text"
						value={searchField}
						onChange={(e) => setSearchField(e.target.value)}></input>
					<div onClick={() => handleClickSearch()}>Search</div>
				</div>
				{props.data.results.map((item, i) => (
					<div className="" key={i}>
						{item.name}
					</div>
				))}
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
			props: {data:[]},
		};
	}
}

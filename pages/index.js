import styles from '../styles/Home.module.css';
import {useState} from 'react';

export default function Home(props) {
	console.log(props.data);

	const [searchField, setSearchField] = useState('');

	const doTheSearch = (item) => {
		setSearchField(item);
	};

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div>In a galaxy far, far away...</div>
				<div>
					Search for your favourite character:{' '}
					<input type="text" value=""></input>
					<div onClick={doTheSearch}>Search</div>
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
	const res = await fetch(`https://swapi.dev/api/people/`);
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
}

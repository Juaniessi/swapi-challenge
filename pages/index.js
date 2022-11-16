import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/Button';
import Link from 'next/link';

export default function Home(props) {
	const router = useRouter();

	/**
	 * stores the content of the search bar
	 */

	const [searchField, setSearchField] = useState('');

	/**
	 * pushes the windows so the getServerSideProps does the search
	 */

	const handleClickSearch = (e) => {
		e.preventDefault();
		router.push(`/?search=${searchField}`);
	};

	/**
	 * takes you to the next row of characters
	 */

	const nextPage = () => {
		if (props.data.next !== null && props.data.next !== undefined) {
			router.push(props.data.next.split('/').pop());
		}
	};

	/**
	 * takes you to the previous row of characters
	 */

	const prevPage = () => {
		if (props.data.previous !== null && props.data.next !== undefined) {
			router.push(props.data.previous.split('/').pop());
		}
	};

	return (
		<main className={styles.main}>
			<h1 className="mb-5 mt-5">
				Remarcable people of a galaxy far, far away...
			</h1>
			<h4 className="mb-2 mt-2">
				Search for your favourite character:{' '}
				<form
					className={'input-group mb-3 mt-3'}
					onSubmit={(e) => handleClickSearch(e)}>
					<input
						type="text"
						value={searchField}
						onChange={(e) => setSearchField(e.target.value)}
						className={'form-control'}></input>
					<button className={'btn btn-outline-secondary'}>Search</button>
				</form>
			</h4>
			<ul className="list-group ">
				{props.data.results === undefined
					? ''
					: props.data.results.map((item, i) => (
							<Link
								href={`/character-page?url=${item.url}`}
								key={i}
								className="text-decoration-none">
								<li className="list-group-item mb-1 mt-1 border-warning rounded d-flex justify-content-center">
									{item.name}
								</li>
							</Link>
					  ))}
			</ul>
			<div className={styles.buttonBox}>
				<Button
					handleClick={prevPage}
					label="Previous"
					disabled={!props.data.previous}
				/>
				<Button
					handleClick={nextPage}
					label="Next"
					disabled={!props.data.next}
				/>
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
			`https://swapi.py4e.com/api/people/?search=${context.query.search}&page=${
				context.query.page === undefined ? '' : context.query.page
			}`
		);

		const data = await res.json();

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

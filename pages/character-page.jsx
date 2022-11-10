import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/boton';

export default function Character(props) {
	console.log(props);
	return (
		<main>
			<h2>Character Bio</h2>

			{props.data.results === undefined
				? ''
				: props.data.results.map((item, i) => (
						<ul key={i}>
							<li className="list-group-item">Name:{item.name}</li>
							<li className="list-group-item">
								Year of birth:{item.birth_year}
							</li>
							<li className="list-group-item">Eye color:{item.eye_color}</li>
							<li className="list-group-item">Gender:{item.gender}</li>
							<li className="list-group-item">hair color:{item.hair_color}</li>
							<li className="list-group-item">Height:{item.height}</li>
							<li className="list-group-item">Body mass:{item.mass}</li>
							<li className="list-group-item">Skin color:{item.skin_color}</li>
						</ul>
				  ))}

			<Button />
		</main>
	);
}

export async function getServerSideProps(context) {
	try {
		const res = await fetch(
			`https://swapi.dev/api/people/?search=${context.result.url}`
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

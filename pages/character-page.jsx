import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/Button';
import Link from 'next/link';

export default function Character(props) {
	const router = useRouter();
	console.log(props);
	return (
		<main>
			<h2>Character Bio</h2>

			{props.data === undefined ? (
				''
			) : (
				<ul className="list-group">
					<li className="list-group-item">Name: {props.data.name}</li>
					<li className="list-group-item">
						Year of birth: {props.data.birth_year}
					</li>
					<li className="list-group-item">Eye color: {props.data.eye_color}</li>
					<li className="list-group-item">Gender: {props.data.gender}</li>
					<li className="list-group-item">
						hair color: {props.data.hair_color}
					</li>
					<li className="list-group-item">Height: {props.data.height}</li>
					<li className="list-group-item">Body mass: {props.data.mass}</li>
					<li className="list-group-item">
						Skin color: {props.data.skin_color}
					</li>
				</ul>
			)}

			<Link href="/">
				<Button />
			</Link>
		</main>
	);
}

export async function getServerSideProps(context) {
	console.log(context);
	try {
		const res = await fetch(`${context.query.url}`);
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

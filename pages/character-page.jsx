import styles from '../styles/Home.module.css';
import {useRouter} from 'next/router';
import Button from '../components/Button';
import Link from 'next/link';

export default function Character(props) {
	const router = useRouter();
	console.log(props);
	return (
		<main className={styles.main}>
			<h1>Character Bio</h1>

			{props.data === undefined ? (
				''
			) : (
				<ul className="list-group">
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Name: {props.data.name}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Year of birth: {props.data.birth_year}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Eye color: {props.data.eye_color}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Gender: {props.data.gender}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Hair color: {props.data.hair_color}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Height: {props.data.height}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Body mass: {props.data.mass}
					</li>
					<li className="list-group-item mt-1 mb-1 border-warning rounded">
						Skin color: {props.data.skin_color}
					</li>
				</ul>
			)}
			<Link href="/">
				<Button label="Go back" className="btn btn-danger"/>
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

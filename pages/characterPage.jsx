import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/Button';

export default function Character(props) {
	return (
		<main>
			<h2>Character Bio</h2>
			<Button/>
		</main>
	);
}



import PropTypes from 'prop-types';
import classNames from '../../utils/classNames';
import styles from './Button.module.css';

/**
 * Generates a button with many preconfigured options
 * @param {*} handleClick function to execute with the button
 * @param {*} size the size of the button
 * @param {*} primary styles prymary o secondary
 * @param {*} className a custom class adde to the end, so it overwrites any styles you need to modify
 * @param {*} disabled prevents the button from beeing used
 * @param {*} isLoading sityles for the loading button
 */

const Button = ({
	handleClick,
	label,
	size,
	primary,
	className,
	disabled,
	isLoading,
	...props
}) => {
	return (
		<button
			className={classNames(
				styles.button,
				styles[size],
				styles[primary ? 'primary' : 'secondary'],
				className
			)}
			onClick={handleClick}
			disabled={isLoading || disabled}
			{...props}>
			{isLoading ? <span className={styles.loading}></span> : label}
		</button>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func,
	label: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	className: PropTypes.string,
	primary: PropTypes.bool,
	isLoading: PropTypes.bool,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	handleClick: () => {},
	className: '',
	label: '',
	size: 'medium',
	primary: true,
	disabled: false,
	isLoading: false,
};

export default Button;

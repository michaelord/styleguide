import {Carousel} from 'components/carousel';
import {Definition} from 'components/editable';
import * as Types from 'components/types';
import React, {useEffect, useState} from 'react';
import './Styleguide.scss';
import './ComponentCard.scss';
import {Card} from 'components/card';
import * as Utils from 'components/libs';

type ComponentCardProps = {
	title: string;
	tags?: Array<string>;
	icon?: string;
	parentSlug: string;
	slug: string;
};

export const ComponentCard = (props: ComponentCardProps) => {
	const {title, tags, icon, parentSlug, slug} = props;

	const logo = icon ? icon : Utils.Placeholder.imageObj(260, 180).src;

	const path: string = `/components/${parentSlug}` + (slug === 'readme' ? '' : `/${slug}`);

	const className = tags ? tags.map((tag: string) => `tag-${tag}`).join(' ') : '';

	return <Card title={title} media={{src: logo}} href={path} className={className} />;
};

type StyleguidePaletteProps = {
	name: Types.Text;
};

export const StyleguidePalette = (props: StyleguidePaletteProps) => {
	const base: string = 'sg-palette';
	const {name} = props;

	const ref = React.createRef<HTMLDivElement>();
	const [value, setValue] = useState();

	const style = {
		background: `var(${name})`,
	};

	useEffect(() => {
		if (ref && ref.current) {
			const val = getComputedStyle(ref.current).getPropertyValue(name);

			if (val) {
				setValue(val);
			}
		}

		return () => {};
	});

	return (
		<div className={base}>
			<div className={`${base}__swatch`} style={style} ref={ref} />
			<div className={`${base}__body`}>
				<Definition
					data={[
						{title: 'Name', content: name},
						{title: 'Value', content: value},
					]}
				/>
			</div>
		</div>
	);
};

type StyleguideSchemeProps = {
	colours?: Array<string>;
	name: string;
};

export const StyleguideScheme = (props: StyleguideSchemeProps) => {
	const {colours, name} = props;

	if (!colours || (colours && colours.length === 0)) {
		return null;
	}

	return (
		<Carousel
			multiitem={3}
			id={`pal-${name}`}
			options={{pageDots: true, prevNextButtons: true, groupCells: true, cellAlign: 'center'}}
		>
			{colours.map((item, index) => (
				<StyleguidePalette name={item} key={`sg-${index}`} />
			))}
		</Carousel>
	);
};

export const StyleguideShadow = (props: StyleguideSchemeProps) => {
	const {name} = props;

	const style = {
		boxShadow: `var(${name})`,
	};

	return (
		<div className="sg-shadow" style={style}>
			{name}
		</div>
	);
};

export const StyleguideFont = (props: StyleguidePaletteProps) => {
	const base: string = 'sg-font';

	const {name} = props;

	const ref = React.createRef<HTMLDivElement>();
	const [value, setValue] = useState();

	const style = {
		fontFamily: `var(${name})`,
	};

	useEffect(() => {
		if (ref && ref.current) {
			const val = getComputedStyle(ref.current).getPropertyValue(name);

			if (val) {
				setValue(val);
			}
		}

		return () => {};
	});

	return (
		<div className={base}>
			<div className={`${base}__swatch`} style={style} ref={ref}>
				Aa
			</div>

			<div className={`${base}__body`} style={style}>
				ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz
			</div>

			<div className={`${base}__body`} style={style}>
				1234567890!"£$%^&amp;*()"
			</div>

			<div className={`${base}__body`}>
				<Definition
					data={[
						{title: 'Name', content: name},
						{title: 'Value', content: value},
					]}
				/>
			</div>
		</div>
	);
};

export const StyleguideSpacing = (props: StyleguidePaletteProps) => {
	const base: string = 'sg-spacing';
	const {name} = props;

	const ref = React.createRef<HTMLDivElement>();
	const [value, setValue] = useState();

	const style = {
		width: `var(${name})`,
	};

	useEffect(() => {
		if (ref && ref.current) {
			const val = getComputedStyle(ref.current).getPropertyValue(name);

			if (val) {
				setValue(val);
			}
		}

		return () => {};
	});

	return (
		<div className={base}>
			<div className={`${base}__size`} style={style} ref={ref} />
			<div className={`${base}__body`}>
				<Definition
					data={[
						{title: 'Name', content: name},
						{title: 'Value', content: value},
					]}
				/>
			</div>
		</div>
	);
};

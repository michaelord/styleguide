import React, {memo, useEffect, useState} from 'react';
import * as Utils from 'components/libs';
import {Form, DynamicFormFields} from 'components/form';
import {Toggle} from 'components/accordion';

import {Code} from 'components/editable';

import './Playground.scss';

type ComponentProps = {
	children: ChildFunction;
	fullwidth?: boolean;
	fields?: any;
};

type Params = any;

export interface ChildFunction {
	(params: Params): JSX.Element | null;
}

import {Block} from 'components/block';

export const Playground = memo((props: ComponentProps) => {
	const base: string = 'playground';

	const {fullwidth, children, fields} = props;

	const atts = {
		className: Utils.getModifiers(base, {fullwidth}),
	};

	return (
		<>
			<h3>Playground</h3>
			<Block pad="none">
				<div {...atts}>
					<div className={`${base}__body`}>
						<div className={`${base}__main`}>
							<Form endpoint="#" fields={fields}>
								{values => {
									return (
										<div className={`${base}__component`}>
											{children && typeof children === 'function' && children(values)}
										</div>
									);
								}}
							</Form>
						</div>
					</div>
				</div>
			</Block>
		</>
	);
});

type PlaygroudCodeProps = {
	name: string;
	config?: any;
};

export const PlaygroudCode = memo((props: PlaygroudCodeProps) => {
	const {name, config} = props;

	const {children, ...rest} = config;

	// TODO: update the output formatting

	const formatted: Array<string> = [];
	let combined: string = '';

	for (let i in rest) {
		const value: any = rest[i];

		if (value !== '') {
			const f: string = JSON.stringify(value, null, 2);

			const output: string = `${i}={${f}}`;

			combined += output;

			formatted.push(output);
		}
	}

	const isLong: boolean = combined.length > 200;

	const data: string = (isLong ? '\n' : '') + formatted.join(isLong ? '\n' : ' ');

	if (children) {
		return <Code code={`<${name} ${data}>\n\t<div>...</div>\n</${name}>`} hasCopy={true} />;
	}

	return <Code code={`<${name} ${data} />`} hasCopy={true} />;
});

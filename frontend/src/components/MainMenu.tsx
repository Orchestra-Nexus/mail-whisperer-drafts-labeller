import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainMenu: React.FC = () => {
	const location = useLocation();
	const menu = [
		{ label: 'Ornex Office', path: '/' },
		{ label: 'Inbox', path: '/inbox' },
		{ label: 'Scheduler', path: '/scheduler' },
		{ label: 'Audit Trail', path: '/audit' },
		{ label: 'Document Writer', path: '/writing-assist' },
	];
	return (
		<nav className="bg-white border-b shadow-sm mb-6">
			<ul className="flex space-x-6 px-6 py-3">
				{menu.map((item) => (
					<li key={item.path}>
						<Link
							to={item.path}
							className={`font-medium hover:text-blue-600 transition-colors ${
								location.pathname === item.path
									? 'text-blue-600 underline'
									: 'text-gray-700'
							}`}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MainMenu;

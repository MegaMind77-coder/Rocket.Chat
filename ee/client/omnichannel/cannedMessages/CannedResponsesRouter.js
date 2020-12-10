import React, { useState, useMemo } from 'react';
import { Box } from '@rocket.chat/fuselage';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';

import CannedResponseEdit from './CannedResponseEdit';
import CannedResponseDetails from './CannedResponseDetails';
import CannedResponsesList from './CannedResponsesList';

const PAGES = {
	List: 'list',
	Details: 'details',
	Edit: 'edit',
};

const withData = (WrappedComponent) => ({ departmentId, onClose }) => {
	const [filter, setFilter] = useState();

	const handleFilter = useMutableCallback((e) => {
		setFilter(e.currentTarger.value);
	});

	const query = useMemo(() => {
		
	});

	return <WrappedComponent onChangeFilter={handleFilter} filter={filter} onClose={onClose}/>;
};

const useHandlePage = (page, setCurrentPage) => useMutableCallback(() => {
	setCurrentPage(page);
});

const CannedResponsesRouter = ({ responses, onClose, filter, onChangeFilter }) => {
	const [currentPage, setCurrentPage] = useState(PAGES.List);

	const onEdit = useHandlePage(PAGES.Edit, setCurrentPage);
	const onDetails = useHandlePage(PAGES.Details, setCurrentPage);
	const onReturn = useHandlePage(PAGES.List, setCurrentPage);

	const navigation = {
		onClose,
		onReturn,
	};

	if (currentPage === PAGES.Edit) {
		return <CannedResponseEdit {...navigation}/>;
	}

	if (currentPage === PAGES.Details) {
		return <CannedResponseDetails onEdit={onEdit} {...navigation}/>;
	}

	return <CannedResponsesList onDetails={onDetails} onClose={onClose}/>;
};

export default React.memo(withData(CannedResponsesRouter));

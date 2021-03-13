import React from 'react';

const PageShell = (Page, TransitionType, direction) => {
    return props => (
        <TransitionType direction={direction} in='true'>
            <div>
                <Page {...props} />
            </div>
        </TransitionType>
    )
}

export default PageShell;
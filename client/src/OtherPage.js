import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
    return (
        <div>
            <h2>Não entendi o porquê desta página</h2>
            <Link  style={{ color: 'orange' }} to="/">Go home homie</Link>
        </div>
    )
}

export default OtherPage;
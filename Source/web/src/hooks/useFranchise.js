import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const getFranchiseName = (site) => {
    const [siteName, setSiteName] = useState('');
    const history = useRouter();
    const { franchise } = history.query;
    let alias = franchise;

    useEffect(() => {
        if (site.ms_alias === alias) setSiteName(site.ms_name);
        else if (site && site.sub_page) {
            site.sub_page.map((item) => {
                if (item.sub_alias === alias) setSiteName(item.sub_name);
            });
        }
    }, []);

    return siteName;
};

export default getFranchiseName;
